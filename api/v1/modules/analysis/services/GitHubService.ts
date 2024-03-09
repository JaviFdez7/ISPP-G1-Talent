import { IntegerType } from 'mongodb';
import type { AnalysisDocument, RepositoryInfo,LanguagePercentage }  from '../models/analysis.model';
import dotenv from 'dotenv'
const { GQLPaginator } = require('gql-paginator');


const GITHUB_APIKEY = process.env.GH_TOKEN
const languageMap: Record<string, string> = {
  js: 'JavaScript',
  py: 'Python',
  ts: 'TypeScript',
  java: 'Java',
  kt: 'Kotlin',
  cpp: 'C++',
  c: 'C',
  cs: 'C#',
  rb: 'Ruby',
  go: 'Go',
  rs: 'Rust',
  php: 'PHP',
  ex: 'Elixir',
  exs: 'Elixir',
  scala: 'Scala',
  hs: 'Haskell',
  jl: 'Julia',
  r: 'R',
  swift: 'Swift',
  m: 'Objective-C',
  mm: 'Objective-C++',
  pl: 'Perl',
  sh: 'Shell',
  bat: 'Batch',
  ps1: 'PowerShell',
  lua: 'Lua',
  groovy: 'Groovy',
  clj: 'Clojure',
  cljc: 'Clojure',
  cljs: 'ClojureScript',
  elm: 'Elm',
  erl: 'Erlang',
  hrl: 'Erlang',
  fs: 'F#',
  fsi: 'F#',
  ml: 'OCaml',
  mli: 'OCaml',
  dart: 'Dart',
  pas: 'Pascal',
  dfm: 'Delphi Forms',
  vb: 'Visual Basic',
  vbs: 'VBScript',
  asm: 'Assembly',
  s: 'Assembly',
  rkt: 'Racket',
  scm: 'Scheme',
  lisp: 'Common Lisp',
  lsp: 'Common Lisp',
  coffee: 'CoffeeScript',
  tsx: 'TypeScript JSX',
  jsx: 'JavaScript JSX'

};
const relevantTechnologies = [
  // Front-end Frameworks/Libraries
  "react", "vue", "angular", "svelte",
  "next.js", "nuxt.js", "gatsby", "react-native",
  "flutter",

  // State Management
  "redux", "vuex", "mobx", "context-api",
  "rxjs", "akita", "ngxs",

  // UI Frameworks
  "material-ui", "vuetify", "bootstrap", "tailwindcss",
  "ant-design", "chakra-ui", "semantic-ui",

  // Back-end Frameworks
  "express", "nestjs", "koa", "fastify",
  "hapi", "spring-boot", "django", "flask",
  "ruby-on-rails", "laravel", "asp.net", "go-gin",
  "echo", "fiber",

  // Testing Frameworks/Libraries
  "jest", "mocha", "chai", "jasmine",
  "cypress", "selenium", "puppeteer", "testing-library",
  "karma", "enzyme",

  // Databases
  "mongodb", "mongoose", "mysql", "postgresql",
  "sqlite", "redis", "firebase", "oracle",
  "microsoft-sql-server", "dynamodb", "couchbase",
  "cassandra", "elasticsearch",

  // CI/CD Tools
  "jenkins", "travis-ci", "circleci", "github-actions",
  "gitlab-ci", "bitbucket-pipelines", "azure-pipelines",

  // DevOps & Virtualization
  "docker", "kubernetes", "vagrant", "ansible",
  "terraform", "puppet", "chef",

  // Cloud Providers/Services
  "aws", "google-cloud", "azure", "digitalocean",
  "heroku", "netlify", "vercel",

  // JavaScript Preprocessors
  "typescript", "babel", "coffeescript",

  // CSS Preprocessors
  "sass", "less", "stylus",

  // Build Tools & Bundlers
  "webpack", "rollup", "parcel", "gulp",
  "grunt", "broccoli",

  // Package Managers
  "npm", "yarn", "pnpm", "bower",

  // GraphQL Tools
  "apollo", "graphql", "relay",

  // WebAssembly
  "wasm",

  // Serverless Frameworks
  "serverless", "cloud-functions", "aws-lambda",
  "azure-functions",

  // Static Site Generators
  "jekyll", "hugo", "eleventy",

  // Message Brokers
  "kafka", "rabbitmq", "activemq", "zeromq",

  // Monitoring & Logging
  "prometheus", "grafana", "logstash", "kibana",
  "elk-stack", "datadog", "new-relic",

  // Other Libraries & Frameworks
  "lodash", "underscore", "moment", "date-fns",
  "rxjs", "axios", "fetch-api", "socket.io",
];

