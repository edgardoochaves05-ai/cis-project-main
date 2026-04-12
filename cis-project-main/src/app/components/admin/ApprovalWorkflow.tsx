import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, FileText, Briefcase, Calendar, Check, X } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

export function ApprovalWorkflow() {
  const { 
    resumes, 
    updateResumeStatus, 
    jobPostings, 
    updateJobPosting,
    careerEvents,
    updateCareerEvent,
  } = useCareerService();

  const [activeTab, setActiveTab] = useState<'resumes' | 'jobs' | 'events'>('resumes');

  const pendingResumes = resumes.filter(r => r.status === 'pending');
  const pendingJobs = jobPostings.filter(j => j.status === 'pending_approval');
  const pendingEvents = careerEvents.filter(e => e.status === 'pending_approval');

  const handleResumeApproval = (id: string, approved: boolean) => {
    updateResumeStatus(id, approved ? 'approved' : 'rejected');
  };

  const handleJobApproval = (id: string, approved: boolean) => {
    updateJobPosting(id, { status: approved ? 'active' : 'draft' });
  };

  const handleEventApproval = (id: string, approved: boolean) => {
    updateCareerEvent(id, { status: approved ? 'approved' : 'cancelled' });
  };

  const tabs = [
    { id: 'resumes', label: 'Resumes', count: pendingResumes.length, icon: FileText },
    { id: 'jobs', label: 'Job Postings', count: pendingJobs.length, icon: Briefcase },
    { id: 'events', label: 'Events', count: pendingEvents.length, icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Approval Workflow</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  {tab.count > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Resume Approvals */}
        {activeTab === 'resumes' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Pending Resume Approvals</h2>
            </div>
            {pendingResumes.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No pending resume approvals</p>
              </div>
            ) : (
              <div className="divide-y">
                {pendingResumes.map((resume) => (
                  <div key={resume.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{resume.fileName}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>Version: {resume.version}</p>
                          <p>Uploaded: {new Date(resume.uploadDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleResumeApproval(resume.id, true)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleResumeApproval(resume.id, false)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Job Posting Approvals */}
        {activeTab === 'jobs' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Pending Job Posting Approvals</h2>
            </div>
            {pendingJobs.length === 0 ? (
              <div className="p-8 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No pending job posting approvals</p>
              </div>
            ) : (
              <div className="divide-y">
                {pendingJobs.map((job) => (
                  <div key={job.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-gray-600 mb-2">{job.companyName}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
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
                        <p className="text-sm text-gray-700 mb-3">{job.description}</p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm font-medium text-gray-900 mb-1">Requirements:</p>
                          <p className="text-sm text-gray-700">{job.requirements}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <button
                        onClick={() => handleJobApproval(job.id, true)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve & Publish
                      </button>
                      <button
                        onClick={() => handleJobApproval(job.id, false)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Event Approvals */}
        {activeTab === 'events' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Pending Event Approvals</h2>
            </div>
            {pendingEvents.length === 0 ? (
              <div className="p-8 text-center">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No pending event approvals</p>
              </div>
            ) : (
              <div className="divide-y">
                {pendingEvents.map((event) => (
                  <div key={event.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                            {event.type.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{event.description}</p>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
                          <p><span className="font-medium">Date:</span> {new Date(event.date).toLocaleDateString()}</p>
                          <p><span className="font-medium">Time:</span> {event.time}</p>
                          <p><span className="font-medium">Location:</span> {event.location}</p>
                          <p><span className="font-medium">Capacity:</span> {event.capacity} participants</p>
                          <p><span className="font-medium">Organizer:</span> {event.organizer}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <button
                        onClick={() => handleEventApproval(event.id, true)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve & Publish
                      </button>
                      <button
                        onClick={() => handleEventApproval(event.id, false)}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
