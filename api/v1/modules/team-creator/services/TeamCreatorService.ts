import { AnalysisModel,AnalysisDocument } from "../../analysis/models/analysis.model";
import {ProfessionalExperience} from "../../professional-experience/models/professional-experience"
import {Candidate,CandidateDocument}  from "../../user/models/user"
import mongoose from 'mongoose';


interface ProfileRequested {
  languages: string[];
  technologies: string[];
  yearsOfExperience: number;
  field: string;
}
interface SkillRequested{
  languages: string[];
  technologies: string[];
  yearsOfExperience: number;
  field: string[];
}
interface filteredCandidates{
  github_username: string;
  languages: string[];
  technologies: string[];
  yearsOfExperience: number;
  field: string[];
}
function processSkillsRequested(profiles: ProfileRequested[]): SkillRequested {
  const languagesSet = new Set<string>();
  const technologiesSet = new Set<string>();
  let minYearsOfExperience = profiles.length > 0 ? profiles[0].yearsOfExperience : 0;
  const fieldsSet = new Set<string>();
  profiles.forEach(profile => { 
    profile.languages.forEach(language => languagesSet.add(language));
    profile.technologies.forEach(technology => technologiesSet.add(technology));
    if (profile.yearsOfExperience < minYearsOfExperience) {
      minYearsOfExperience = profile.yearsOfExperience;
    }
    fieldsSet.add(profile.field);
  });

  
  return {
    languages: Array.from(languagesSet),
    technologies: Array.from(technologiesSet),
    yearsOfExperience: minYearsOfExperience,
    field: Array.from(fieldsSet)
  };
}
async function filterCandidates(skillsRequested: SkillRequested): Promise<filteredCandidates[]> {

  const queryOrConditions = [
    { 'globalTopLanguages.language': { $in: skillsRequested.languages } },
    { 'globalTechnologies': { $in: skillsRequested.technologies } }
  ];

  const candidates = await Candidate.find()
  .populate({
    path: 'analysisId',
    match: { $or: queryOrConditions },
  })
  .exec() as unknown as CandidateDocument[];

  const qualifiedCandidates: filteredCandidates[] = [];

  for (const candidate of candidates) {
    
    if (!candidate.analysisId){
      continue
    }
    const experiences = await ProfessionalExperience.find({ userId: candidate._id });
    
    
    let totalExperienceYears = 0;
    let matchesField = false;

    experiences.forEach(exp => {
      const startDate = new Date(exp.startDate);
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date();
      const years = endDate.getFullYear() - startDate.getFullYear();
      const monthDiff = endDate.getMonth() - startDate.getMonth();

      if (years > 0 || monthDiff > 0) {
        totalExperienceYears += years + monthDiff / 12;
      }

      if (skillsRequested.field.includes(exp.professionalArea)) { 
        matchesField = true;
      }
    });

    if (totalExperienceYears >= skillsRequested.yearsOfExperience && matchesField) {

      const filteredLanguages = candidate.analysisId.globalTopLanguages
        .map(lang => lang.language)
        .filter(lang => skillsRequested.languages.includes(lang));

      const filteredTechnologies = candidate.analysisId.globalTechnologies
        .filter(tech => skillsRequested.technologies.includes(tech));

      qualifiedCandidates.push({
        github_username: candidate.githubUser,
        languages: filteredLanguages,
        technologies: filteredTechnologies,
        yearsOfExperience: totalExperienceYears,
        field: skillsRequested.field 
      });
    }
  }
  console.log(qualifiedCandidates)
  return qualifiedCandidates; 
}

function selectBestCandidates(filteredCandidates: filteredCandidates[], profilesRequested: ProfileRequested[]): Map<ProfileRequested, filteredCandidates[]> {
  const bestCandidatesPerProfile = new Map<ProfileRequested, filteredCandidates[]>();

  for (const profile of profilesRequested) {
    let maxScore = 0;
    const candidatesScores: Map<filteredCandidates, number> = new Map();

    for (const candidate of filteredCandidates) {
      let score = 0;
      candidate.languages.forEach(lang => {
        if (profile.languages.includes(lang)) score++;
      });
      candidate.technologies.forEach(tech => {
        if (profile.technologies.includes(tech)) score++;
      });
      if (candidate.yearsOfExperience >= profile.yearsOfExperience) score++;
      if (candidate.field.includes(profile.field)) score++;
      maxScore = Math.max(maxScore, score);
      candidatesScores.set(candidate, score);
    }
    const bestCandidates = Array.from(candidatesScores.keys()).filter(candidate => candidatesScores.get(candidate) === maxScore);

   
    bestCandidatesPerProfile.set(profile, bestCandidates);
  }

  return bestCandidatesPerProfile;
}

export const createTeamCreator: any = async (data: any) => {
  throw new Error('Not Implemented, data: ' + data);
};


export const deleteTeamCreator: any = async (id: any) => {
  throw new Error('Not Implemented: id: ' + id);
};
const filteredCandidatesExample: filteredCandidates[] = [
  {
    github_username: "devUser1",
    languages: ["JavaScript", "TypeScript"],
    technologies: ["React", "Node.js"],
    yearsOfExperience: 4,
    field: ["Front-end Development", "Back-end Development"]
  },
  {
    github_username: "devUser2",
    languages: ["Python", "JavaScript"],
    technologies: ["Django", "React"],
    yearsOfExperience: 5,
    field: ["Full-stack Development"]
  },
  {
    github_username: "devUser3",
    languages: ["JavaScript"],
    technologies: ["Vue"],
    yearsOfExperience: 2,
    field: ["Front-end Development"]
  }
];
const profileRequestedExample: ProfileRequested[] =[ {
  languages: ["JavaScript"],
  technologies: ["React"],
  yearsOfExperience: 3,
  field: "Front-end Development"
}];
async function prueba(skillsRequested: SkillRequested) {

  const queryOrConditions = [
    { 'globalTopLanguages.language': { $in: skillsRequested.languages } },
    { 'globalTechnologies': { $in: skillsRequested.technologies } }
  ];

  //const candidates = await Candidate.find().populate("analysisId").exec();
  const candidates = await Candidate.find()
  .populate({
    path: 'analysisId',
    match: { $or: queryOrConditions },
  })
  .exec()
  for (const candidate of candidates as any[]){
    console.log(candidate.githubUser)
  }


  //console.log("Candidatos encontrados:", candidates);
}

const skillRequestedTest = {
  languages: ['JavaScript', 'Python'],
  technologies: ['react', 'Node.js'],
  yearsOfExperience: 1,
  field: ['Data science','Mobile application']
};
mongoose.connect('mongodb://localhost:27017/talentdb')
  .then(async () => {
    console.log('Conexión a MongoDB exitosa');
    // Coloca aquí la llamada a tu función que realiza las operaciones de Mongoose
    const cans: filteredCandidates[] =  await filterCandidates(skillRequestedTest);
    console.log(selectBestCandidates(cans,profileRequestedExample))
  })
  .catch(err => console.error('Error al conectar a MongoDB', err));

export default {

  createTeamCreator,
  deleteTeamCreator
};
