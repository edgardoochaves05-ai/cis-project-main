import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Plus, Edit2, Eye } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';
import type { JobPosting } from '../../context/CareerServiceContext';

export function JobPostingManagement() {
  const { employer, jobPostings, addJobPosting, updateJobPosting } = useCareerService();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    location: '',
    type: 'full-time' as 'internship' | 'full-time' | 'part-time',
    salary: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      requirements: '',
      location: '',
      type: 'full-time',
      salary: '',
    });
    setEditingJob(null);
    setShowForm(false);
  };

  const handleEdit = (job: JobPosting) => {
    setFormData({
      title: job.title,
      description: job.description,
      requirements: job.requirements,
      location: job.location,
      type: job.type,
      salary: job.salary,
    });
    setEditingJob(job);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent, status: JobPosting['status']) => {
    e.preventDefault();
    if (employer) {
      if (editingJob) {
        updateJobPosting(editingJob.id, { ...formData, status });
      } else {
        const newJob: JobPosting = {
          id: crypto.randomUUID(),
          employerId: employer.id,
          companyName: employer.companyName,
          ...formData,
          postedDate: new Date().toISOString(),
          status,
          applicants: [],
        };
        addJobPosting(newJob);
      }
      resetForm();
    }
  };

  const getStatusColor = (status: JobPosting['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending_approval':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/employer" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Job Posting Management</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!employer ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              Please <Link to="/employer/profile" className="underline font-medium">register your company</Link> before posting jobs.
            </p>
          </div>
        ) : employer.status !== 'verified' ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              Your company is pending verification. You can create draft postings, but they won't be visible until your company is verified.
            </p>
          </div>
        ) : null}

        {employer && !showForm && (
          <div className="mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Plus className="w-4 h-4" />
              Create New Job Posting
            </button>
          </div>
        )}

        {showForm && (
          <form className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                <select
                  required
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="internship">Internship</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range</label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                  placeholder="e.g., $60,000 - $80,000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  placeholder="Describe the position, responsibilities, and what the candidate will do..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements *</label>
                <textarea
                  required
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={5}
                  placeholder="List required skills, qualifications, and experience..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={(e: any) => handleSubmit(e, 'draft')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={(e: any) => handleSubmit(e, 'pending_approval')}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
              >
                Submit for Approval
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-white text-gray-700 px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Your Job Postings</h2>
          </div>

          {jobPostings.length === 0 ? (
            <div className="p-8 text-center">
              <Plus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No job postings yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {jobPostings.map((job) => (
                <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span className="capitalize">{job.type.replace('-', ' ')}</span>
                        {job.salary && (
                          <>
                            <span>•</span>
                            <span>{job.salary}</span>
                          </>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        Posted: {new Date(job.postedDate).toLocaleDateString()} • {job.applicants?.length || 0} applicants
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(job.status)}`}>
                        {job.status.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleEdit(job)}
                        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
