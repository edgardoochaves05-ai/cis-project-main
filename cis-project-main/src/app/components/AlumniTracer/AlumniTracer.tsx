import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowLeft, Users, TrendingUp, Building2 } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';
import type { AlumniRecord } from '../../context/CareerServiceContext';

export function AlumniTracer() {
  const { studentProfile, addAlumniRecord } = useCareerService();
  const [formData, setFormData] = useState({
    employmentStatus: 'employed' as AlumniRecord['employmentStatus'],
    currentCompany: '',
    currentPosition: '',
    salary: '',
    employedWithinMonths: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfile) {
      const record: AlumniRecord = {
        id: crypto.randomUUID(),
        studentId: studentProfile.id,
        name: studentProfile.name,
        graduationYear: studentProfile.graduationYear,
        major: studentProfile.major,
        employmentStatus: formData.employmentStatus,
        currentCompany: formData.currentCompany || undefined,
        currentPosition: formData.currentPosition || undefined,
        salary: formData.salary || undefined,
        employedWithinMonths: formData.employedWithinMonths ? parseInt(formData.employedWithinMonths) : undefined,
        surveyDate: new Date().toISOString(),
        verified: false,
      };
      addAlumniRecord(record);
      setSubmitted(true);
    }
  };

  if (!studentProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Alumni Employment Survey</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <p className="text-yellow-800">
              Please <Link to="/student/profile" className="underline font-medium">complete your profile</Link> to submit your employment information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Alumni Employment Survey</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">Thank You!</h2>
            <p className="text-green-800 mb-6">
              Your employment information has been submitted successfully. This data helps us improve our career services and support future students.
            </p>
            <Link to="/student" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/student" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Alumni Employment Survey</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-bold text-blue-900 mb-1">Graduate Tracer Study</h3>
              <p className="text-blue-800 text-sm">
                Help us track the success of our graduates. Your information is confidential and will be used to improve our programs and support future students.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Student Information</h2>
            <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{studentProfile.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Major</p>
                <p className="font-medium text-gray-900">{studentProfile.major}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Expected Graduation</p>
                <p className="font-medium text-gray-900">{studentProfile.graduationYear}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">GPA</p>
                <p className="font-medium text-gray-900">{studentProfile.gpa || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Employment Information</h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status *</label>
              <select
                required
                value={formData.employmentStatus}
                onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="pursuing_education">Pursuing Further Education</option>
              </select>
            </div>

            {formData.employmentStatus === 'employed' && (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Company *</label>
                    <input
                      type="text"
                      required
                      value={formData.currentCompany}
                      onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position/Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.currentPosition}
                      onChange={(e) => setFormData({ ...formData, currentPosition: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range (Optional)</label>
                    <select
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="Below ₱20,000">Below ₱20,000</option>
                      <option value="₱20,000 - ₱30,000">₱20,000 - ₱30,000</option>
                      <option value="₱30,000 - ₱50,000">₱30,000 - ₱50,000</option>
                      <option value="₱50,000 - ₱75,000">₱50,000 - ₱75,000</option>
                      <option value="Above ₱75,000">Above ₱75,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Months After Graduation to Employment
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.employedWithinMonths}
                      onChange={(e) => setFormData({ ...formData, employedWithinMonths: e.target.value })}
                      placeholder="e.g., 3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Employment Information
          </button>
        </form>
      </div>
    </div>
  );
}
