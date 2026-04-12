import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { Building2, FileText, Users, CheckCircle, ChevronRight, Clock } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

export function EmployerDashboard() {
  const { employer, jobPostings } = useCareerService();

  const stats = [
    {
      label: 'Verification Status',
      value: employer?.status || 'Not Registered',
      icon: CheckCircle,
    },
    {
      label: 'Active Job Postings',
      value: jobPostings.filter((j) => j.status === 'active').length,
      icon: FileText,
    },
    {
      label: 'Total Applicants',
      value: jobPostings.reduce((sum, job) => sum + (job.applicants?.length || 0), 0),
      icon: Users,
    },
    {
      label: 'Pending Approvals',
      value: jobPostings.filter((j) => j.status === 'pending_approval').length,
      icon: Clock,
    },
  ];

  const quickLinks = [
    {
      title: 'Company Profile',
      description: 'Manage your company information and verification',
      icon: Building2,
      link: '/employer/profile',
    },
    {
      title: 'Job Postings',
      description: 'Create and manage your job postings',
      icon: FileText,
      link: '/employer/jobs',
    },
    {
      title: 'Applicant Management',
      description: 'Review and shortlist job applicants',
      icon: Users,
      link: '/employer/applicants',
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="min-h-screen bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <motion.div
        className="bg-white border-b-2 border-[#FFB507]"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ rotate: -8, scale: 1.05 }}>
                <Building2 className="w-8 h-8 text-[#292929]" />
              </motion.div>
              <h1 className="text-2xl font-bold text-[#292929]">Employer Portal</h1>
            </div>
            <Link to="/" className="text-[#292929] hover:text-[#FFB507] transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8">
          <h2 className="text-3xl font-bold text-[#292929] mb-2">
            Welcome{employer ? `, ${employer.companyName}` : ' to Employer Portal'}!
          </h2>
          <p className="text-gray-600">Manage your recruitment and find talented candidates</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: '#FFB507', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-colors"
            >
              <motion.div
                whileHover={{ rotate: 12 }}
                className="w-12 h-12 rounded-full bg-[#292929] flex items-center justify-center mb-4"
              >
                <stat.icon className="w-6 h-6 text-[#FFB507]" />
              </motion.div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#292929]">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Alerts */}
        {employer && employer.status === 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-[#FFF4CC] border border-[#FFB507] rounded-lg p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#292929] mt-0.5" />
              <div>
                <h3 className="font-bold text-[#292929] mb-1">Verification Pending</h3>
                <p className="text-[#292929] text-sm">
                  Your company profile is under review. You'll be notified once verification is complete.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {!employer && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="bg-white border border-[#FFB507] rounded-lg p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#292929] mt-0.5" />
              <div>
                <h3 className="font-bold text-[#292929] mb-1">Complete Your Registration</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Register your company to start posting job opportunities and accessing our talent pool.
                </p>
                <Link
                  to="/employer/profile"
                  className="inline-block bg-[#292929] text-[#FFB507] px-4 py-2 rounded-lg hover:bg-[#1f1f1f] transition-colors text-sm font-medium"
                >
                  Register Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Links */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">Quick Actions</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {quickLinks.map((link) => (
              <motion.div key={link.title} variants={fadeUp} whileHover={{ y: -4 }}>
                <Link to={link.link} className="group block">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#FFB507] transition-all h-full">
                    <div className="flex items-start justify-between mb-4">
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className="w-12 h-12 rounded-lg bg-[#292929] flex items-center justify-center flex-shrink-0"
                      >
                        <link.icon className="w-6 h-6 text-[#FFB507]" />
                      </motion.div>
                      <motion.div whileHover={{ x: 4 }}>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#292929] transition-colors" />
                      </motion.div>
                    </div>
                    <h4 className="font-bold text-[#292929] mb-2">{link.title}</h4>
                    <p className="text-sm text-gray-600">{link.description}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Recent Job Postings */}
        {jobPostings.length > 0 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <h3 className="text-xl font-bold text-[#292929] mb-4">Recent Job Postings</h3>
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {jobPostings.slice(0, 5).map((job) => (
                <motion.div
                  key={job.id}
                  variants={fadeUp}
                  whileHover={{ backgroundColor: '#fafafa', x: 3 }}
                  className="border-b last:border-b-0 p-4 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-[#292929]">{job.title}</h4>
                      <p className="text-sm text-gray-600">
                        {job.location} • {job.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{job.applicants?.length || 0} applicants</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === 'active'
                            ? 'bg-[#292929] text-[#FFB507]'
                            : job.status === 'pending_approval'
                            ? 'bg-[#FFB507] text-[#292929]'
                            : job.status === 'draft'
                            ? 'bg-gray-200 text-[#292929]'
                            : 'bg-[#FFF4CC] text-[#292929]'
                        }`}
                      >
                        {job.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
