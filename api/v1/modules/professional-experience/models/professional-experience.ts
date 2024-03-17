import mongoose from 'mongoose';

const { Schema, model } = mongoose;

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
  endDate: { type: Date },
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
  location: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'Candidate', required: true }
})

const ProfessionalExperience = model('ProfessionalExperience', professionalExperienceSchema);

export { ProfessionalExperience, LifeStyle, ProfessionalArea }
