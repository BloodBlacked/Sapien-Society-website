import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import '../main_components/Hero.css';
import './Register.css';

import ElectricBorder from '../main_components/ElectricBorder';
import WipeTransition from '../main_components/WipeTransition';

const Register = () => {
  const [transition, setTransition] = useState({ active: false, url: null });
  const [showLoader, setShowLoader] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    bennettEmail: '',
    whatsappNumber: '',
    college: '',
    course: '',
    yearOfStudy: '',
    linkedinProfile: '',
    githubProfile: '',
    portfolio: '',
    joinReason: [],
    domains: [],
    techStack: [],
    tools: [],
    hasProjects: '',
    projectLinks: '',
    workUpload: '',
    bestProjectDesc: '',
    skills: '',
    currentlyLearning: '',
    personality: '',
    talkHours: '',
    vibe: '',
    attendOffline: '',
    whyApprove: ''
  });
  
  const [status, setStatus] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', text: '' });

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: 'success', text: 'REQUEST ACCEPTED. WELCOME TO THE NODE.' });
        // Reset form or redirect
      } else {
        setStatus({ type: 'error', text: data.error || 'REGISTRATION FAILED.' });
      }
    } catch (error) {
      setStatus({ type: 'error', text: 'CONNECTION FAILED. TRY AGAIN.' });
    } finally {
      setLoading(false);
    }
  };

  // Helper for generating custom radio buttons
  const renderRadio = (label, name, value) => (
    <label className="custom-radio">
      <input type="radio" name={name} value={value} checked={formData[name] === value} onChange={handleChange} required />
      <span className="radio-mark"></span>
      {label}
    </label>
  );

  // Helper for generating custom checkboxes
  const renderCheckbox = (label, field, value) => (
    <label className="custom-checkbox">
      <input type="checkbox" checked={formData[field].includes(value)} onChange={() => handleCheckbox(field, value)} />
      <span className="check-mark"></span>
      {label}
    </label>
  );

  return (
    <>
      <div className="hero-wrapper" id="register-page">
        <motion.div 
          className="top-left-logo" 
          style={{ transform: 'none', cursor: 'pointer' }} 
          onClick={() => window.location.href = '/'}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="logo-line"></div>
          <div className="logo-text">
            <span className="logo-solid">S<span className="font-special">A</span>P<span className="font-special">I</span>EN</span>
            <span className="logo-outline">S<span className="font-special">O</span>CIE<span className="font-special">T</span>Y</span>
          </div>
        </motion.div>

          <main className="hero-container">
            <motion.header 
              className="hero-header"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="header-top">
                <div className="h-left"></div>
                <div className="h-right">
                  <span>APPLICATION PROTOCOL</span>
                  <span>SYSTEM // ONLINE</span>
                </div>
              </div>
              <div className="header-line"></div>
            </motion.header>

            <div className="geometric-line top-line"></div>

            <motion.div 
              className="hero-title-section" 
              style={{ borderBottom: 'none', overflow: 'visible', paddingBottom: '40px' }}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
            >
              <h1 className="main-title" style={{ fontSize: 'clamp(30px, 8vw, 100px)', lineHeight: '1', overflow: 'visible' }}>
                <span className="font-special">I</span>NITI<span className="font-special">A</span>TE<span className="outline-text"><span className="font-special">A</span>CCE<span className="font-special">S</span>S</span>
              </h1>
            </motion.div>

            <motion.div 
              className="register-form-wrapper" 
              style={{ marginTop: '20px', marginBottom: '60px' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <ElectricBorder color="#7d0000" speed={0.1} chaos={0.3} thickness={2} style={{ borderRadius: 16, width: '100%', maxWidth: '1000px' }}>
                <form className="custom-register-form" onSubmit={handleSubmit}>
                  
                  {/* 1. Full Name & 2. Bennett Email */}
                  <div className="form-row">
                    <div className="input-group">
                      <label>1. FULL NAME</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>2. UNIVERSITY EMAIL ADDRESS</label>
                      <input type="email" name="bennettEmail" value={formData.bennettEmail} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* 3. WhatsApp & 4. College */}
                  <div className="form-row">
                    <div className="input-group">
                      <label>3. WHATSAPP NUMBER</label>
                      <input type="tel" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>4. COLLEGE / UNIVERSITY</label>
                      <input type="text" name="college" value={formData.college} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* 5. Course */}
                  <div className="input-group">
                    <label>5. COURSE / BRANCH</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} required />
                  </div>

                  {/* 6. Year of Study */}
                  <div className="input-group">
                    <label>6. YEAR OF STUDY</label>
                    <div className="options-grid">
                      {renderRadio('1st Year', 'yearOfStudy', '1st Year')}
                      {renderRadio('2nd Year', 'yearOfStudy', '2nd Year')}
                      {renderRadio('3rd Year', 'yearOfStudy', '3rd Year')}
                      {renderRadio('4th Year', 'yearOfStudy', '4th Year')}
                      {renderRadio('5th Year', 'yearOfStudy', '5th Year')}
                      {renderRadio('Graduate', 'yearOfStudy', 'Graduate')}
                    </div>
                  </div>

                  {/* 7. LinkedIn & 8. GitHub */}
                  <div className="form-row">
                    <div className="input-group">
                      <label>7. LINKEDIN PROFILE (MANDATORY)</label>
                      <input type="url" name="linkedinProfile" value={formData.linkedinProfile} onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                      <label>8. GITHUB PROFILE (FOR TECH USERS)</label>
                      <input type="url" name="githubProfile" value={formData.githubProfile} onChange={handleChange} />
                    </div>
                  </div>

                  {/* 9. Portfolio */}
                  <div className="input-group">
                    <label>9. PORTFOLIO / PERSONAL WEBSITE (OPTIONAL)</label>
                    <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} />
                  </div>

                  {/* 10. Why are you joining? */}
                  <div className="input-group">
                    <label>10. WHY ARE YOU JOINING SAPIENS SOCIETY? (SELECT ALL THAT APPLY)</label>
                    <div className="options-grid">
                      {renderCheckbox('Networking', 'joinReason', 'Networking')}
                      {renderCheckbox('Finding like-minded people', 'joinReason', 'Finding like-minded people')}
                      {renderCheckbox('Building projects', 'joinReason', 'Building projects')}
                      {renderCheckbox('Exploring', 'joinReason', 'Exploring')}
                      {renderCheckbox('To dominate hackathons', 'joinReason', 'To dominate hackathons')}
                    </div>
                  </div>

                  {/* 11. Domains */}
                  <div className="input-group">
                    <label>11. WHICH DOMAIN(S) ARE YOU INTERESTED IN?</label>
                    <div className="options-grid">
                      {renderCheckbox('Web Development', 'domains', 'Web Development')}
                      {renderCheckbox('App Development', 'domains', 'App Development')}
                      {renderCheckbox('AI / Machine Learning', 'domains', 'AI / Machine Learning')}
                      {renderCheckbox('Data Science', 'domains', 'Data Science')}
                      {renderCheckbox('Cybersecurity', 'domains', 'Cybersecurity')}
                      {renderCheckbox('Blockchain / Web3', 'domains', 'Blockchain / Web3')}
                      {renderCheckbox('UI/UX Design', 'domains', 'UI/UX Design')}
                      {renderCheckbox('Game Development', 'domains', 'Game Development')}
                      {renderCheckbox('Content Creation', 'domains', 'Content Creation')}
                      {renderCheckbox('Business / Startups', 'domains', 'Business / Startups')}
                      {renderCheckbox('Finance', 'domains', 'Finance')}
                      {renderCheckbox('Other', 'domains', 'Other')}
                    </div>
                  </div>

                  {/* 12. Tech Stack */}
                  <div className="input-group">
                    <label>12. WHAT IS YOUR TECH STACK?</label>
                    <div className="options-grid">
                      {renderCheckbox('HTML / CSS', 'techStack', 'HTML / CSS')}
                      {renderCheckbox('JavaScript', 'techStack', 'JavaScript')}
                      {renderCheckbox('React', 'techStack', 'React')}
                      {renderCheckbox('Next.js', 'techStack', 'Next.js')}
                      {renderCheckbox('Node.js', 'techStack', 'Node.js')}
                      {renderCheckbox('Python', 'techStack', 'Python')}
                      {renderCheckbox('Java', 'techStack', 'Java')}
                      {renderCheckbox('C / C++', 'techStack', 'C / C++')}
                      {renderCheckbox('MongoDB / SQL', 'techStack', 'MongoDB / SQL')}
                      {renderCheckbox('Firebase', 'techStack', 'Firebase')}
                      {renderCheckbox('Three.js / WebGL', 'techStack', 'Three.js / WebGL')}
                      {renderCheckbox('Unity / Unreal', 'techStack', 'Unity / Unreal')}
                      {renderCheckbox('Other', 'techStack', 'Other')}
                    </div>
                  </div>

                  {/* 13. Tools */}
                  <div className="input-group">
                    <label>13. WHAT TOOLS / PLATFORMS DO YOU USE? (OPTIONAL)</label>
                    <div className="options-grid">
                      {renderCheckbox('Figma', 'tools', 'Figma')}
                      {renderCheckbox('Blender', 'tools', 'Blender')}
                      {renderCheckbox('Git / GitHub', 'tools', 'Git / GitHub')}
                      {renderCheckbox('Docker', 'tools', 'Docker')}
                      {renderCheckbox('AWS / Cloud', 'tools', 'AWS / Cloud')}
                      {renderCheckbox('Other', 'tools', 'Other')}
                    </div>
                  </div>

                  {/* 14. Have you built any projects? */}
                  <div className="input-group">
                    <label>14. HAVE YOU BUILT ANY PROJECTS?</label>
                    <div className="options-grid">
                      {renderRadio('Yes', 'hasProjects', 'Yes')}
                      {renderRadio('No', 'hasProjects', 'No')}
                    </div>
                  </div>

                  {/* 15. Project Links */}
                  <div className="input-group">
                    <label>15. SHARE YOUR PROJECT LINKS (GITHUB / LIVE LINKS)</label>
                    <textarea name="projectLinks" value={formData.projectLinks} onChange={handleChange} placeholder='If none, write "NA"' required></textarea>
                  </div>

                  {/* 16. Upload Work */}
                  <div className="input-group">
                    <label>16. UPLOAD YOUR WORK (DRIVE LINK / NOTION / DROPBOX)</label>
                    <input type="url" name="workUpload" value={formData.workUpload} onChange={handleChange} />
                  </div>

                  {/* 17. Best Project */}
                  <div className="input-group">
                    <label>17. DESCRIBE YOUR BEST PROJECT</label>
                    <textarea name="bestProjectDesc" value={formData.bestProjectDesc} onChange={handleChange}></textarea>
                  </div>

                  {/* 18. Skills */}
                  <div className="input-group">
                    <label>18. WHAT SKILLS DO YOU HAVE?</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder="e.g. Graphic Design, Marketing, etc." required />
                  </div>

                  {/* 19. Currently Learning */}
                  <div className="input-group">
                    <label>19. WHAT ARE YOU CURRENTLY LEARNING?</label>
                    <input type="text" name="currentlyLearning" value={formData.currentlyLearning} onChange={handleChange} required />
                  </div>

                  {/* 20. Personality */}
                  <div className="input-group">
                    <label>20. YOU CONSIDER YOURSELF (OPTIONAL)</label>
                    <div className="options-grid">
                      {renderRadio('Introvert', 'personality', 'Introvert')}
                      {renderRadio('Extrovert', 'personality', 'Extrovert')}
                      {renderRadio('Ambivert', 'personality', 'Ambivert')}
                    </div>
                  </div>

                  {/* 21. Talk about for hours */}
                  <div className="input-group">
                    <label>21. ONE THING YOU CAN TALK ABOUT FOR HOURS</label>
                    <input type="text" name="talkHours" value={formData.talkHours} onChange={handleChange} required />
                  </div>

                  {/* 22. Vibe with */}
                  <div className="input-group">
                    <label>22. WHAT TYPE OF PEOPLE DO YOU VIBE WITH?</label>
                    <input type="text" name="vibe" value={formData.vibe} onChange={handleChange} required />
                  </div>

                  {/* 23. Attend Offline */}
                  <div className="input-group">
                    <label>23. WILL YOU ATTEND OFFLINE EVENTS?</label>
                    <div className="options-grid">
                      {renderRadio('Yes', 'attendOffline', 'Yes')}
                      {renderRadio('No', 'attendOffline', 'No')}
                      {renderRadio('Maybe', 'attendOffline', 'Maybe')}
                    </div>
                  </div>

                  {/* 24. Why Approve */}
                  <div className="input-group">
                    <label>24. WHY SHOULD WE APPROVE YOUR PROFILE?</label>
                    <textarea name="whyApprove" value={formData.whyApprove} onChange={handleChange} required></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="know-more-btn" disabled={loading} style={{ border: '2px solid #14171F', background: 'transparent', color: '#14171F', marginTop: '20px' }}>
                      {loading ? '>_ PROCESSING...' : '>_ SUBMIT_REQUEST'}
                    </button>
                    {status.text && (
                      <div className={`form-status ${status.type}`}>
                        {status.text}
                      </div>
                    )}
                  </div>
                </form>
              </ElectricBorder>
            </motion.div>

            <div className="geometric-line bottom-line"></div>
            <motion.footer 
              className="hero-footer" 
              style={{ justifyContent: 'space-between', padding: '10px 350px 0 40px', alignItems: 'center' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button 
                className="know-more-btn"
                onClick={() => setTransition({ active: true, url: '/terms' })} 
                style={{ border: '2px solid #14171F', background: 'transparent', color: '#14171F', padding: '4px 16px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                &lt;_BACK
              </button>
              <span style={{ color: '#14171F', fontWeight: 'bold' }}>DEVELOPED BY ISHANT</span>
            </motion.footer>
          </main>
        </div>
        <WipeTransition
          isActive={transition.active}
          url={transition.url}
          onComplete={() => setTransition({ active: false, url: null })}
        />
    </>
  );
};

export default Register;
