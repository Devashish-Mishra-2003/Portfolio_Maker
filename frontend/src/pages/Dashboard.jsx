import React, { useEffect, useState } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import axios from 'axios';

const emptyExperience = { company: '', position: '', startYear: '', endYear: '', location: '', description: '' };
const emptyEducation = { institution: '', degree: '', yearRange: '', grade: '' };
const emptyAchievement = { title: '', description: '' };
const emptyProject = { title: '', description: '', link: '' };

export default function Dashboard() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [experience, setExperience] = useState([emptyExperience]);
  const [education, setEducation] = useState([emptyEducation]);
  const [achievements, setAchievements] = useState([emptyAchievement]);
  const [projects, setProjects] = useState([emptyProject]);
  const [socialLinks, setSocialLinks] = useState({ github: '', instagram: '', linkedin: '' });

  useEffect(() => {
    axios.get('/api/portfolio')
      .then(res => {
        const data = res.data;
        setName(data.name || '');
        setDescription(data.description || '');
        setExperience(data.experience && data.experience.length ? data.experience : [emptyExperience]);
        setEducation(data.education && data.education.length ? data.education : [emptyEducation]);
        setAchievements(data.achievements && data.achievements.length ? data.achievements : [emptyAchievement]);
        setProjects(data.projects && data.projects.length ? data.projects : [emptyProject]);
        setSocialLinks(data.socialLinks || { github: '', instagram: '', linkedin: '' });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function handleAdd(setFunc, emptyItem, list) {
    if (list.length === 1 && Object.values(list[0]).every(val => val === '' || val === null)) return;
    setFunc(prev => [...prev, emptyItem]);
  }

  function handleRemove(setFunc, index, list) {
    if (list.length <= 1) return;
    setFunc(prev => prev.filter((_, i) => i !== index));
  }

  function handleChange(index, setFunc, list, field, value) {
    const newList = [...list];
    newList[index][field] = value;
    setFunc(newList);
  }

  async function handleSave() {
    const payload = { name, description, experience, education, achievements, projects, socialLinks };
    try {
      await axios.post('/api/portfolio', payload);
      alert('Portfolio saved successfully!');
    } catch {
      alert('Error saving portfolio.');
    }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-indigo-600">Loading...</div>;

  const inputClass = "w-full p-3 bg-white border border-indigo-300 rounded focus:outline-none focus:border-indigo-600 transition duration-300";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">LaunchFolio Dashboard</h1>
          <div className="flex space-x-4 items-center">
            <button
              type="button"
              onClick={() => window.open('/preview', '_blank')}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300"
            >
              Preview Portfolio
            </button>
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
          {/* Basic Info */}
          <div className="mb-8">
            <label className="block text-indigo-700 font-semibold mb-2">Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} className={inputClass} required />
          </div>

          <div className="mb-8">
            <label className="block text-indigo-700 font-semibold mb-2">Short Description / Bio</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} className={inputClass} rows={3} />
          </div>

          {/* Experience */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Experience</h2>
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 mb-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-indigo-900">Entry #{idx + 1}</h3>
                  {experience.length > 1 && (
                    <button type="button" onClick={() => handleRemove(setExperience, idx, experience)} className="text-red-600 hover:text-red-800 font-bold">Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Company" className={inputClass} value={exp.company} onChange={e => handleChange(idx, setExperience, experience, 'company', e.target.value)} required />
                  <input type="text" placeholder="Position" className={inputClass} value={exp.position} onChange={e => handleChange(idx, setExperience, experience, 'position', e.target.value)} required />
                  <input type="text" placeholder="Start Year" className={inputClass} value={exp.startYear} onChange={e => handleChange(idx, setExperience, experience, 'startYear', e.target.value)} required />
                  <input type="text" placeholder="End Year (or Present)" className={inputClass} value={exp.endYear} onChange={e => handleChange(idx, setExperience, experience, 'endYear', e.target.value)} />
                  <input type="text" placeholder="Location" className={`${inputClass} col-span-1 md:col-span-2`} value={exp.location} onChange={e => handleChange(idx, setExperience, experience, 'location', e.target.value)} />
                  <textarea placeholder="Description / Responsibilities" rows={3} className={`${inputClass} col-span-1 md:col-span-2`} value={exp.description} onChange={e => handleChange(idx, setExperience, experience, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd(setExperience, emptyExperience, experience)} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">+ Add Experience</button>
          </section>

          {/* Education */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Education</h2>
            {education.map((edu, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 mb-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-indigo-900">Entry #{idx + 1}</h3>
                  {education.length > 1 && (
                    <button type="button" onClick={() => handleRemove(setEducation, idx, education)} className="text-red-600 hover:text-red-800 font-bold">Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Institution" className={inputClass} value={edu.institution} onChange={e => handleChange(idx, setEducation, education, 'institution', e.target.value)} required />
                  <input type="text" placeholder="Degree" className={inputClass} value={edu.degree} onChange={e => handleChange(idx, setEducation, education, 'degree', e.target.value)} required />
                  <input type="text" placeholder="Year Range" className={inputClass} value={edu.yearRange} onChange={e => handleChange(idx, setEducation, education, 'yearRange', e.target.value)} required />
                  <input type="text" placeholder="Grade" className={inputClass} value={edu.grade} onChange={e => handleChange(idx, setEducation, education, 'grade', e.target.value)} />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd(setEducation, emptyEducation, education)} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">+ Add Education</button>
          </section>

          {/* Achievements */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Achievements</h2>
            {achievements.map((ach, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 mb-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-indigo-900">Entry #{idx + 1}</h3>
                  {achievements.length > 1 && (
                    <button type="button" onClick={() => handleRemove(setAchievements, idx, achievements)} className="text-red-600 hover:text-red-800 font-bold">Remove</button>
                  )}
                </div>
                <input type="text" placeholder="Title" className={`${inputClass} mb-3`} value={ach.title} onChange={e => handleChange(idx, setAchievements, achievements, 'title', e.target.value)} required />
                <textarea placeholder="Description" rows={3} className={inputClass} value={ach.description} onChange={e => handleChange(idx, setAchievements, achievements, 'description', e.target.value)} />
              </div>
            ))}
            <button type="button" onClick={() => handleAdd(setAchievements, emptyAchievement, achievements)} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">+ Add Achievement</button>
          </section>

          {/* Projects */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Projects</h2>
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-6 mb-6 transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-indigo-900">Project #{idx + 1}</h3>
                  {projects.length > 1 && (
                    <button type="button" onClick={() => handleRemove(setProjects, idx, projects)} className="text-red-600 hover:text-red-800 font-bold">Remove</button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Title" className={inputClass} value={proj.title} onChange={e => handleChange(idx, setProjects, projects, 'title', e.target.value)} required />
                  <input type="url" placeholder="Link (optional)" className={inputClass} value={proj.link} onChange={e => handleChange(idx, setProjects, projects, 'link', e.target.value)} />
                  <textarea placeholder="Description" rows={3} className={`${inputClass} md:col-span-2`} value={proj.description} onChange={e => handleChange(idx, setProjects, projects, 'description', e.target.value)} />
                </div>
              </div>
            ))}
            <button type="button" onClick={() => handleAdd(setProjects, emptyProject, projects)} className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300">+ Add Project</button>
          </section>

          {/* Social Links */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-indigo-700 mb-4">Social Links</h2>
            <input type="url" placeholder="GitHub URL" className={inputClass + " mb-4"} value={socialLinks.github} onChange={e => setSocialLinks(prev => ({ ...prev, github: e.target.value }))} />
            <input type="url" placeholder="Instagram URL" className={inputClass + " mb-4"} value={socialLinks.instagram} onChange={e => setSocialLinks(prev => ({ ...prev, instagram: e.target.value }))} />
            <input type="url" placeholder="LinkedIn URL" className={inputClass + " mb-4"} value={socialLinks.linkedin} onChange={e => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))} />
          </section>

          <button type="submit" className="px-10 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition duration-300 ease-in-out">
            Save Portfolio
          </button>
        </form>
      </main>
    </div>
  );
}


