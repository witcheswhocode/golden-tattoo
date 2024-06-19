import Bull from 'bull';
const redisURL = process.env.REDIS_URL || "redis://127.0.0.1:6379";

// Create a Bull queue
const myQueue = new Bull("myQueue", redisURL);

export { myQueue };
