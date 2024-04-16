import { get } from 'http';
import { getAllAnalysis } from '../../analysis/services/AnalysisService';
import { getAllTeamCreators } from '../../team-creator/services/TeamCreatorService';
import { TeamCreatorDocument } from '../../team-creator/models/TeamCreatorModel';
import { type RepositoryInfo } from '../../analysis/models/analysis.model';
import { getAllProfessionalExperience } from '../../professional-experience/services/ProfessionalExperienceService';
import { ProfessionalExperienceDocument } from '../../professional-experience/models/professional-experience';
import Trend from '../models/trend';

function countLanguages (languages: string[]): Record<string, number> {
  const languageCount: Record<string, number> = {};
  for (const language of languages) {
    const lowerCaseLanguage = language.toLowerCase();
    if (lowerCaseLanguage in languageCount)
      languageCount[lowerCaseLanguage]++;
    else
      languageCount[lowerCaseLanguage] = 1;
  }
  return languageCount;
}

function countTechnologies (technologies: string[]): Record<string, number> {
  const technologyCount: Record<string, number> = {};
  for (const technology of technologies) {
    const lowerCaseTechnology = technology.toLowerCase();
    if (lowerCaseTechnology in technologyCount)
      technologyCount[lowerCaseTechnology]++;
    else
      technologyCount[lowerCaseTechnology] = 1;
  }
  return technologyCount;
}

function countFields (fields: string[]): Record<string, number> {
  const fieldCount: Record<string, number> = {};
  for (const field of fields) {
    const lowerCaseField = field.toLowerCase();
    if (lowerCaseField in fieldCount)
      fieldCount[lowerCaseField]++;
    else
      fieldCount[lowerCaseField] = 1;
  }
  return fieldCount;
}

function getTopThree (counts: Record<string, number>): Array<[string, number]> {
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
}

function getGlobalTopRepositories (topRepositories: RepositoryInfo[]): RepositoryInfo[] {
  return topRepositories
    .sort((a, b) => (b.forks + b.stars) - (a.forks + a.stars))
    .slice(0, 3);
}

async function getTrendData () {
  const analysis = await getAllAnalysis();
  const teamCreators = await getAllTeamCreators();
  const profesionalExperiences = await getAllProfessionalExperience();
  // Data from teamCreators
  let technologies: any[] = [];
  let languages: any[] = [];
  const fields = [];
  let experience = 0;
  for (const teamCreator of teamCreators) {
    for (const profile of teamCreator.profiles) {
      const profileRequested = profile.profileRequested;
      technologies = technologies.concat(profileRequested.technologies);
      languages = languages.concat(profileRequested.languages);
      fields.push(profileRequested.field);
      experience += profileRequested.yearsOfExperience;
    }
  }
  const technologyCount = countTechnologies(technologies);
  const languageCount = countLanguages(languages);
  const fieldCount = countFields(fields);
  const topThreeTechnologies = getTopThree(technologyCount);
  const topThreeLanguages = getTopThree(languageCount);
  const topThreeFields = getTopThree(fieldCount);
  const experienceMean = experience / teamCreators.length;
  // Data from analysis
  const candidateLanguages: any[] = [];
  const candidateTechnologies: any[] = [];
  const topRepositories: any[] = [];
  for (const analysisItem of analysis) {
    candidateLanguages.push(...analysisItem.globalTopLanguages.map((lang: any) => lang.language));
    candidateTechnologies.push(...analysisItem.globalTechnologies);
    topRepositories.push(...analysisItem.topRepositories);
  }
  const candidateLanguageCount = countLanguages(candidateLanguages);
  const candidateTechnologyCount = countTechnologies(candidateTechnologies);
  const globalTopRepositories = getGlobalTopRepositories(topRepositories);
  const topThreeCandidateLanguages = getTopThree(candidateLanguageCount);
  const topThreeCandidateTechnologies = getTopThree(candidateTechnologyCount);
  // Data from profesionalExperiences
  const ocupatedFields: string[] = [];
  for (const profesionalExperience of profesionalExperiences)
    ocupatedFields.push(profesionalExperience.professionalArea);

  const ocupatedFieldCount = countFields(ocupatedFields);
  const topThreeOcupatedFields = getTopThree(ocupatedFieldCount);

  return {
    mostSolicitatedTechnologies: topThreeTechnologies,
    mostSolicitatedLanguages: topThreeLanguages,
    mostSolicitatedFields: topThreeFields,
    yearsOfExperienceMean: experienceMean,
    mostUsedLanguages: topThreeCandidateLanguages,
    mostUsedTechnologies: topThreeCandidateTechnologies,
    mostOcupatedFields: topThreeOcupatedFields,
    topRepositories: globalTopRepositories
  };
}

export const getTrend: any = async () => {
  try {
    const res = await Trend.find();
  if (res.length === 0) {
    const trendData = await getTrendData();
    const trend = new Trend({
      date: new Date(),
      state: 'Updated',
      ...trendData
    });
    await trend.save();
    return trend;
  } else if (new Date().getDay() > res[0].date.getDay() && res[0].state !== 'In Progress') {
    await Trend.updateOne({ _id: res[0]._id }, { date: new Date(), state: 'In Progress' });
    const data = await getTrendData();
    await Trend.updateOne({ _id: res[0]._id }, { state: 'Updated', ...data });
    return await Trend.findById(res[0]._id);
  } else if (new Date().getDay() > res[0].date.getDay() && res[0].state === 'In Progress') {
    return "Trend data is being updated. Please try again later."
  } else
    return res[0];
  } catch (error: any) {
    console.error(error);
    throw new Error('Error getting trend data')
  }
  
}

export default {
  getTrend
};
