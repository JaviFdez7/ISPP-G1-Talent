import { Schema, model, connect } from 'mongoose';
import { Document } from 'mongoose';

export type ProfileMap = Map<ProfileRequested, FilteredCandidates[]>;
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

  export interface TeamCreatorDocument {
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
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    profiles: [{
      profileRequested: profileRequestedSchema, 
      recommendedCandidates: [filteredCandidatesSchema] 
    }]
  });
  
  export const TeamCreator = model('TeamCreator', teamCreatorSchema);