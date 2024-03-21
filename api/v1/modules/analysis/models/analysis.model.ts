import { Schema, model } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
export interface RepositoryInfo {
  name: string;
  description: string,
  url: string,
  stars: number,
  forks: number,
  languages: string[],
  technologies: string[], 
  numberClosedIssues: number,

}
export interface LanguagePercentage {
  language: string;
  percentage: number;
}


export interface AnalysisDocument {
  githubUsername: string;
  avatarUrl: string;
  followers: number;
  globalIssuesClosed: number;
  MostClosedIssueRepo: RepositoryInfo;
  contributions: {
    totalCommits: number;
    totalPullRequests: number;
    totalRepositoriesContributedWithCommits: number;
    totalRepositoriesContributedWithPullRequests: number;
  };
  globalTopLanguages: LanguagePercentage[]; 
  globalTechnologies: string[]; 
  topRepositories: RepositoryInfo[]; 
  
}

const repositoryInfoSchema = new Schema<RepositoryInfo>({
  name: { type: String, required: true },
  description: {type: String},
  url: { type: String, required: true },
  stars: { type: Number, required: true },
  forks: { type: Number, required: true },
  languages:  [{ type: String }],
  technologies: [{ type: String }],
  numberClosedIssues: {type: Number},

});

const analysisSchema = new Schema<AnalysisDocument>({
  githubUsername: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  followers: { type: Number, required: true },
  globalIssuesClosed: {type: Number, required: true},
  MostClosedIssueRepo: {type: repositoryInfoSchema},

  contributions: {
    totalCommits: { type: Number, required: true },
    totalPullRequests: { type: Number, required: true },
    totalRepositoriesContributedWithCommits: { type: Number, required: true },
    totalRepositoriesContributedWithPullRequests: { type: Number, required: true },
  },
    globalTopLanguages: [{
  language: { type: String, required: true },
  percentage: { type: Number, required: true }
}],
  globalTechnologies: [{ type: String }],
  topRepositories: [repositoryInfoSchema],
}, { timestamps: true });

// 3. Create a Model.
export const AnalysisModel = model<AnalysisDocument>('Analysis', analysisSchema);