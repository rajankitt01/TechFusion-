import { handleContactSubmission } from '../server/contactHandler.js';

export default async function handler(req, res) {
  return handleContactSubmission(req, res);
}
