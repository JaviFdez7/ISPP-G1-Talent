import assert from 'assert';
import mongoose from 'mongoose';
import { createUser, getAllUser } from '../../modules/user/services/UserService';

import * as dotenv from 'dotenv';
import * as path from 'path';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createProfessionalExperience, getAllProfessionalExperience } from '../../modules/professional-experience/services/ProfessionalExperienceService';
import { getAllAnalysis } from '../../modules/analysis/services/AnalysisService';
import { createHistory, getFavoritesFromUser, getHistoryFromUser, getNotFavoritesFromUser, toggleFavorite } from '../../modules/history/services/HistoryService';
import { create } from 'domain';
import { get } from 'http';
import { History } from '../../modules/history/models/history';

dotenv.config({ path: path.resolve(__dirname, '') })
describe('Correctly creates, save as favorite, removes form favorites and delete an history for the representative', function () {
  let representativeId: any
  let analysisId: any
  let historyId: any
  before(async function () {
    try {
      const representativeData = {
        username: 'representative',
        password: 'string',
        email: 'representative@example.com',
        phone: '+9720817485488',
        paymentMethods: [
          'string'
        ],
        companyName: 'string',
        companySubscription: 'Basic plan',
        projectSocietyName: 'string'
      };
      const representative = await createUser(representativeData, 'Representative')
      representativeId = representative._id
      const githubUsers = ['andresdominguezruiz', 'motero2k', 'RubenCasal']
      const applications = ['Web application', 'Backend', 'Frontend']
      for (let i = 0; i < 3; i++) {
        const userData = {
          username: 'candidate' + i,
          password: 'string',
          email: 'user' + i + '@example.com',
          phone: '+4617559',
          paymentMethods: [
            'string'
          ],
          fullName: 'string',
          githubUser: githubUsers[i],
          profilePicture: 'string',
          candidateSubscription: 'Basic plan',
          CV: 'string',
          residence: 'string',
          lifestyle: 'On-site'
        };

        const user = await createUser(userData, 'Candidate')
        const jobApplication = {
          startDate: '2023-04-05T16:58:45.824+00:00',
          endDate: '2024-04-05T16:58:45.824+00:00',
          companyName: 'string',
          professionalArea: applications[i],
          lifestyle: 'On-site',
          location: 'string',
          userId: user._id
        };
        await createProfessionalExperience(jobApplication)
      }
    } catch (error: any) {
      console.log(error)
    }
  })
  after(async function () {
    try {
      // VACIAR DB
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    } catch (error: any) {
      console.log(error)
    }
  })
  // VERIFICAR SETUP
  it('should be in db 3 new candidates+1 representative, 3 news professional experiences 3 new analysis and no histories', async function () {
    try {
      const users = await getAllUser()
      assert.strictEqual(users.length, 4)
      const experiences = await getAllProfessionalExperience()
      assert.strictEqual(experiences.length, 3)
      const analysis = await getAllAnalysis()
      analysisId = analysis[0]._id
      assert.strictEqual(analysis.length, 3)
      const history = await getHistoryFromUser(representativeId)
      assert.strictEqual(history.length, 0)
    } catch (error: any) {
      console.log(error)
    }
  })

  it('should get no histories for representative', async function () {
    try {
      const history = await getHistoryFromUser(representativeId)
      assert.strictEqual(history.length, 0)
    } catch (error: any) {
      console.log(error)
    }
  })
  // TEST
  it('should create correctly an history from created analysis for representative', async function () {
    try {
      const history = await createHistory(representativeId, { analysisId })
      historyId = history._id
      assert.strictEqual(history.date.getDate(), new Date().getDate())
      assert.strictEqual(history.userId.toString(), representativeId.toString())
      assert.strictEqual(history.analysisId.toString(), analysisId.toString())
    } catch (error: any) {
      console.log(error)
    }
  })
  it('should get one history object for representative', async function () {
    try {
      const history = await getHistoryFromUser(representativeId)
      assert.strictEqual(history.length, 1)
    } catch (error: any) {
      console.log(error)
    }
  })
  it('should make the history favorite', async function () {
    try {
      const actualHistory = await History.findById(historyId)
      if (actualHistory != null) assert.strictEqual(actualHistory.favorite, false)
      const favoriteHistory = await toggleFavorite(historyId)
      assert.strictEqual(favoriteHistory.favorite, true)
    } catch (error: any) {
      console.log(error)
    }
  })
  it('should get one favorite history for representative and cero not favorites', async function () {
    try {
      const favorites = await getFavoritesFromUser(representativeId)
      const notFavorites = await getNotFavoritesFromUser(representativeId)
      assert.strictEqual(favorites.length, 1)
      assert.strictEqual(notFavorites.length, 0)
    } catch (error: any) {
      console.log(error)
    }
  })
  it('should remove the history from favorites', async function () {
    const actualHistory = await History.findById(historyId)
    if (actualHistory != null) assert.strictEqual(actualHistory.favorite, true)
    const notFavoriteHistory = await toggleFavorite(historyId)
    assert.strictEqual(notFavoriteHistory.favorite, false)
  })
  it('should get one not favorite history for representative and cero favorites', async function () {
    try {
      const favorites = await getFavoritesFromUser(representativeId)
      const notFavorites = await getNotFavoritesFromUser(representativeId)
      assert.strictEqual(favorites.length, 0)
      assert.strictEqual(notFavorites.length, 1)
    } catch (error: any) {
      console.log(error)
    }
  })
  it ('should delete the history', async function () {
    try {
      await History.findByIdAndDelete(historyId)
      const history = await getHistoryFromUser(representativeId)
      assert.strictEqual(history.length, 0)
    } catch (error: any) {
      console.log(error)
    }
  })
})
