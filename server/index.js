import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// 1. Post registration data
app.post('/api/register', (req, res) => {
  const {
    fullName, bennettEmail, whatsappNumber, college, course, yearOfStudy,
    linkedinProfile, githubProfile, portfolio, joinReason, domains, techStack,
    tools, hasProjects, projectLinks, workUpload, bestProjectDesc, skills,
    currentlyLearning, personality, talkHours, vibe, attendOffline, whyApprove
  } = req.body;

  if (!fullName || !bennettEmail || !whatsappNumber || !linkedinProfile) {
    return res.status(400).json({ error: 'Full name, email, WhatsApp, and LinkedIn are required.' });
  }

  // Helper to stringify arrays safely
  const safeStringify = (val) => Array.isArray(val) ? JSON.stringify(val) : (val || null);

  const query = `
    INSERT INTO registrations (
      fullName, bennettEmail, whatsappNumber, college, course, yearOfStudy,
      linkedinProfile, githubProfile, portfolio, joinReason, domains, techStack,
      tools, hasProjects, projectLinks, workUpload, bestProjectDesc, skills,
      currentlyLearning, personality, talkHours, vibe, attendOffline, whyApprove
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    fullName, bennettEmail, whatsappNumber, college || null, course || null, yearOfStudy || null,
    linkedinProfile, githubProfile || null, portfolio || null, safeStringify(joinReason),
    safeStringify(domains), safeStringify(techStack), safeStringify(tools), hasProjects || null,
    projectLinks || null, workUpload || null, bestProjectDesc || null, skills || null,
    currentlyLearning || null, personality || null, talkHours || null, vibe || null,
    attendOffline || null, whyApprove || null
  ];

  db.run(query, params, function (err) {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed: registrations.bennettEmail')) {
        return res.status(409).json({ error: 'Email is already registered.' });
      }
      console.error('Error inserting data:', err.message);
      return res.status(500).json({ error: 'Internal server error.' });
    }

    res.status(201).json({
      message: 'Registration successful',
      data: { id: this.lastID, fullName, bennettEmail }
    });
  });
});

app.get('/api/registrations', (req, res) => {
  const adminPassword = req.headers['x-admin-password'];
  if (adminPassword !== 'AssamiSuckDick') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  db.all(`SELECT * FROM registrations ORDER BY registrationDate DESC`, [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return res.status(500).json({ error: 'Internal server error.' });
    }
    res.status(200).json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
