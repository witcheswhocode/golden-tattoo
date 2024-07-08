import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper to get the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine which .env file to use based on NODE_ENV
const env = process.env.NODE_ENV || 'development';
const envFile = `.env.${env}`;
console.log(`Loading environment variables from ${envFile}`);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, `frontend/${envFile}`) });

// Run the build command in the frontend directory
execSync(`cd frontend && yarn install && yarn build:${env}`, { stdio: 'inherit' });
