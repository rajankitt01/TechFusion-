import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { handleContactSubmission } from './server/contactHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security and body parsing
app.use(express.json({ limit: '50kb' }));

// API route for Contact Form
app.post('/api/contact', (req, res) => {
  handleContactSubmission(req, res);
});

// Serve built static assets in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for client-side routing (Express 4 & 5 compatible)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Export app for serverless / testing
export { app };

// If executed directly (node server.js), start listening
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  app.listen(PORT, () => {
    console.log(`TechFusion production server running at http://localhost:${PORT}`);
  });
}
