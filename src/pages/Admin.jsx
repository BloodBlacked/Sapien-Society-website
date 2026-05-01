import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../main_components/Hero.css';
import './Admin.css';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/registrations', {
        headers: {
          'x-admin-password': password
        }
      });

      if (response.ok) {
        const result = await response.json();
        setData(result);
        setIsAuthenticated(true);
      } else {
        setError('ACCESS DENIED. INVALID CREDENTIALS.');
      }
    } catch (err) {
      setError('CONNECTION FAILED.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setData([]);
    setPassword('');
  };

  const parseArray = (str) => {
    try {
      return JSON.parse(str).join(', ');
    } catch {
      return str;
    }
  };

  const downloadExcel = () => {
    if (!data || data.length === 0) return;

    const headers = [
      'ID', 'Registration Date', 'Full Name', 'Bennett Email', 'WhatsApp',
      'College', 'Course', 'Year', 'LinkedIn', 'GitHub', 'Portfolio',
      'Join Reason', 'Domains', 'Tech Stack', 'Tools', 'Has Projects',
      'Project Links', 'Work Upload', 'Best Project', 'Skills', 'Learning',
      'Personality', 'Talk Hours', 'Vibe', 'Offline Events', 'Why Approve'
    ];
    
    const keys = [
      'id', 'registrationDate', 'fullName', 'bennettEmail', 'whatsappNumber',
      'college', 'course', 'yearOfStudy', 'linkedinProfile', 'githubProfile', 'portfolio',
      'joinReason', 'domains', 'techStack', 'tools', 'hasProjects',
      'projectLinks', 'workUpload', 'bestProjectDesc', 'skills', 'currentlyLearning',
      'personality', 'talkHours', 'vibe', 'attendOffline', 'whyApprove'
    ];

    const csvRows = [];
    csvRows.push(headers.map(h => `"${h}"`).join(','));

    for (const row of data) {
      const values = keys.map(key => {
        let val = row[key];
        if (val === null || val === undefined) val = '';
        
        if (['joinReason', 'domains', 'techStack', 'tools'].includes(key)) {
          val = parseArray(val);
        }

        val = String(val).replace(/"/g, '""');
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sapien_Applicants_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="hero-wrapper" id="admin-page">
      <div className="top-left-logo" style={{ transform: 'none', opacity: 1 }}>
        <div className="logo-line"></div>
        <div className="logo-text">
          <span className="logo-solid">S<span className="font-special">A</span>P<span className="font-special">I</span>EN</span>
          <span className="logo-outline">S<span className="font-special">O</span>CIE<span className="font-special">T</span>Y</span>
        </div>
      </div>

      <main className="hero-container">
        <header className="hero-header">
          <div className="header-top">
            <div className="h-left"></div>
            <div className="h-right">
              <span>ADMIN PROTOCOL</span>
              <span>SYSTEM // SECURE</span>
            </div>
          </div>
          <div className="header-line"></div>
        </header>

        <div className="geometric-line top-line"></div>

        <div className="hero-title-section" style={{ borderBottom: 'none', overflow: 'visible', paddingBottom: '20px' }}>
          <h1 className="main-title" style={{ fontSize: 'clamp(30px, 6vw, 80px)', lineHeight: '1', overflow: 'visible' }}>
            <span className="font-special">D</span>AT<span className="font-special">A</span>B<span className="font-special">A</span>SE<span className="outline-text"><span className="font-special">A</span>CCE<span className="font-special">S</span>S</span>
          </h1>
        </div>

        {!isAuthenticated ? (
          <div className="admin-login-wrapper">
            <form className="admin-login-form" onSubmit={handleLogin}>
              <div className="input-group">
                <label>AUTHORIZATION KEY</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="know-more-btn" disabled={loading} style={{ border: '2px solid #14171F', background: 'transparent', color: '#14171F', marginTop: '20px' }}>
                  {loading ? '>_ AUTHENTICATING...' : '>_ LOGIN'}
                </button>
              </div>
              {error && <div className="form-status error" style={{ marginTop: '20px' }}>{error}</div>}
            </form>
          </div>
        ) : (
          <div className="admin-dashboard-wrapper">
            <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>TOTAL APPLICANTS: {data.length}</h3>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button className="know-more-btn" onClick={downloadExcel} style={{ border: '2px solid #14171F', background: 'transparent', color: '#14171F', padding: '4px 16px', fontSize: '12px', cursor: 'pointer' }}>
                  &gt;_ DOWNLOAD DATA
                </button>
                <button className="know-more-btn logout-btn" onClick={handleLogout} style={{ border: '2px solid #14171F', background: 'transparent', color: '#14171F', padding: '4px 16px', fontSize: '12px', cursor: 'pointer' }}>
                  &gt;_ LOGOUT
                </button>
              </div>
            </div>
            
            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>WhatsApp</th>
                    <th>College</th>
                    <th>Course</th>
                    <th>Year</th>
                    <th>LinkedIn</th>
                    <th>GitHub</th>
                    <th>Portfolio</th>
                    <th>Join Reason</th>
                    <th>Domains</th>
                    <th>Tech Stack</th>
                    <th>Tools</th>
                    <th>Has Projects</th>
                    <th>Project Links</th>
                    <th>Work Upload</th>
                    <th>Best Project</th>
                    <th>Skills</th>
                    <th>Learning</th>
                    <th>Personality</th>
                    <th>Talk Hours</th>
                    <th>Vibe</th>
                    <th>Offline Events</th>
                    <th>Why Approve</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{new Date(row.registrationDate).toLocaleString()}</td>
                      <td>{row.fullName}</td>
                      <td>{row.bennettEmail}</td>
                      <td>{row.whatsappNumber}</td>
                      <td>{row.college}</td>
                      <td>{row.course}</td>
                      <td>{row.yearOfStudy}</td>
                      <td><a href={row.linkedinProfile} target="_blank" rel="noreferrer">Link</a></td>
                      <td>{row.githubProfile ? <a href={row.githubProfile} target="_blank" rel="noreferrer">Link</a> : 'N/A'}</td>
                      <td>{row.portfolio ? <a href={row.portfolio} target="_blank" rel="noreferrer">Link</a> : 'N/A'}</td>
                      <td>{parseArray(row.joinReason)}</td>
                      <td>{parseArray(row.domains)}</td>
                      <td>{parseArray(row.techStack)}</td>
                      <td>{parseArray(row.tools)}</td>
                      <td>{row.hasProjects}</td>
                      <td>{row.projectLinks}</td>
                      <td>{row.workUpload ? <a href={row.workUpload} target="_blank" rel="noreferrer">Link</a> : 'N/A'}</td>
                      <td>{row.bestProjectDesc}</td>
                      <td>{row.skills}</td>
                      <td>{row.currentlyLearning}</td>
                      <td>{row.personality}</td>
                      <td>{row.talkHours}</td>
                      <td>{row.vibe}</td>
                      <td>{row.attendOffline}</td>
                      <td>{row.whyApprove}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="geometric-line bottom-line"></div>
        <footer className="hero-footer">
          <Link to="/" style={{ color: '#14171F', textDecoration: 'none', fontWeight: 'bold' }}>&lt; RETURN</Link>
        </footer>
      </main>
    </div>
  );
};

export default Admin;
