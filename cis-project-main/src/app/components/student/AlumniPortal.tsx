import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ClipboardList, Send, RefreshCw, ShieldCheck, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const transactions = [
  {
    icon: Send,
    number: '01',
    title: 'Alumni Survey Distribution',
    goal: 'Automate the distribution of employment surveys to graduates to maximize response rates and reduce manual follow-ups.',
    features: [
      { label: 'Trigger-Based Notifications', detail: 'Automatically generates in-app alerts for students who have reached their expected graduation year or lack an alumni record.' },
      { label: 'Simplified Access', detail: 'Graduates receive a direct link to the Alumni Tracer Survey to ensure high engagement.' },
      { label: 'Integration Points', detail: 'Taps into the existing notification service to alert alumni smoothly.' },
    ],
    link: '/student/alumni/survey',
    linkLabel: 'Go to Survey',
  },
  {
    icon: RefreshCw,
    number: '02',
    title: 'Employment Status Update',
    goal: 'Allow graduates to easily report and update their employment progress over time.',
    features: [
      { label: 'Dynamic Survey Dashboard', detail: 'A dedicated interface where alumni can state their current status: Employed, Unemployed, Self-Employed, or Pursuing Education.' },
      { label: 'Comprehensive Fields', detail: 'Tracks current company, position/title, estimated salary range, and months to secure employment post-graduation.' },
      { label: 'Record Edits', detail: 'Alumni can return to update their records if they get promoted or change companies, providing real-time data.' },
    ],
    link: '/student/alumni/survey',
    linkLabel: 'Update My Status',
  },
  {
    icon: ShieldCheck,
    number: '03',
    title: 'Data Validation',
    goal: 'Establish data integrity to ensure metrics fed into institutional dashboards reflect accurate, clean information.',
    features: [
      { label: 'Admin Management Portal', detail: 'A centralized dashboard for career counselors or administrative staff to review submitted surveys.' },
      { label: 'Verification Workflow', detail: 'Admins can verify employment details by clicking a validation toggle, switching verified status from false to true.' },
      { label: 'Quality Assurance', detail: 'Ensures Placement and Employment Analytics dashboards rely on validated, credible data for process improvement.' },
    ],
    link: '/admin',
    linkLabel: 'Admin Access',
  },
];

export function AlumniPortal() {
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
              <Link to="/get-started" className="flex items-center gap-2 text-[#292929] hover:text-[#FFB507] transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Portal Selection
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-10 max-w-5xl">

        {/* Section Title */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }} className="mb-6">
          <h3 className="text-2xl font-bold text-[#292929]">Transactions</h3>
          <p className="text-gray-500 text-sm mt-1">Three core transactions power the Graduate Tracer Study module.</p>
        </motion.div>

        {/* Transaction Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {transactions.map((tx) => (
            <motion.div
              key={tx.title}
              variants={fadeUp}
              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              className="bg-white rounded-2xl border-2 border-gray-200 hover:border-[#FFB507] transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-100">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF4CC] flex-shrink-0">
                  <tx.icon className="w-6 h-6 text-[#292929]" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-bold text-[#FFB507] uppercase tracking-widest">Transaction {tx.number}</span>
                  <h4 className="text-lg font-bold text-[#292929] leading-tight">{tx.title}</h4>
                </div>
                <Link
                  to={tx.link}
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-[#292929] text-white text-sm font-semibold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
                >
                  {tx.linkLabel}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Card Body */}
              <div className="px-6 py-5">
                <p className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold text-[#292929]">Goal: </span>{tx.goal}
                </p>
                <ul className="space-y-3">
                  {tx.features.map((f) => (
                    <li key={f.label} className="flex items-start gap-3">
                      <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#FFB507] flex items-center justify-center">
                        <svg className="w-3 h-3 text-[#292929]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">
                        <span className="font-semibold text-[#292929]">{f.label}: </span>{f.detail}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Mobile CTA */}
                <Link
                  to={tx.link}
                  className="sm:hidden mt-5 inline-flex items-center gap-1.5 px-4 py-2 bg-[#292929] text-white text-sm font-semibold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
                >
                  {tx.linkLabel}
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
