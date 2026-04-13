import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Send,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
  CheckCircle,
  Clock,
  BadgeCheck,
  FileText,
} from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' as const } },
};

const quickActions = [
  {
    title: 'Alumni Survey Distribution',
    description: 'Receive alerts and access your Graduate Tracer Survey directly',
    icon: Send,
    link: '/student/alumni/distribution',
  },
  {
    title: 'Employment Status Update',
    description: 'Report or update your current employment status and job details',
    icon: RefreshCw,
    link: '/student/alumni/survey',
  },
  {
    title: 'Data Validation',
    description: 'Admin review and verification workflow for submitted survey records',
    icon: ShieldCheck,
    link: '/student/alumni/validation',
  },
];

export function AlumniPortal() {
  const { studentProfile, alumniRecords } = useCareerService();

  // Derive stats from the latest alumni record belonging to this student
  const myRecord = studentProfile
    ? alumniRecords
        .filter((r) => r.studentId === studentProfile.id)
        .sort((a, b) => new Date(b.surveyDate).getTime() - new Date(a.surveyDate).getTime())[0]
    : null;

  const surveyStatus = myRecord ? 'Submitted' : 'Pending';

  const employmentLabel = myRecord
    ? {
        employed: 'Employed',
        unemployed: 'Unemployed',
        'self-employed': 'Self-Employed',
        pursuing_education: 'Pursuing Education',
      }[myRecord.employmentStatus]
    : 'Not Reported';

  const verifiedLabel = myRecord ? (myRecord.verified ? 'Verified' : 'Unverified') : '—';

  const lastUpdated = myRecord
    ? new Date(myRecord.surveyDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Never';

  const stats = [
    { label: 'Survey Status',      value: surveyStatus,      icon: FileText    },
    { label: 'Employment Status',   value: employmentLabel,   icon: CheckCircle },
    { label: 'Record Verified',     value: verifiedLabel,     icon: BadgeCheck  },
    { label: 'Last Updated',        value: lastUpdated,       icon: Clock       },
  ];

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
              <motion.div whileHover={{ rotate: -8, scale: 1.05 }} transition={{ duration: 0.2 }}>
                <ClipboardList className="w-8 h-8 text-[#292929]" />
              </motion.div>
              <h1 className="text-2xl font-bold text-[#292929]">Alumni Portal</h1>
            </div>
            <motion.div whileHover={{ x: -2 }}>
              <Link
                to="/get-started"
                className="text-[#292929] hover:text-[#FFB507] transition-colors"
              >
                Back to Portal Selection
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8">
          <h2 className="text-3xl font-bold text-[#292929] mb-2">
            Welcome back{studentProfile ? `, ${studentProfile.name}` : ''}!
          </h2>
          <p className="text-gray-600">Track your employment journey and contribute to the Graduate Tracer Study</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={popIn}
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
              <p className="text-xl font-bold text-[#292929] leading-tight">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">Quick Actions</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {quickActions.map((action) => (
              <motion.div key={action.title} variants={fadeUp} whileHover={{ y: -4 }}>
                <Link to={action.link} className="group block">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#FFB507] transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          className="w-12 h-12 rounded-lg bg-[#292929] flex items-center justify-center flex-shrink-0"
                        >
                          <action.icon className="w-6 h-6 text-[#FFB507]" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#292929] mb-1">{action.title}</h4>
                          <p className="text-sm text-gray-600">{action.description}</p>
                        </div>
                      </div>
                      <motion.div whileHover={{ x: 4 }}>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#292929] transition-colors flex-shrink-0" />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Latest Submission */}
        {myRecord && (
          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-[#292929] mb-4">Latest Submission</h3>
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              whileHover={{ borderColor: '#FFB507' }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Name</p>
                  <p className="font-semibold text-[#292929]">{myRecord.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Major</p>
                  <p className="font-semibold text-[#292929]">{myRecord.major}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Graduation Year</p>
                  <p className="font-semibold text-[#292929]">{myRecord.graduationYear}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      myRecord.verified
                        ? 'bg-[#FFF4CC] text-[#292929]'
                        : 'bg-[#FFB507] text-[#292929]'
                    }`}
                  >
                    {myRecord.verified ? 'Verified' : 'Pending Verification'}
                  </span>
                </div>
                {myRecord.currentCompany && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Company</p>
                    <p className="font-semibold text-[#292929]">{myRecord.currentCompany}</p>
                  </div>
                )}
                {myRecord.currentPosition && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Position</p>
                    <p className="font-semibold text-[#292929]">{myRecord.currentPosition}</p>
                  </div>
                )}
                {myRecord.salary && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Salary Range</p>
                    <p className="font-semibold text-[#292929]">{myRecord.salary}</p>
                  </div>
                )}
                {myRecord.employedWithinMonths !== undefined && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Months to Employment</p>
                    <p className="font-semibold text-[#292929]">{myRecord.employedWithinMonths} months</p>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-100 px-6 py-3 flex justify-end">
                <Link
                  to="/student/alumni/survey"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#292929] hover:text-[#FFB507] transition-colors"
                >
                  Update Record <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
