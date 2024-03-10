import type { AnalysisDocument, RepositoryInfo }  from '../models/analysis.model';

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
      repositories(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
        totalCount
        nodes {
          name
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

function getTopLanguagesPullRequest(result: any): string[] {
  const pullRequests = result?.data?.user?.pullRequests?.nodes;
  const languageCounts: Record<string, number> = {};

  for (let i = 0; i < pullRequests.length; i++) {
    const seenLanguagesInPR = new Set<string>();
    const files = pullRequests[i].files.nodes;

    for (let j = 0; j < files.length; j++) {
      const file = files[j].path;
      const extension = file.split('.').pop()?.toLowerCase();
      const language = languageMap[extension];

      if (language && !seenLanguagesInPR.has(language)) {
        seenLanguagesInPR.add(language);
        if (languageCounts[language]) {
          languageCounts[language] += 1;
        } else {
          languageCounts[language] = 1;
        }
      }
    }
  }
  const sortedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([language]) => language);
    
  return sortedLanguages;
}

function processGitHubUserInfo (result: any, languagesSorted: string[]) {
  const user = result.data.user;
  const globalTechnologies = new Set<string>();

  const globalTopLanguages = languagesSorted.slice(0, 5);

  const topRepositories: RepositoryInfo[] = user.repositories.nodes.map((repo: any) => {
    const repoTechnologies = new Set<string>();
    if (repo.object && repo.object.text) {
      const packageJson = JSON.parse(repo.object.text);
      // Filtrar y añadir solo las tecnologías relevantes a repoTechnologies y globalTechnologies
      [...Object.keys(packageJson.dependencies || {}), ...Object.keys(packageJson.devDependencies || {})]
        .filter(dep =>{ return relevantTechnologies.includes(dep.split('/')[1] || dep) && 
        (!dep.startsWith('@') );
    })
        .forEach(dep => {
          globalTechnologies.add(dep);
          repoTechnologies.add(dep);
        });
    }

    const repoLanguages = repo.languages.edges.map((edge: any) => edge.node.name);

    return {
      name: repo.name,
      url: repo.url,
      stars: repo.stargazers.totalCount,
      forks: repo.forks.totalCount,
      languages: Array.from(repoLanguages),
      technologies: Array.from(repoTechnologies),
    };
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
    globalTopLanguages: Array.from(globalTopLanguages),
    globalTechnologies: Array.from(globalTechnologies).filter(tech => !tech.startsWith('@')),
    topRepositories,
  };

  return analysis;
}
//GetUserAnaliseInfo('JaviFdez7').then((resultado)=>console.log(resultado));
/*
GetUserAnaliseInfo('JaviFdez7').then((resultado) => {
  // Imprimir los datos generales del usuario
  console.log(`Github Username: ${resultado.githubUsername}`);
  console.log(`Avatar URL: ${resultado.avatarUrl}`);
  console.log(`Followers: ${resultado.followers}`);
  console.log(`Total Commits: ${resultado.contributions.totalCommits}`);
  console.log(`Total Pull Requests: ${resultado.contributions.totalPullRequests}`);
  console.log('Global Languages:', resultado.globalTopLanguages.join(', '));
  console.log('Global Technologies:', resultado.globalTechnologies.join(', '));
  
  // Imprimir los detalles de cada repositorio, incluyendo los lenguajes
  resultado.topRepositories.forEach(repo => {
    console.log(`\nRepository Name: ${repo.name}`);
    console.log(`URL: ${repo.url}`);
    console.log(`Stars: ${repo.stars}`);
    console.log(`Forks: ${repo.forks}`);
    // Asumiendo que cada lenguaje tiene propiedades 'name' y 'size'
    console.log('Languages:', repo.languages.join(', '));
    
    // Si 'technologies' es un array de strings, podrías imprimirlo directamente
    console.log('Technologies:', repo.technologies.join(', '));
  });
}).catch(console.error);
*/