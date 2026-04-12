import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Upload, FileText, Check, X, Clock } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';
import type { Resume } from '../../context/CareerServiceContext';

export function ResumeManagement() {
  const { studentProfile, resumes, addResume } = useCareerService();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && studentProfile) {
      setUploading(true);

      setTimeout(() => {
        const newResume: Resume = {
          id: crypto.randomUUID(),
          studentId: studentProfile.id,
          fileName: file.name,
          version: resumes.length + 1,
          uploadDate: new Date().toISOString(),
          status: 'pending',
          fileUrl: URL.createObjectURL(file),
        };
        addResume(newResume);
        setUploading(false);
        e.target.value = '';
      }, 1000);
    }
  };

  const getStatusIcon = (status: Resume['status']) => {
    switch (status) {
      case 'approved':
        return <Check className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <X className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: Resume['status']) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Resume Management</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!studentProfile ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-800">
              Please <Link to="/student/profile" className="underline font-medium">complete your profile</Link> before uploading resumes.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload New Resume</h2>
            <p className="text-gray-600 mb-6">
              Upload your resume for review. Our career services team will review and approve your resume.
            </p>
            <label className="relative cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium mb-2">
                  {uploading ? 'Uploading...' : 'Click to upload resume'}
                </p>
                <p className="text-sm text-gray-600">PDF, DOC, or DOCX (Max 5MB)</p>
              </div>
            </label>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Resume History & Version Tracking</h2>
          </div>

          {resumes.length === 0 ? (
            <div className="p-8 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No resumes uploaded yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Version
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resumes.map((resume) => (
                    <tr key={resume.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">v{resume.version}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{resume.fileName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {new Date(resume.uploadDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(resume.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(resume.status)}`}>
                            {resume.status === 'pending'
                              ? 'Pending Review'
                              : resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {resume.fileUrl ? (
                          <a
                            href={resume.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-medium"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-gray-400 font-medium">No file</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
