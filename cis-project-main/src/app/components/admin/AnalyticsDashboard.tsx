import { Link } from 'react-router';
import { ArrowLeft, TrendingUp, Users, Briefcase, Building2, Award, Clock } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

export function AnalyticsDashboard() {
  const { applications, alumniRecords, jobPostings, careerEvents } = useCareerService();

  // Calculate placement metrics
  const employedAlumni = alumniRecords.filter(a => a.employmentStatus === 'employed').length;
  const placementRate = alumniRecords.length > 0 
    ? ((employedAlumni / alumniRecords.length) * 100).toFixed(1)
    : '0';

  // Calculate average time to employment
  const timesToEmployment = alumniRecords
    .filter(a => a.employmentStatus === 'employed' && a.employedWithinMonths)
    .map(a => a.employedWithinMonths!);
  const avgTimeToEmployment = timesToEmployment.length > 0
    ? (timesToEmployment.reduce((a, b) => a + b, 0) / timesToEmployment.length).toFixed(1)
    : '0';

  // Application statistics
  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(a => a.status === 'accepted').length;
  const successRate = totalApplications > 0
    ? ((acceptedApplications / totalApplications) * 100).toFixed(1)
    : '0';

  // Top employers by job postings
  const employerPostings = jobPostings.reduce((acc, job) => {
    acc[job.companyName] = (acc[job.companyName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topEmployers = Object.entries(employerPostings)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Employment status distribution
  const employmentDistribution = {
    employed: alumniRecords.filter(a => a.employmentStatus === 'employed').length,
    unemployed: alumniRecords.filter(a => a.employmentStatus === 'unemployed').length,
    selfEmployed: alumniRecords.filter(a => a.employmentStatus === 'self-employed').length,
    education: alumniRecords.filter(a => a.employmentStatus === 'pursuing_education').length,
  };

  // Event participation
  const totalEventCapacity = careerEvents.reduce((sum, e) => sum + e.capacity, 0);
  const totalRegistrations = careerEvents.reduce((sum, e) => sum + e.registeredStudents.length, 0);
  const eventParticipationRate = totalEventCapacity > 0
    ? ((totalRegistrations / totalEventCapacity) * 100).toFixed(1)
    : '0';

  const keyMetrics = [
    {
      label: 'Placement Rate',
      value: `${placementRate}%`,
      icon: Award,
      color: 'bg-green-100 text-green-600',
      detail: `${employedAlumni} of ${alumniRecords.length} alumni employed`,
    },
    {
      label: 'Avg. Time to Employment',
      value: `${avgTimeToEmployment} mo`,
      icon: Clock,
      color: 'bg-blue-100 text-blue-600',
      detail: 'Months after graduation',
    },
    {
      label: 'Application Success Rate',
      value: `${successRate}%`,
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      detail: `${acceptedApplications} of ${totalApplications} accepted`,
    },
    {
      label: 'Employer Participation',
      value: topEmployers.length,
      icon: Building2,
      color: 'bg-orange-100 text-orange-600',
      detail: 'Active recruiting partners',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link to="/admin" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Admin Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Performance Dashboard</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric) => (
            <div key={metric.label} className="bg-white rounded-lg shadow-sm p-6">
              <div className={`w-12 h-12 rounded-full ${metric.color} flex items-center justify-center mb-4`}>
                <metric.icon className="w-6 h-6" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{metric.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.detail}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Employment Status Distribution */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Alumni Employment Status</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Employed</span>
                  <span className="font-bold text-green-600">{employmentDistribution.employed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${alumniRecords.length > 0 ? (employmentDistribution.employed / alumniRecords.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Self-Employed</span>
                  <span className="font-bold text-blue-600">{employmentDistribution.selfEmployed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${alumniRecords.length > 0 ? (employmentDistribution.selfEmployed / alumniRecords.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Pursuing Education</span>
                  <span className="font-bold text-purple-600">{employmentDistribution.education}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${alumniRecords.length > 0 ? (employmentDistribution.education / alumniRecords.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">Unemployed</span>
                  <span className="font-bold text-orange-600">{employmentDistribution.unemployed}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${alumniRecords.length > 0 ? (employmentDistribution.unemployed / alumniRecords.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Top Employers */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Top Recruiting Employers</h2>
            {topEmployers.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No employer data available</p>
            ) : (
              <div className="space-y-4">
                {topEmployers.map(([company, count], index) => (
                  <div key={company}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-500">#{index + 1}</span>
                        <span className="text-gray-900 font-medium">{company}</span>
                      </div>
                      <span className="font-bold text-indigo-600">{count} {count === 1 ? 'posting' : 'postings'}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...topEmployers.map(([, c]) => c))) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Application Statistics */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Application Pipeline</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {applications.filter(a => a.status === 'submitted').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Submitted</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-600">
                {applications.filter(a => a.status === 'under_review').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Under Review</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-lg">
              <p className="text-2xl font-bold text-indigo-600">
                {applications.filter(a => a.status === 'interview').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Interview</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {applications.filter(a => a.status === 'accepted').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Accepted</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {applications.filter(a => a.status === 'rejected').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Rejected</p>
            </div>
          </div>
        </div>

        {/* Event Participation */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Career Event Participation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
              <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{careerEvents.length}</p>
              <p className="text-sm text-gray-600 mt-1">Total Events</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{totalRegistrations}</p>
              <p className="text-sm text-gray-600 mt-1">Total Registrations</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-3xl font-bold text-gray-900">{eventParticipationRate}%</p>
              <p className="text-sm text-gray-600 mt-1">Capacity Utilization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
