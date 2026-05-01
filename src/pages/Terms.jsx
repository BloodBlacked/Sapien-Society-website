import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import '../main_components/Hero.css';
import './Terms.css';
import WipeTransition from '../main_components/WipeTransition';

import ElectricBorder from '../main_components/ElectricBorder';

const Terms = () => {
  const [transition, setTransition] = useState({ active: false, url: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="hero-wrapper" id="terms-page">
        <motion.div 
          className="top-left-logo" 
          style={{ transform: 'none', cursor: 'pointer' }} 
          onClick={() => setTransition({ active: true, url: '/' })}
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
                  <span>LEGAL PROTOCOL</span>
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
              <h1 className="main-title" style={{ fontSize: 'clamp(30px, 7vw, 90px)', lineHeight: '1', overflow: 'visible' }}>
                <span className="font-special">T</span>ERM<span className="font-special">S</span><span className="outline-text">&amp;CO<span className="font-special">N</span>DITION<span className="font-special">S</span></span>
              </h1>
            </motion.div>

            <motion.div 
              className="terms-scroll-area" 
              style={{ marginTop: '20px' }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <ElectricBorder color="#7d0000" speed={0.1} chaos={0.3} thickness={2} style={{ borderRadius: 16, width: '100%', maxWidth: '900px' }}>
                <div className="terms-content-box">
                  <p className="terms-date">LAST UPDATED: APRIL 2026</p>
                  
                  <div className="terms-section" style={{ marginBottom: '30px' }}>
                    <p style={{ fontStyle: 'italic', fontWeight: 'bold' }}>"Excellence is not an act, but a habit."</p>
                    <p style={{ marginTop: '15px' }}>Welcome to the Sapien Society. We are an incubator for top minds, a collective driven by ambition, and a proving ground for competence. Sapiens is not a club, we don't have hierarchy. We are a collective, and each member acts as such.</p>
                    <p style={{ marginTop: '10px' }}>To maintain an environment of brilliance and innovation, all members are expected to adhere to the following Code of Conduct.</p>
                  </div>

                  <div className="terms-section">
                    <h2>I. The Sapien Ethos</h2>
                    <ul>
                      <li><strong>Unapologetic Ambition:</strong> We do not settle for mediocrity. We set audacious goals and work tirelessly to achieve them.</li>
                      <li><strong>Relentless Competence:</strong> We believe in the power of skill and the continuous sharpening of our intellect.</li>
                      <li><strong>Collective Brilliance:</strong> Iron sharpens iron. We elevate each other through shared knowledge, constructive feedback, and high-level collaboration.</li>
                    </ul>
                  </div>

                  <div className="terms-section">
                    <h2>II. Membership & Cultivation Rules</h2>
                    <p style={{ marginBottom: '10px' }}>To remain a part of collective, members must actively contribute to the intellectual growth of the society.</p>
                    <ul>
                      <li><strong>No Passive Observers:</strong> The Sapien Society is not a spectator sport. Members are expected to actively participate in discussions, workshops, and brainstorming sessions.</li>
                      <li><strong>The Pursuit of Mastery:</strong> You are expected to be constantly learning. continuous self-improvement is mandatory.</li>
                      <li><strong>Knowledge Transfer:</strong> A collective is only as strong as its shared knowledge. We do not hoard expertise; we open-source it within the group.</li>
                    </ul>
                  </div>

                  <div className="terms-section">
                    <h2>III. The Arena: Hackathons & Competitions</h2>
                    <p style={{ marginBottom: '10px' }}>We enter competitions to test our mettle, learn under pressure, and win. When representing the Sapien Society in the wild, adhere to the following:</p>
                    <ul>
                      <li><strong>Play to Win, Learn to Grow:</strong> Actively participate in hackathons, case studies, and coding competitions—both inside and outside the campus—with the intention of dominating the field. However, view every loss or setback strictly as data for future victories.</li>
                      <li><strong>Pull Your Weight:</strong> Leave your ego at the door when forming a team. A unified team of competent minds will always beat a fragmented group of isolated geniuses.</li>
                      <li><strong>Integrity:</strong> We win through superior skill and innovation. Plagiarism, sabotage, or breaking competition rules is grounds for immediate expulsion from the society.</li>
                    </ul>
                  </div>

                  <div className="terms-section">
                    <h2>IV. Community Guidelines</h2>
                    <p style={{ marginBottom: '10px' }}>An environment of high competence requires a foundation of high respect.</p>
                    <ul>
                      <li><strong>Meritocratic Discourse:</strong> Ideas are judged on their merit, not on the tenure of the person suggesting them. Challenge the idea, never the person.</li>
                      <li><strong>Constructive Candor:</strong> Feedback should be direct, honest, and aimed at improving the project or the individual. Sugarcoating flaws helps no one; malicious criticism is equally useless.</li>
                      <li><strong>Protect the Environment:</strong> Toxicity, discrimination, and unwarranted arrogance drain the group's energy. Protect our culture of focused ambition by treating your peers with utmost professional respect.</li>
                    </ul>
                  </div>

                  <div className="terms-section" style={{ marginTop: '30px' }}>
                    <p><strong>By maintaining your membership in the Sapien Society, you agree to uphold these standards, push your boundaries, and help forge the next generation of top-tier innovators.</strong></p>
                  </div>

                  <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                    <a 
                      className="know-more-btn" 
                      onClick={(e) => { e.preventDefault(); setTransition({ active: true, url: '/apply' }); }} 
                      style={{ border: '2px solid #14171F', background: 'transparent', color: '#14171F', display: 'inline-block', cursor: 'pointer' }}
                    >
                      &gt;_PROCEED_TO_APPLICATION
                    </a>
                  </div>
                </div>
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
                onClick={() => setTransition({ active: true, url: '/' })} 
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

export default Terms;
