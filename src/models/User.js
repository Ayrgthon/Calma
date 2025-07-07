export const createUserModel = (data) => {
  return {
    _id: data._id || null,
    username: data.username,
    email: data.email,
    createdAt: data.createdAt || new Date(),
    progress: data.progress || {
      completedChallenges: [],
      streakCount: 0,
      lastLoginDate: new Date()
    }
  };
}; 