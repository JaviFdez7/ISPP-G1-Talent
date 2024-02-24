import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Analysis {
  githubUsername: string;
}

// 2. Create a Schema corresponding to the document interface.
const analysisSchema = new Schema<Analysis>({
  githubUsername: { type: String, required: true },
});

// 3. Create a Model.
const Analysis = model<Analysis>('Analysis', analysisSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  await connect('mongodb://127.0.0.1:27017/talentdb');

  const analysis = new Analysis({
    name: 'Bill'
  });
  await analysis.save();
}

module.exports={run}