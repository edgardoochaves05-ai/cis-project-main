import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';
import type { StudentProfile as StudentProfileType } from '../../context/CareerServiceContext';

// UUID generator
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export function StudentProfile() {
  const { studentProfile, setStudentProfile } = useCareerService();

  const [formData, setFormData] = useState<StudentProfileType>(() => {
    if (studentProfile) {
      return { ...studentProfile };
    }
    return {
      id: generateUUID(),
      name: '',
      email: '',
      phone: '',
      major: '',
      graduationYear: '',
      gpa: '',
      skills: [],
      bio: '',
    };
  });

  const [newSkill, setNewSkill] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (studentProfile) {
      setFormData({ ...studentProfile });
    }
  }, [studentProfile]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSave = {
      ...formData,
      graduationYear: formData.graduationYear === 'e.g., 2026' ? '' : formData.graduationYear,
      gpa: formData.gpa === 'e.g., 3.75' ? '' : formData.gpa,
      bio: formData.bio === 'Tell us about yourself, your interests, and career goals...' ? '' : formData.bio,
    };
    setStudentProfile(dataToSave);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white border-b-2 border-[#FFB507]">
        <div className="container mx-auto px-4 py-4">
          <Link to="/student" className="flex items-center gap-2 text-[#292929] hover:text-[#FFB507] mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-[#292929]">My Profile & Skills Inventory</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-[#292929] mb-6">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#292929] mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] mb-2">Major *</label>
                <input
                  type="text"
                  required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                  placeholder="e.g., Information Systems"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] mb-2">Expected Graduation Year *</label>
                <input
                  type="text"
                  required
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                  placeholder="e.g., 2026"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#292929] mb-2">GPA</label>
                <input
                  type="text"
                  value={formData.gpa}
                  onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                  placeholder="e.g., 3.75"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                />
              </div>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-[#292929] mb-2">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              placeholder="Tell us about yourself, your interests, and career goals..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
            />
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#292929] mb-4">Skills Inventory</h3>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                placeholder="Add a skill (e.g., Python, Communication, Leadership)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
              />
              <button
                type="button"
                onClick={addSkill}
                className="bg-[#292929] text-white px-4 py-2 rounded-lg hover:bg-[#1f1f1f] transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-[#FFF4CC] text-[#292929] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 border border-[#FFB507]"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-black">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
              {formData.skills.length === 0 && <p className="text-gray-500 text-sm">No skills added yet</p>}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="bg-[#FFB507] text-[#292929] px-6 py-3 rounded-lg hover:bg-[#E0A100] transition-colors flex items-center gap-2 font-semibold"
            >
              <Save className="w-4 h-4" />
              Save Profile
            </button>
            {saved && <span className="text-[#292929] font-medium">Profile saved successfully!</span>}
          </div>
        </form>
      </div>
    </div>
  );
}
