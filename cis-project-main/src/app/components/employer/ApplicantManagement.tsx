import { Link } from "react-router";
import { Users, ArrowLeft } from "lucide-react";

export function ApplicantManagement() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#292929] border-t-4 border-[#FFB507] text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-7 h-7 text-[#FFB507]" />
              <div>
                <h1 className="text-2xl font-bold">Applicant Management</h1>
                <p className="text-sm text-[#FFB507]">Review and manage applicants</p>
              </div>
            </div>
            <Link to="/employer" className="inline-flex items-center gap-2 hover:text-[#FFB507] transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-[#292929] mb-2">No applicants yet</h2>
          <p className="text-gray-600 mb-6">Applicants for your job postings will appear here.</p>
          <Link
            to="/employer/jobs"
            className="inline-flex items-center rounded-lg bg-[#292929] px-5 py-2.5 font-semibold text-[#FFB507] hover:bg-[#1f1f1f] transition-colors"
          >
            Manage Job Posts
          </Link>
        </div>
      </div>
    </div>
  );
}
