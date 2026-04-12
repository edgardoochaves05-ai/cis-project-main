import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Plus, Briefcase, Building2, Calendar, FileText } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';
import type { JobApplication } from '../../context/CareerServiceContext';

export function ApplicationTracking() {
  const { studentProfile, applications, addApplication, allJobPostings } = useCareerService();
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfile) {
      const newApplication: JobApplication = {
        id: crypto.randomUUID(),
        studentId: studentProfile.id,
        jobId: crypto.randomUUID(),
        jobTitle: formData.jobTitle,
        companyName: formData.companyName,
        appliedDate: new Date().toISOString(),
        status: 'submitted',
        notes: formData.notes,
      };
      addApplication(newApplication);
      setFormData({ jobTitle: '', companyName: '', notes: '' });
      setShowAddForm(false);
    }
  };

  const applyToJob = (jobId: string, jobTitle: string, companyName: string) => {
    if (studentProfile) {
      const newApplication: JobApplication = {
        id: crypto.randomUUID(),
        studentId: studentProfile.id,
        jobId,
        jobTitle,
        companyName,
        appliedDate: new Date().toISOString(),
        status: 'submitted',
        notes: '',
      };
      addApplication(newApplication);
    }
  };

  const getStatusColor = (status: JobApplication['status']) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'under_review':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const activeJobs = allJobPostings.filter(
    (job) => job.status === 'active' && !applications.some((app) => app.jobId === job.id),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Application Tracking</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!studentProfile && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              Please <Link to="/student/profile" className="underline font-medium">complete your profile</Link> before applying to jobs.
            </p>
          </div>
        )}

        {activeJobs.length > 0 && studentProfile && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Available Opportunities</h2>
            <div className="grid gap-4">
              {activeJobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                      <p className="text-gray-600 mb-2">{job.companyName}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Building2 className="w-4 h-4" />
                          {job.location}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{job.type}</span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2">{job.description}</p>
                    </div>
                    <button
                      onClick={() => applyToJob(job.id, job.title, job.companyName)}
                      className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Applications</h2>
          {studentProfile && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add External Application
            </button>
          )}
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-4">Add External Application</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input
                  type="text"
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Submit Application
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {applications.length === 0 ? (
            <div className="p-8 text-center">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No applications yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {applications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{app.jobTitle}</h3>
                      <p className="text-gray-600">{app.companyName}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                      {app.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Applied: {new Date(app.appliedDate).toLocaleDateString()}
                    </span>
                  </div>
                  {app.notes && (
                    <div className="mt-3 flex items-start gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                      <p className="text-gray-700">{app.notes}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
