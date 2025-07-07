import { createChallengeModel } from '../models/Challenge';
import { ObjectId } from 'mongodb';

export class ChallengeService {
  constructor(db) {
    this.collection = db.collection('challenges');
  }

  async createChallenge(challengeData) {
    const challenge = createChallengeModel(challengeData);
    const result = await this.collection.insertOne(challenge);
    return { ...challenge, _id: result.insertedId };
  }

  async getDailyChallenge() {
    // Obtener el reto del día actual
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return await this.collection.findOne({
      type: 'daily',
      createdAt: { $gte: today }
    });
  }

  async getAllChallenges() {
    return await this.collection.find().toArray();
  }

  async getChallengeById(challengeId) {
    return await this.collection.findOne({ _id: new ObjectId(challengeId) });
  }
} 