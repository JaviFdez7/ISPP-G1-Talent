import { Schema, model, connect } from 'mongoose';
import { Document } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
export interface RepositoryInfo {
  name: string;
  url: string;
  stars: number;
  forks: number;
  languages: string[]; 
  technologies: string[]; 
}



export interface AnalysisDocument {
  githubUsername: string;
  avatarUrl: string;
  followers: number;
  contributions: {
    totalCommits: number;
    totalPullRequests: number;
    totalRepositoriesContributedWithCommits: number;
    totalRepositoriesContributedWithPullRequests: number;
  };
  globalTopLanguages: string[]; 
  globalTechnologies: string[]; 
  topRepositories: RepositoryInfo[]; 
}

const repositoryInfoSchema = new Schema<RepositoryInfo>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  stars: { type: Number, required: true },
  forks: { type: Number, required: true },
  languages:  [{ type: String }],
  technologies: [{ type: String }],
});

const analysisSchema = new Schema<AnalysisDocument>({
  githubUsername: { type: String, required: true },
  avatarUrl: { type: String, required: true },
  followers: { type: Number, required: true },
  contributions: {
    totalCommits: { type: Number, required: true },
    totalPullRequests: { type: Number, required: true },
    totalRepositoriesContributedWithCommits: { type: Number, required: true },
    totalRepositoriesContributedWithPullRequests: { type: Number, required: true },
  },
  globalTopLanguages: [{ type: String }],
  globalTechnologies: [{ type: String }],
  topRepositories: [repositoryInfoSchema],
}, { timestamps: true });

// 3. Create a Model.
export const AnalysisModel = model<AnalysisDocument>('Analysis', analysisSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  //await connect('mongodb://127.0.0.1:27017/talentdb');
/*
  const analysis = new AnalysisModel({
    githubUsername: 'Bill',
    followers: 100,
    contributions: {
      totalCommits: 500,
      totalPullRequests: 50,
    },
    topLanguages: [{
      language: 'JavaScript',
      count: 20,
    }],
    technologies: ['Node.js', 'React'],
    topRepositories: [{
      name: 'My Project',
      url: 'http://github.com/Bill/myproject',
      stars: 100,
      forks: 25,
    }],
  });
  */
  //await analysis.save();
  console.log("Running database");
}


