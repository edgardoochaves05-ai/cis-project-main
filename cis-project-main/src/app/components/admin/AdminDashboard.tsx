import { Link } from 'react-router';
import { Shield, BarChart3, Calendar, CheckSquare, Users, Building2, FileText, TrendingUp } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

export function AdminDashboard() {
  const { resumes, jobPostings, careerEvents, alumniRecords, applications } = useCareerService();

  const stats = [
    {
      label: 'Pending Approvals',
      value:
        resumes.filter((r) => r.status === 'pending').length +
        jobPostings.filter((j) => j.status === 'pending_approval').length +
        careerEvents.filter((e) => e.status === 'pending_approval').length,
      icon: CheckSquare,
      color: 'bg-[#FFB507]/15 text-[#292929]',
      link: '/admin/approvals',
    },
    {
      label: 'Active Job Postings',
      value: jobPostings.filter((j) => j.status === 'active').length,
      icon: FileText,
      color: 'bg-[#292929]/10 text-[#292929]',
      link: '/admin/approvals',
    },
    {
      label: 'Upcoming Events',
      value: careerEvents.filter((e) => e.status === 'approved').length,
      icon: Calendar,
      color: 'bg-[#FFB507]/15 text-[#292929]',
      link: '/admin/events',
    },
    {
      label: 'Alumni Records',
      value: alumniRecords.length,
      icon: Users,
      color: 'bg-[#292929]/10 text-[#292929]',
      link: '/admin/analytics',
    },
  ];

  const quickLinks = [
    {
      title: 'Analytics Dashboard',
      description: 'View placement rates and performance metrics',
      icon: BarChart3,
      link: '/admin/analytics',
      color: 'bg-[#292929]',
    },
    {
      title: 'Event Management',
      description: 'Create and manage career events',
      icon: Calendar,
      link: '/admin/events',
      color: 'bg-[#292929]',
    },
    {
      title: 'Approval Workflow',
      description: 'Review and approve pending items',
      icon: CheckSquare,
      link: '/admin/approvals',
      color: 'bg-[#292929]',
    },
  ];

  const recentActivity = [
    ...resumes
      .filter((r) => r.status === 'pending')
      .slice(0, 3)
      .map((r) => ({
        type: 'resume',
        message: `New resume uploaded - Version ${r.version}`,
        time: r.uploadDate,
      })),
    ...jobPostings
      .filter((j) => j.status === 'pending_approval')
      .slice(0, 3)
      .map((j) => ({
        type: 'job',
        message: `New job posting: ${j.title} by ${j.companyName}`,
        time: j.postedDate,
      })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#292929] text-white shadow-lg border-t-4 border-[#FFB507]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-[#FFB507]" />
              <div>
                <h1 className="text-2xl font-bold">Admin Portal</h1>
                <p className="text-[#FFB507] text-sm">Career Resource Service Management</p>
              </div>
            </div>
            <Link to="/" className="text-white hover:text-[#FFB507] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Link key={stat.label} to={stat.link}>
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                <div className={`w-12 h-12 rounded-full ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-[#292929]">{stat.value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-[#292929] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickLinks.map((link) => (
              <Link key={link.title} to={link.link} className="group">
                <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-all h-full border border-gray-200 hover:border-[#FFB507]">
                  <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4`}>
                    <link.icon className="w-6 h-6 text-[#FFB507]" />
                  </div>
                  <h4 className="font-bold text-[#292929] mb-2">{link.title}</h4>
                  <p className="text-sm text-gray-600">{link.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="px-6 py-4 border-b bg-[#292929]/5">
            <h3 className="text-lg font-bold text-[#292929]">Recent Activity</h3>
          </div>
          {recentActivity.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No recent activity</div>
          ) : (
            <div className="divide-y">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-[#FFB507]/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#FFB507]" />
                      <p className="text-[#292929]">{activity.message}</p>
                    </div>
                    <span className="text-sm text-gray-500">{new Date(activity.time).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* System Overview */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-6 h-6 text-[#292929]" />
              <h3 className="font-bold text-[#292929]">Employer Overview</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Job Postings</span>
                <span className="font-bold text-[#292929]">{jobPostings.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Postings</span>
                <span className="font-bold text-[#292929]">{jobPostings.filter((j) => j.status === 'active').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Approval</span>
                <span className="font-bold text-[#FFB507]">
                  {jobPostings.filter((j) => j.status === 'pending_approval').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-[#292929]" />
              <h3 className="font-bold text-[#292929]">Student Activity</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Applications</span>
                <span className="font-bold text-[#292929]">{applications.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Applications</span>
                <span className="font-bold text-[#292929]">
                  {applications.filter((a) => ['submitted', 'under_review', 'interview'].includes(a.status)).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Alumni Tracked</span>
                <span className="font-bold text-[#FFB507]">{alumniRecords.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
