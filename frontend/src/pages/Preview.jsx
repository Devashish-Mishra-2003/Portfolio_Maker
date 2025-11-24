import React, { useEffect, useState } from 'react';
import axios from 'axios';

// SVG Icons
const BriefcaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v5m0 0H8m4 0h4M4 7v10a2 2 0 002 2h12a2 2 0 002-2V7M12 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
  </svg>
);

const GraduationCapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7" />
  </svg>
);

const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l1.4 4.25a1.5 1.5 0 001.43 1.05l4.59.34-3.71 2.8a1.5 1.5 0 00-.5 1.53l1.14 4.47-3.66-2.55a1.5 1.5 0 00-1.59 0L8.51 16.38l1.14-4.47a1.5 1.5 0 00-.5-1.53l-3.71-2.8 4.59-.34a1.5 1.5 0 001.43-1.05L12 2z" />
  </svg>
);

const FolderIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2h-5l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const SocialIconLink = ({ href, children, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-indigo-700 hover:text-indigo-900 transition transform hover:scale-110">
    {children}
  </a>
);

export default function Preview() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    axios.get('/api/portfolio')
      .then(res => {
        setPortfolio(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600 text-xl font-semibold">Loading...</div>;
  if (!portfolio) return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">Portfolio not found.</div>;

  const { name, description, experience = [], education = [], achievements = [], projects = [], socialLinks = {} } = portfolio;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-10 animate-fadeInUp" style={{ animationDuration: '1s' }}>
        {/* Header with Avatar */}
        <header className="flex items-center space-x-6 mb-10">
          <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 font-bold text-4xl uppercase select-none">
            {name ? name.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
          <h1 className="text-4xl font-extrabold text-indigo-900">{name || 'Your Name'}</h1>
        </header>

        {/* Description */}
        <section className="mb-12 text-lg text-gray-700">{description || 'A brief description about you.'}</section>

        {/* Experience */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center animate-fadeInUp">
            <BriefcaseIcon /> Experience
          </h2>
          {experience.length ? experience.map((exp, idx) => (
            <div key={idx} className="mb-6 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
              <h3 className="text-xl font-semibold text-indigo-900">{exp.position || 'Position'}</h3>
              <p className="text-indigo-700 italic">{exp.company || 'Company'}</p>
              <p className="text-gray-600">{`${exp.startYear || 'Start'} - ${exp.endYear || 'Present'}`}</p>
              {exp.location && <p className="text-gray-700">{exp.location}</p>}
              {exp.description && <p className="mt-2 text-gray-800">{exp.description}</p>}
            </div>
          )) : <p className="text-gray-500 italic">No experience added yet.</p>}
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center animate-fadeInUp">
            <GraduationCapIcon /> Education
          </h2>
          {education.length ? education.map((edu, idx) => (
            <div key={idx} className="mb-6 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
              <h3 className="text-xl font-semibold text-indigo-900">{edu.degree || 'Degree'}</h3>
              <p className="text-indigo-700 italic">{edu.institution || 'Institution'}</p>
              <p className="text-gray-600">{edu.yearRange || 'Year Range'}</p>
              {edu.grade && <p className="text-gray-700">Grade: {edu.grade}</p>}
            </div>
          )) : <p className="text-gray-500 italic">No education added yet.</p>}
        </section>

        {/* Achievements */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center animate-fadeInUp">
            <TrophyIcon /> Achievements
          </h2>
          {achievements.length ? achievements.map((ach, idx) => (
            <div key={idx} className="mb-6 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
              <h3 className="text-xl font-semibold text-indigo-900">{ach.title || 'Title'}</h3>
              <p>{ach.description || 'Description'}</p>
            </div>
          )) : <p className="text-gray-500 italic">No achievements added yet.</p>}
        </section>

        {/* Projects */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 flex items-center animate-fadeInUp">
            <FolderIcon /> Projects
          </h2>
          {projects.length ? projects.map((proj, idx) => (
            <div key={idx} className="mb-6 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 animate-fadeInUp">
              <h3 className="text-xl font-semibold text-indigo-900">{proj.title || 'Project Title'}</h3>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">
                  {proj.link}
                </a>
              )}
              <p>{proj.description || 'Description'}</p>
            </div>
          )) : <p className="text-gray-500 italic">No projects added yet.</p>}
        </section>

        {/* Social Links */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-700 mb-6 animate-fadeInUp">Connect</h2>
          <div className="flex space-x-6">
            {socialLinks.github && (
              <SocialIconLink href={socialLinks.github} label="GitHub">
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.372 0 0 5.372 0 12a12 12 0 008.207 11.419c.6.111.82-.261.82-.58v-2.027c-3.338.725-4.042-1.608-4.042-1.608-.546-1.386-1.334-1.755-1.334-1.755-1.09-.745.082-.729.082-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.76-1.604-2.665-.303-5.467-1.335-5.467-5.933 0-1.31.468-2.379 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.524 11.524 0 016.005 0c2.294-1.552 3.3-1.23 3.3-1.23.653 1.653.243 2.874.12 3.176.77.842 1.236 1.911 1.236 3.221 0 4.61-2.807 5.626-5.479 5.922.43.37.812 1.102.812 2.222v3.293c0 .322.218.697.825.58A12.003 12.003 0 0024 12c0-6.628-5.372-12-12-12z" />
                </svg>
              </SocialIconLink>
            )}
            {socialLinks.instagram && (
              <SocialIconLink href={socialLinks.instagram} label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7.75a4.25 4.25 0 110 8.5 4.25 4.25 0 010-8.5zm0 2.5a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zM17.5 6.25a.75.75 0 110 1.5.75.75 0 010-1.5z" />
                </svg>
              </SocialIconLink>
            )}
            {socialLinks.linkedin && (
              <SocialIconLink href={socialLinks.linkedin} label="LinkedIn">
                <svg
                  className="w-8 h-8 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11.75 19.25h-3v-8h3v8zm-1.5-9.1a1.75 1.75 0 11.002-3.5 1.75 1.75 0 01-.002 3.5zm13.25 9.1h-3v-4c0-.96-.9-1.5-1.45-1.5-.55 0-1.5.27-1.5 1.6v3.9h-3v-8h3v1.1c.39-.59 1.65-1.16 2.7-1.16 1.8 0 3.3 1.1 3.3 3.6v4.4z" />
                </svg>
              </SocialIconLink>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}


