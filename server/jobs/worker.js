import { myQueue } from "./jobQueue";

myQueue.process(async (job) => {
  const jobData = job.data;
  // Perform background job with jobData
  console.log("Processing job:", jobData);

  // Simulate a long-running task
  await new Promise((resolve) => setTimeout(resolve, 5000));

  console.log("Job completed");
});
