const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: String,        
  degree: String,            
  yearRange: String,         
  grade: String              
});

const AchievementSchema = new mongoose.Schema({
  title: String,
  description: String
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String
});

// New Experience schema
const ExperienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String },        
  location: String,
  description: String
});

const PortfolioSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  name: String,
  description: String,
  education: [EducationSchema],
  achievements: [AchievementSchema],
  projects: [ProjectSchema],
  experience: [ExperienceSchema],    
  socialLinks: {
    github: String,
    instagram: String,
    linkedin: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
