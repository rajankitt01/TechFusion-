import { Resend } from 'resend';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Rate limiting in-memory storage: IP -> Array of timestamps
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up old rate limit entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const recent = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}, 15 * 60 * 1000).unref?.();

/**
 * Checks if the given client IP has exceeded the rate limit.
 */
function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    rateLimitMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return false;
}

/**
 * Escapes characters that have special meaning in HTML to prevent HTML injection.
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/`/g, '&#96;');
}

/**
 * Validates email format according to standard RFC patterns.
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  // RFC 5322 compatible pattern for robust email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}

/**
 * Parses request body for both Express and Node native incoming requests.
 */
export async function parseRequestBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', chunk => {
      raw += chunk;
      // Protect against oversized payloads (max 50KB)
      if (raw.length > 50 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!raw.trim()) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

/**
 * Sends JSON response across Express, Vite connect middleware, and Node native http.
 */
export function sendJsonResponse(res, statusCode, data) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

/**
 * Main handler for processing contact form submissions.
 */
export async function handleContactSubmission(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return sendJsonResponse(res, 405, {
      success: false,
      error: 'Method Not Allowed. Only POST is supported.',
    });
  }

  // Determine client IP for rate limiting
  const forwarded = req.headers['x-forwarded-for'];
  const clientIp = typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress || '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return sendJsonResponse(res, 429, {
      success: false,
      error: 'Too many inquiries submitted from your network. Please wait a few minutes before trying again.',
    });
  }

  let body;
  try {
    body = await parseRequestBody(req);
  } catch (err) {
    return sendJsonResponse(res, 400, {
      success: false,
      error: 'Malformed request payload.',
    });
  }

  const {
    firstName,
    lastName,
    businessEmail,
    phoneNumber,
    service,
    budget,
    projectDetails,
    _gotcha,
  } = body;

  // Anti-Spam: If honeypot is filled, return success silently without sending email
  if (_gotcha && String(_gotcha).trim().length > 0) {
    return sendJsonResponse(res, 200, {
      success: true,
      message: 'Thank you for your project inquiry. Your information has been received successfully. Our team will contact you shortly.',
    });
  }

  // Server-side validation
  const validationErrors = [];

  const cleanFirstName = typeof firstName === 'string' ? firstName.trim() : '';
  const cleanLastName = typeof lastName === 'string' ? lastName.trim() : '';
  const cleanEmail = typeof businessEmail === 'string' ? businessEmail.trim() : '';
  const cleanPhone = typeof phoneNumber === 'string' ? phoneNumber.trim() : '';
  const cleanService = typeof service === 'string' ? service.trim() : '';
  const cleanBudget = typeof budget === 'string' ? budget.trim() : '';
  const cleanDetails = typeof projectDetails === 'string' ? projectDetails.trim() : '';

  if (!cleanFirstName) {
    validationErrors.push('First Name is required.');
  } else if (cleanFirstName.length > 100) {
    validationErrors.push('First Name is too long (maximum 100 characters).');
  }

  if (!cleanLastName) {
    validationErrors.push('Last Name is required.');
  } else if (cleanLastName.length > 100) {
    validationErrors.push('Last Name is too long (maximum 100 characters).');
  }

  if (!cleanEmail) {
    validationErrors.push('Business Email is required.');
  } else if (!isValidEmail(cleanEmail)) {
    validationErrors.push('A valid Business Email address is required.');
  }

  if (cleanPhone && cleanPhone.length > 50) {
    validationErrors.push('Phone number is too long (maximum 50 characters).');
  }

  if (!cleanService) {
    validationErrors.push('Primary Service Required is required.');
  } else if (cleanService.length > 150) {
    validationErrors.push('Selected service is invalid.');
  }

  if (cleanBudget && cleanBudget.length > 100) {
    validationErrors.push('Project Budget is too long (maximum 100 characters).');
  }

  if (!cleanDetails) {
    validationErrors.push('Project Details & Technical Goals are required.');
  } else if (cleanDetails.length < 10) {
    validationErrors.push('Project Details must be at least 10 characters.');
  } else if (cleanDetails.length > 5000) {
    validationErrors.push('Project Details must not exceed 5000 characters.');
  }

  if (validationErrors.length > 0) {
    return sendJsonResponse(res, 400, {
      success: false,
      error: validationErrors[0],
      details: validationErrors,
    });
  }

  // Load email configuration securely from server environment
  const companyEmail = process.env.COMPANY_EMAIL;
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'TechFusion <onboarding@resend.dev>';

  if (!companyEmail) {
    console.error('[API /api/contact] Missing COMPANY_EMAIL in environment variables.');
    return sendJsonResponse(res, 500, {
      success: false,
      error: 'Unable to send your inquiry right now. Please try again or contact us directly.',
    });
  }

  if (!resendApiKey || resendApiKey === 'your_resend_api_key') {
    console.error('[API /api/contact] Missing or unconfigured RESEND_API_KEY in environment variables.');
    return sendJsonResponse(res, 500, {
      success: false,
      error: 'Unable to send your inquiry right now. Please try again or contact us directly.',
    });
  }

  // Construct email contents
  const emailSubject = `New Project Inquiry — ${cleanFirstName} ${cleanLastName}`;

  const plainTextBody = `NEW PROJECT INQUIRY
===================

CLIENT INFORMATION

First Name:
${cleanFirstName}

Last Name:
${cleanLastName}

Business Email:
${cleanEmail}

Phone Number:
${cleanPhone || 'Not provided'}

PROJECT INFORMATION

Primary Service Required:
${cleanService}

Project Budget:
${cleanBudget || 'Not specified'}

PROJECT DETAILS & TECHNICAL GOALS

${cleanDetails}

===================
Submitted through the TechFusion website.`;

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(emailSubject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F4F8; color: #0B1220; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E7EF; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(17,24,39,0.04);">
    
    <!-- Header Banner -->
    <div style="background-color: #0B1220; padding: 24px 28px; border-bottom: 3px solid #1677FF;">
      <span style="font-family: monospace; font-size: 11px; letter-spacing: 0.1em; color: #93C5FD; text-transform: uppercase;">// TECHFUSION SYSTEM NOTIFICATION</span>
      <h1 style="margin: 6px 0 0 0; font-size: 20px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.02em;">NEW PROJECT INQUIRY</h1>
    </div>

    <div style="padding: 28px;">
      
      <!-- Section: Client Information -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 13px; font-family: monospace; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #1677FF; border-bottom: 1px solid #EEF3FF; padding-bottom: 6px;">
          CLIENT INFORMATION
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #7A8494; width: 140px; vertical-align: top;">First Name:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0B1220;">${escapeHtml(cleanFirstName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #7A8494; vertical-align: top;">Last Name:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0B1220;">${escapeHtml(cleanLastName)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #7A8494; vertical-align: top;">Business Email:</td>
            <td style="padding: 6px 0; font-weight: 600;">
              <a href="mailto:${escapeHtml(cleanEmail)}" style="color: #1677FF; text-decoration: none;">${escapeHtml(cleanEmail)}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #7A8494; vertical-align: top;">Phone Number:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0B1220;">${escapeHtml(cleanPhone || 'Not provided')}</td>
          </tr>
        </table>
      </div>

      <!-- Section: Project Information -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 13px; font-family: monospace; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #1677FF; border-bottom: 1px solid #EEF3FF; padding-bottom: 6px;">
          PROJECT INFORMATION
        </h2>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; color: #7A8494; width: 140px; vertical-align: top;">Primary Service:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0B1220;">${escapeHtml(cleanService)}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #7A8494; vertical-align: top;">Project Budget:</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0B1220;">${escapeHtml(cleanBudget || 'Not specified')}</td>
          </tr>
        </table>
      </div>

      <!-- Section: Project Details & Technical Goals -->
      <div style="margin-bottom: 24px;">
        <h2 style="margin: 0 0 12px 0; font-size: 13px; font-family: monospace; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #1677FF; border-bottom: 1px solid #EEF3FF; padding-bottom: 6px;">
          PROJECT DETAILS &amp; TECHNICAL GOALS
        </h2>
        <div style="background-color: #F7F8FA; border: 1px solid #E2E7EF; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #2B384E; white-space: pre-wrap;">${escapeHtml(cleanDetails)}</div>
      </div>

      <!-- Footer Info -->
      <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #E2E7EF; font-size: 12px; color: #7A8494; font-family: monospace;">
        Submitted through the TechFusion website. Direct reply will route to <strong style="color: #0B1220;">${escapeHtml(cleanEmail)}</strong>.
      </div>
    </div>
  </div>
</body>
</html>`;

  const resend = new Resend(resendApiKey);

  try {
    // Primary delivery to COMPANY_EMAIL with Reply-To set to the visitor's email
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [companyEmail],
      replyTo: cleanEmail,
      subject: emailSubject,
      text: plainTextBody,
      html: htmlBody,
    });

    if (error) {
      console.error('[API /api/contact] Resend API error:', error);
      return sendJsonResponse(res, 502, {
        success: false,
        error: 'Unable to send your inquiry right now. Please try again or contact us directly.',
      });
    }

    if (!data || !data.id) {
      console.error('[API /api/contact] Resend did not return a confirmation ID.');
      return sendJsonResponse(res, 502, {
        success: false,
        error: 'Unable to send your inquiry right now. Please try again or contact us directly.',
      });
    }

    // Secondary: Auto-reply confirmation email to client (wrapped in try/catch so failure doesn't affect main inquiry)
    try {
      const autoReplySubject = 'We Received Your Project Inquiry — TechFusion';
      const autoReplyText = `Hi ${cleanFirstName},

Thank you for contacting TechFusion.

We have successfully received your project inquiry. Our team will review your requirements and get back to you shortly.

Regards,
TechFusion Team`;

      const autoReplyHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(autoReplySubject)}</title>
</head>
<body style="margin: 0; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F1F4F8; color: #0B1220; line-height: 1.6;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #FFFFFF; border: 1px solid #E2E7EF; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(17,24,39,0.04);">
    <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 700; color: #0B1220;">Hi ${escapeHtml(cleanFirstName)},</h2>
    <p style="font-size: 14px; color: #2B384E; margin-bottom: 12px;">Thank you for contacting TechFusion.</p>
    <p style="font-size: 14px; color: #2B384E; margin-bottom: 24px;">We have successfully received your project inquiry. Our team will review your requirements and get back to you shortly.</p>
    <p style="font-size: 14px; color: #0B1220; margin-bottom: 0;">
      Regards,<br />
      <strong>TechFusion Team</strong>
    </p>
  </div>
</body>
</html>`;

      await resend.emails.send({
        from: fromEmail,
        to: [cleanEmail],
        subject: autoReplySubject,
        text: autoReplyText,
        html: autoReplyHtml,
      });
    } catch (autoReplyErr) {
      console.warn('[API /api/contact] Auto-reply confirmation note:', autoReplyErr?.message || autoReplyErr);
    }

    return sendJsonResponse(res, 200, {
      success: true,
      message: 'Thank you for your project inquiry. Your information has been received successfully. Our team will contact you shortly.',
      id: data.id,
    });
  } catch (err) {
    console.error('[API /api/contact] Unexpected error during email dispatch:', err);
    return sendJsonResponse(res, 500, {
      success: false,
      error: 'Unable to send your inquiry right now. Please try again or contact us directly.',
    });
  }
}
