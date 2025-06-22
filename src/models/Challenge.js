export const createChallengeModel = (data) => {
  return {
    _id: data._id || null,
    title: data.title,
    description: data.description,
    type: data.type, // 'daily', 'weekly', 'monthly'
    points: data.points || 10,
    createdAt: data.createdAt || new Date(),
    completionCriteria: data.completionCriteria || {}
  };
}; 