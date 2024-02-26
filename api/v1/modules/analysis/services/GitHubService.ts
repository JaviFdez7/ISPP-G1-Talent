import dotenv from 'dotenv'
const { GQLPaginator } = require('gql-paginator');
import { AnalysisModel,Analysis } from '../analysis.model';

dotenv.config()

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

export async function GetUserAnaliseInfo(githubUsername: string): Promise<Analysis> {

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
          totalRepositoriesWithContributedPullRequests
          totalRepositoriesWithContributedCommits
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
    const languagesResult = await GQLPaginator(languagesQuery, GITHUB_APIKEY, 'github-v1.0.0');
    const result: any = await GQLPaginator(queryUserInfo, GITHUB_APIKEY, 'github-v1.0.0');
    const languagesUsed = getTopLanguagesPullRequest(languagesResult);
    
    const userAnalysis: Analysis = processGitHubUserInfo(result, languagesUsed);
  
    return userAnalysis
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

function getTopLanguagesPullRequest(result: any): Array<[string, number]> {
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
  return sortedLanguages;
}

function processGitHubUserInfo (result: any, languagesSorted: Array<[string, number]>) {
  const user = result.data.user;

  const topRepos = user.repositories.nodes
  const top5Languages = languagesSorted.slice(0, 5);

  const technologies = new Set();
  user.repositories.nodes.forEach((repo: any) => {
    if (repo.object && repo.object.text) {
      const packageJson = JSON.parse(repo.object.text);
      Object.keys(packageJson.dependencies || {}).forEach(dep => technologies.add(dep));
      Object.keys(packageJson.devDependencies || {}).forEach(dep => technologies.add(dep));
    }
  });

  const userInfo: Analysis = {
    githubUsername: user.login,
    avatarUrl: user.avatarUrl,
    followers: user.followers.totalCount,
    contributions: {
      totalCommits: user.contributionsCollection.totalRepositoriesWithContributedCommits,
      totalPullRequests: user.contributionsCollection.totalRepositoriesWithContributedPullRequests,
    },
    topRepositories: topRepos.map((repo: any) => ({
      name: repo.name,
      url: repo.url,
      stars: repo.stargazers.totalCount,
      forks: repo.forks.totalCount,
    })),
    topLanguages: top5Languages.map(([language, count]) => ({
      language,
      count
    })),
    technologies: Array.from(technologies).map(dep => dep as string),

  };
  return userInfo;
}
//GetUserAnaliseInfo('JaviFdez7').then((resultado)=>console.log(resultado));
