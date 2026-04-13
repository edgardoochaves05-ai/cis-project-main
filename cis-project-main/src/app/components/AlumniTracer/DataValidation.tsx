import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, LayoutDashboard, ToggleRight, BadgeCheck, ChevronRight } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const features = [
  {
    icon: LayoutDashboard,
    title: 'Admin Management Portal',
    description:
      'A centralized dashboard for career counselors or administrative staff to review all submitted alumni surveys and manage records efficiently.',
  },
  {
    icon: ToggleRight,
    title: 'Verification Workflow',
    description:
      'Admins can verify employment details by toggling the verified status from false to true, confirming the accuracy of the submitted information.',
  },
  {
    icon: BadgeCheck,
    title: 'Quality Assurance',
    description:
      'Ensures that Placement and Employment Analytics dashboards rely on validated, credible data, reinforcing the institutional case study on process improvement.',
  },
];

export function DataValidation() {
  const { studentProfile, alumniRecords } = useCareerService();

  const myRecord = studentProfile
    ? alumniRecords
        .filter((r) => r.studentId === studentProfile.id)
        .sort((a, b) => new Date(b.surveyDate).getTime() - new Date(a.surveyDate).getTime())[0]
    : null;

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
                <ShieldCheck className="w-8 h-8 text-[#292929]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Transaction 03
                </p>
                <h1 className="text-2xl font-bold text-[#292929]">Data Validation</h1>
              </div>
            </div>
            <motion.div whileHover={{ x: -2 }}>
              <Link
                to="/student/alumni"
                className="flex items-center gap-2 text-[#292929] hover:text-[#FFB507] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Alumni Portal
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">

        {/* Goal Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-[#292929] rounded-2xl px-8 py-6 mb-8 flex items-start gap-4"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFB507] flex items-center justify-center mt-0.5">
            <ShieldCheck className="w-5 h-5 text-[#292929]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest mb-1">Goal</p>
            <p className="text-white text-sm leading-relaxed">
              Establish data integrity to ensure metrics fed into the institutional dashboards
              reflect accurate, clean information.
            </p>
          </div>
        </motion.div>

        {/* Verification Status Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-[#292929] mb-4">Your Record Status</h3>

          {myRecord ? (
            <motion.div
              whileHover={{ borderColor: '#FFB507' }}
              className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden transition-colors"
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
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Employment</p>
                  <p className="font-semibold text-[#292929] capitalize">
                    {myRecord.employmentStatus.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      myRecord.verified ? 'bg-green-500' : 'bg-[#FFB507]'
                    }`}
                  />
                  <span className="text-sm font-semibold text-[#292929]">
                    {myRecord.verified
                      ? 'Verified by Admin'
                      : 'Pending Verification — awaiting admin review'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  Submitted:{' '}
                  {new Date(myRecord.surveyDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
              <ShieldCheck className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="font-semibold text-gray-500 mb-1">No Record Found</p>
              <p className="text-sm text-gray-400 mb-4">
                You have not submitted a survey yet. Submit one to enable data validation.
              </p>
              <Link
                to="/student/alumni/survey"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#292929] text-white text-sm font-semibold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
              >
                Submit Survey <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">Validation Process</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: '#FFB507', boxShadow: '0 8px 20px rgba(0,0,0,0.07)' }}
              className="bg-white rounded-xl border border-gray-200 p-6 transition-all"
            >
              <div className="w-11 h-11 rounded-lg bg-[#292929] flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-[#FFB507]" />
              </div>
              <h4 className="font-bold text-[#292929] mb-2">{f.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
