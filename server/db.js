import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create or connect to the SQLite database file
const dbPath = path.resolve(__dirname, 'registrations.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    
    // Recreate the registrations table with new schema
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS registrations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          fullName TEXT NOT NULL,
          bennettEmail TEXT UNIQUE NOT NULL,
          whatsappNumber TEXT NOT NULL,
          college TEXT,
          course TEXT,
          yearOfStudy TEXT,
          linkedinProfile TEXT NOT NULL,
          githubProfile TEXT,
          portfolio TEXT,
          joinReason TEXT,
          domains TEXT,
          techStack TEXT,
          tools TEXT,
          hasProjects TEXT,
          projectLinks TEXT,
          workUpload TEXT,
          bestProjectDesc TEXT,
          skills TEXT,
          currentlyLearning TEXT,
          personality TEXT,
          talkHours TEXT,
          vibe TEXT,
          attendOffline TEXT,
          whyApprove TEXT,
          registrationDate DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating table', err.message);
        } else {
          console.log('Registrations table is ready with new schema.');
        }
      });
    });
  }
});

export default db;
