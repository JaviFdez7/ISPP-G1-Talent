import mongoose, { mongo } from 'mongoose';
import { AnalysisDocument,AnalysisModel,analysisSchema } from '../../analysis/models/analysis.model';
const { Schema, model } = mongoose;
import {ProfessionalExperienceDocument} from '../../professional-experience/models/professional-experience'
const CompanySubscription = {
	BASIC: 'Basic plan',
	PRO: 'Pro plan',
	CUSTOM: 'Custom plan',
}

const CandidateSubscription = {
	BASIC: 'Basic plan',
	PRO: 'Pro plan',
}

const LifeStyle = {
	ON_SITE: 'On-site',
	TELEMATIC: 'Telematic',
}

export interface CandidateDocument {
  _id : mongoose.Types.ObjectId;
  fullName: string;
  githubUser: string;
  profilePicture?: string;
  candidateSubscription: keyof typeof CandidateSubscription;
  CV?: string;
  residence?: string;
  lifestyle?: keyof typeof LifeStyle;
  githubToken?: string;
  analysisId:  AnalysisDocument;
  profesionalExperiences: [ProfessionalExperienceDocument]
}

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  paymentMethods: [String]
}, { discriminatorKey: 'role' });

const User = model('User', userSchema);
const Analysis = model("Analysis",analysisSchema)
const representativeSchema = new Schema({
	companyName: { type: String, required: true },
	companySubscription: {
		type: String,
		required: true,
		enum: Object.values(CompanySubscription),
	},
	projectSocietyName: String,
})

const candidateSchema = new Schema({
  fullName: { type: String, required: true },
  githubUser: { type: String, required: true },
  profilePicture: String,
  candidateSubscription: {
    type: String,
    required: true,
    enum: Object.values(CandidateSubscription)
  },
  CV: String,
  residence: String,
  lifestyle: {
    type: String,
    enum: Object.values(LifeStyle)
  },
  githubToken: { type: String },


  profesionalExperiences: [{type: Schema.Types.ObjectId, ref: 'ProfessionalExperience'}],
  analysisId: { type: Schema.Types.ObjectId, ref: 'Analysis', required: true },

});

const Representative = User.discriminator('Representative', representativeSchema)
const Candidate = User.discriminator('Candidate', candidateSchema)

export { User, Representative, Candidate, CompanySubscription, CandidateSubscription, LifeStyle }
