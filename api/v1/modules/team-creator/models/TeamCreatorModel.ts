import { Schema, model, connect } from 'mongoose';
import { Document } from 'mongoose';


export interface ProfileRequested {
    languages: string[];
    technologies: string[];
    yearsOfExperience: number;
    field: string;
  }
export interface SkillRequested{
    languages: string[];
    technologies: string[];
    yearsOfExperience: number;
    field: string[];
  }
export interface FilteredCandidates{
    github_username: string;
    languages: string[];
    technologies: string[];
    yearsOfExperience: number;
    field: string[];
  }

  export interface TeamCreator {
    username: string;
    profiles: {
        profileRequested: ProfileRequested;
        recommendedCandidates: FilteredCandidates[];
    };
  }
const profileRequestedSchema = new Schema({
    languages: [String],
    technologies: [String],
    yearsOfExperience: Number,
    field: String
  }, { _id: false }); 
  
  const filteredCandidatesSchema = new Schema({
    github_username: String,
    languages: [String],
    technologies: [String],
    yearsOfExperience: Number,
    field: [String]
  }, { _id: false });

  const teamCreatorSchema = new Schema({
    username: { type: String, required: true }, 
    profiles: [{
      profileRequested: profileRequestedSchema, 
      recommendedCandidates: [filteredCandidatesSchema] 
    }]
  });
  
  const TeamCreator = model('TeamCreator', teamCreatorSchema);