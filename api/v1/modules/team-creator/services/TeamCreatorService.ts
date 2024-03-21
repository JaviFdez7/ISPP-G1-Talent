import { AnalysisModel,AnalysisDocument } from "../../analysis/models/analysis.model";
import {ProfessionalExperience} from "../../professional-experience/models/professional-experience"
import {Candidate,CandidateDocument}  from "../../user/models/user"
import { ProfileRequested,SkillRequested,FilteredCandidates,ProfileMap,TeamCreatorDocument,TeamCreator } from "../models/TeamCreatorModel";
import mongoose from 'mongoose';



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
async function filterCandidates(skillsRequested: SkillRequested): Promise<FilteredCandidates[]> {

  const candidates = await Candidate.find()
  .populate('analysisId')
  .populate('profesionalExperiences') 
  .exec() as unknown as CandidateDocument[];

  const qualifiedCandidates: FilteredCandidates[] = [];

  candidates.forEach(candidate => {
    const hasMatchingSkill = candidate.analysisId.globalTopLanguages.some(lang => skillsRequested.languages.includes(lang.language)) || candidate.analysisId.globalTechnologies.some(tech => skillsRequested.technologies.includes(tech));

    let totalExperienceYears = 0;
    let matchesField = false;

    candidate.profesionalExperiences.forEach(exp => {
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

    if (hasMatchingSkill || (matchesField && totalExperienceYears >= skillsRequested.yearsOfExperience)) {
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
  });
  return qualifiedCandidates;
}

function selectBestCandidates(filteredCandidates: FilteredCandidates[], profilesRequested: ProfileRequested[]): Map<ProfileRequested, FilteredCandidates[]> {
  const bestCandidatesPerProfile = new Map<ProfileRequested, FilteredCandidates[]>();

  for (const profile of profilesRequested) {
    let maxScore = 0;
    const candidatesScores: Map<FilteredCandidates, number> = new Map();

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
async function saveTeamCreator(userId: string, profilesMap: ProfileMap): Promise<void> {
  const profiles = Array.from(profilesMap).map(([profileRequested, recommendedCandidates]) => ({
    profileRequested,
    recommendedCandidates
  }));

 
  const teamCreator = new TeamCreator({
    userId,
    profiles
  });

  await teamCreator.save();
}
export const createTeamCreator: any = async (data: ProfileRequested[],userId: string) => {
  
  const skills: SkillRequested = processSkillsRequested(data);
  const filteredcandidates: FilteredCandidates[] = await filterCandidates(skills);
  const selectCandidates: ProfileMap = selectBestCandidates(filteredcandidates,data);
  await saveTeamCreator(userId,selectCandidates);


};



export const deleteTeamCreator: any = async (id: any) => {

  try {
    const result = await TeamCreator.findByIdAndDelete(id);
  } catch (err) {
    console.error(err);
  }
};

export const getTeamCreatorById: any = async (id: any) => {

  try {
    const result = await TeamCreator.findById(id);
    return result;
  } catch (err) {
    console.error(err);
  }
};
const filteredCandidatesExample: FilteredCandidates[] = [
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
const exampleMap: ProfileMap = new Map([
  [{
    languages: ['JavaScript'],
    technologies: ['React'],
    yearsOfExperience: 3,
    field: 'Front-end Development'
  }, [{
    github_username: 'alexcjohnson',
    languages: ['JavaScript', 'TypeScript'],
    technologies: ['React', 'Node.js'],
    yearsOfExperience: 9.17,
    field: ['Front-end Development']
  }]],
  [{
    languages: ['Python'],
    technologies: ['React', 'Django'],
    yearsOfExperience: 1,
    field: 'Data Science'
  }, [{
    github_username: 'alexcjohnson',
    languages: ['Python', 'JavaScript'],
    technologies: ['Django', 'React'],
    yearsOfExperience: 9.17,
    field: ['Data Science']
  }]]
]);
const profileRequestedExample: ProfileRequested[] =[ {
  languages: ["JavaScript"],
  technologies: ["React"],
  yearsOfExperience: 3,
  field: "Front-end Development"
},{
  languages: ["Python"],
  technologies: ["React", "Django"],
  yearsOfExperience: 1,
  field: "Data Science"  
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


export default {

  createTeamCreator,
  deleteTeamCreator,
  getTeamCreatorById
};
