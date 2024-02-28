import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CompanySubscription = {
  BASIC: 'Basic plan',
  PRO: 'Pro plan',
  CUSTOM: 'Custom plan'
}

const CandidateSubscription = {
  BASIC: 'Basic plan',
  PRO: 'Pro plan'
}

const LifeStyle = {
  ON_SITE: 'On-site',
  TELEMATIC: 'Telematic'
}

const ProfessionalArea = {
  WEB_APPLICATION: 'Web application',
  MOBILE_APPLICATION: 'Mobile application',
  FRONTEND: 'Frontend',
  DEV_OPS: 'DevOps',
  BACKEND: 'Backend',
  OPERATING_SYSTEMS: 'Operating systems',
  DATA_SCIENCE: 'Data science',
  ARTIFICIAL_INTELLIGENCE: 'Artificial intelligence',
  SECURITY: 'Security',
  OTHER: 'Other'
}

const professionalExperienceSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  companyName: { type: String, required: true },
  professionalArea: {
    type: String,
    required: true,
    enum: Object.values(ProfessionalArea)
  },
  lifestyle: {
    type: String,
    enum: Object.values(LifeStyle)
  },
  location: { type: String }
})

const ProfessionalExperience = model('ProfessionalExperience', professionalExperienceSchema);

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  paymentMethods: [String]
}, { discriminatorKey: 'role' });

const User = model('User', userSchema);

const representativeSchema = new Schema({
  companyName: { type: String, required: true },
  companySubscription: {
    type: String,
    enum: Object.values(CompanySubscription)
  },
  projectSocietyName: String
});

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
  githubToken: { type: String, required: true },
  professionalExperiences: [{
    type: Schema.Types.ObjectId,
    ref: 'ProfessionalExperience'
  }]
});

const Representative = User.discriminator('Representative', representativeSchema);
const Candidate = User.discriminator('Candidate', candidateSchema);

export { User, Representative, Candidate, ProfessionalExperience, CompanySubscription, CandidateSubscription, LifeStyle, ProfessionalArea }
