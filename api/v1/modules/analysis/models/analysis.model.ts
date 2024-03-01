import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface Analysis {
  githubUsername: string;
  followers: number;
  avatarUrl: URL,
  contributions: {
    totalCommits: number;
    totalPullRequests: number;
  };
  topLanguages: Array<{
    language: string;
    count: number;
  }>;
  technologies: string[];
  topRepositories: Array<{
    name: string;
    url: string;
    stars: number;
    forks: number;
  }>;
}

// 2. Create a Schema corresponding to the document interface.
const analysisSchema = new Schema<Analysis>({
  githubUsername: { type: String, required: true, unique: true },
  followers: { type: Number, required: true },

  contributions: {
    totalCommits: { type: Number, required: true },
    totalPullRequests: { type: Number, required: true },
  },
  topLanguages: [{
    language: { type: String, required: true },
    count: { type: Number, required: true },
  }],
  technologies: [{ type: String }],
  topRepositories: [{
    name: { type: String, required: true },
    url: { type: String, required: true },
    stars: { type: Number, required: true },
    forks: { type: Number, required: true },
  }],
});

// 3. Create a Model.
const AnalysisModel = model<Analysis>('Analysis', analysisSchema);

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

export { AnalysisModel, run };