export async function GetUserAnaliseInfo(githubUsername: string,apikey?: string): Promise<AnalysisDocument> {
  const queryUserInfo = `query {
    user(login: "${githubUsername}") {
      login
      avatarUrl
      followers {
        totalCount
      }
      repositories(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
          description
          url
          stargazers {
            totalCount
          }
          forks {
            totalCount
          }
          languages(first: 5, orderBy: {field: SIZE, direction: DESC}) {
            edges {
              node {
                name
              }
              size
            }
            totalCount
          }
          object(expression: "HEAD:package.json") {
            ... on Blob {
              text
            }
          }
          issues(states: CLOSED, first: 100) {
            totalCount
            edges {
              node {
                assignees(first:5) {
                  nodes {
                    login
                  }
                }
              }
            }
          }
          
        }
      }
      contributionsCollection {
        contributionCalendar {
          totalContributions
        }
        totalPullRequestContributions
        totalCommitContributions
        totalRepositoriesWithContributedCommits
        totalRepositoriesWithContributedPullRequests
      }
    }
  }`;
  
  const languagesQuery = `query  {
        user(login: "${githubUsername}") {
          pullRequests(first: 100, states: MERGED) {
            nodes {
              title
              url
              files(first: 100) {
                nodes {
                  path
                }
              }
            }
          }
        }
      }
    `;


  try {
    const effectiveApiKey = apikey || GITHUB_APIKEY;
    
   
    const languagesResult = await GQLPaginator(languagesQuery, effectiveApiKey, 'github-v1.0.0');
    const result: any = await GQLPaginator(queryUserInfo, effectiveApiKey, 'github-v1.0.0');
   

    const languagesUsed = getTopLanguagesPullRequest(languagesResult);
    
    const userAnalysis: AnalysisDocument = processGitHubUserInfo(result, languagesUsed);
  
    return userAnalysis
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function getTopLanguagesPullRequest(result: any): LanguagePercentage[] {
  const pullRequests = result?.data?.user?.pullRequests?.nodes;
  const languageCounts: Record<string, number> = {};

  // Contar la cantidad de archivos por lenguaje de programación
  for (let i = 0; i < pullRequests.length; i++) {
    const seenLanguagesInPR = new Set<string>();
    const files = pullRequests[i].files.nodes;

    for (let j = 0; j < files.length; j++) {
      const file = files[j].path;
      const extension = file.split('.').pop()?.toLowerCase();
      const language = languageMap[extension]; // Asegúrate de que languageMap esté definido

      if (language && !seenLanguagesInPR.has(language)) {
        seenLanguagesInPR.add(language);
        languageCounts[language] = (languageCounts[language] || 0) + 1;
      }
    }
  }

  const totalFiles = Object.values(languageCounts).reduce((sum, count) => sum + count, 0);
  let languagesPercentage = Object.entries(languageCounts).map(([language, count]) => ({
    language,
    percentage: parseFloat(((count / totalFiles) * 100).toFixed(2)),
  }));


  languagesPercentage.sort((a, b) => b.percentage - a.percentage);
  const topLanguages = languagesPercentage.slice(0, 5);
  const otherPercentage =  parseFloat(languagesPercentage.slice(5).reduce((sum, item) => sum + item.percentage, 0).toFixed(2));

  if (otherPercentage > 0) {
    topLanguages.push({
      language: 'Other',
      percentage: otherPercentage,
    });
  }

  return topLanguages;
}
function processGitHubUserInfo(result: any, languagesSorted: LanguagePercentage[]): AnalysisDocument {
  const user = result.data.user;
  const globalTechnologies = new Set<string>();
  let topRepositories: RepositoryInfo[] = [];

  user.repositories.nodes.forEach((repo: any, index: number) => {
    if (repo.object && repo.object.text) {
      const packageJson = JSON.parse(repo.object.text);
   
      [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})]
        .filter(dep => relevantTechnologies.includes(dep.split('/')[1] || dep) && !dep.startsWith('@'))
        .forEach(dep => globalTechnologies.add(dep));
    }

    if (index < 10) {
      const repoTechnologies = new Set<string>();
      if (repo.object && repo.object.text) {
        const packageJson = JSON.parse(repo.object.text);
     
        [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})]
          .filter(dep => relevantTechnologies.includes(dep.split('/')[1] || dep) && !dep.startsWith('@'))
          .forEach(dep => repoTechnologies.add(dep));
      }

      const repoLanguages = repo.languages.edges.map((edge: any) => edge.node.name);

      let numberOfClosedIssues = 0;
      repo.issues.edges.forEach((issue: any) => {
        issue.node.assignees.nodes.forEach((assignee: any) => {
          if (assignee.login === user.login) {
            numberOfClosedIssues++;
          }
        });
      });

      topRepositories.push({
        name: repo.name,
        description: repo.description,
        url: repo.url,
        stars: repo.stargazers.totalCount,
        forks: repo.forks.totalCount,
        languages: Array.from(repoLanguages),
        technologies: Array.from(repoTechnologies),
        numberClossedIssues: numberOfClosedIssues,
      });
    }
  });

  const analysis: AnalysisDocument = {
    githubUsername: user.login,
    avatarUrl: user.avatarUrl,
    followers: user.followers.totalCount,
    contributions: {
      totalCommits: user.contributionsCollection.totalCommitContributions,
      totalPullRequests: user.contributionsCollection.totalPullRequestContributions,
      totalRepositoriesContributedWithCommits: user.contributionsCollection.totalRepositoriesWithContributedCommits,
      totalRepositoriesContributedWithPullRequests: user.contributionsCollection.totalRepositoriesWithContributedPullRequests
    },
    globalTopLanguages: languagesSorted,
    globalTechnologies: Array.from(globalTechnologies),
    topRepositories,
  };

  return analysis;
}
