import { createUserModel } from '../models/User';
import { ObjectId } from 'mongodb';

export class UserService {
  constructor(db) {
    this.collection = db.collection('users');
  }

  async createUser(userData) {
    const user = createUserModel(userData);
    const result = await this.collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  async getUserById(userId) {
    return await this.collection.findOne({ _id: new ObjectId(userId) });
  }

  async getUserByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async updateUserProgress(userId, progressData) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { progress: progressData } }
    );
    return result.modifiedCount > 0;
  }

  async addCompletedChallenge(userId, challengeId) {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { 
        $addToSet: { 'progress.completedChallenges': challengeId },
        $inc: { 'progress.streakCount': 1 },
        $set: { 'progress.lastLoginDate': new Date() }
      }
    );
    return result.modifiedCount > 0;
  }
} 