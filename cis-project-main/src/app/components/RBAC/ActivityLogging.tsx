import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ScrollText,
  Activity,
  Filter,
  UserCheck,
  FileText,
  Briefcase,
  Calendar,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

type LogType = 'all' | 'auth' | 'resume' | 'application' | 'event' | 'alumni';

const TYPE_COLORS: Record<string, string> = {
  auth:        'bg-[#FFB507] text-[#292929]',
  resume:      'bg-[#292929] text-white',
  application: 'bg-blue-100 text-blue-800',
  event:       'bg-purple-100 text-purple-800',
  alumni:      'bg-green-100 text-green-800',
};

const TYPE_ICONS: Record<string, React.ElementType> = {
  auth:        UserCheck,
  resume:      FileText,
  application: Briefcase,
  event:       Calendar,
  alumni:      Users,
};

const features = [
  {
    icon: Activity,
    title: 'Admin Management Portal',
    description:
      'Admins have full visibility into all user actions — logins, submissions, updates, and approvals — from a single audit dashboard.',
  },
  {
    icon: Filter,
    title: 'Verification Workflow',
    description:
      'Logs can be filtered by activity type to investigate specific events and verify that only authorized actions were performed.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Activity logs provide an immutable audit trail that supports compliance, accountability, and process improvement efforts.',
  },
];

export function ActivityLogging() {
  const { resumes, applications, careerEvents, alumniRecords, appointments } = useCareerService();

  // Build log entries from context data
  const logs = [
    ...resumes.map((r) => ({
      id: r.id,
      type: 'resume' as const,
      message: `Resume uploaded — Version ${r.version} (Status: ${r.status})`,
      timestamp: r.uploadDate,
      user: 'Student',
    })),
    ...applications.map((a) => ({
      id: a.id,
      type: 'application' as const,
      message: `Application submitted for "${a.jobTitle}" at ${a.companyName}`,
      timestamp: a.appliedDate,
      user: a.studentId,
    })),
    ...careerEvents.map((e) => ({
      id: e.id,
      type: 'event' as const,
      message: `Event "${e.title}" — Status: ${e.status}`,
      timestamp: e.date,
      user: e.organizer,
    })),
    ...alumniRecords.map((r) => ({
      id: r.id,
      type: 'alumni' as const,
      message: `Alumni survey submitted by ${r.name} (${r.employmentStatus})`,
      timestamp: r.surveyDate,
      user: r.name,
    })),
    ...appointments.map((a) => ({
      id: a.id,
      type: 'auth' as const,
      message: `Appointment booked with ${a.counselorName} — ${a.purpose}`,
      timestamp: `${a.date}T${a.time}`,
      user: a.studentId,
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const [activeFilter, setActiveFilter] = useState<LogType>('all');

  const filtered = activeFilter === 'all' ? logs : logs.filter((l) => l.type === activeFilter);

  const filterOptions: { value: LogType; label: string }[] = [
    { value: 'all',         label: 'All'          },
    { value: 'auth',        label: 'Auth / Booking' },
    { value: 'resume',      label: 'Resumes'       },
    { value: 'application', label: 'Applications'  },
    { value: 'event',       label: 'Events'        },
    { value: 'alumni',      label: 'Alumni'        },
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
        className="bg-[#292929] border-b-4 border-[#FFB507]"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ rotate: -8, scale: 1.05 }} transition={{ duration: 0.2 }}>
                <ScrollText className="w-8 h-8 text-[#FFB507]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Transaction 03
                </p>
                <h1 className="text-2xl font-bold text-white">Activity Logging</h1>
              </div>
            </div>
            <motion.div whileHover={{ x: -2 }}>
              <Link
                to="/admin/rbac"
                className="flex items-center gap-2 text-white hover:text-[#FFB507] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to RBAC Portal
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Goal Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="bg-[#292929] rounded-2xl px-8 py-6 mb-8 flex items-start gap-4"
        >
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#FFB507] flex items-center justify-center mt-0.5">
            <ScrollText className="w-5 h-5 text-[#292929]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest mb-1">Goal</p>
            <p className="text-white text-sm leading-relaxed">
              Track and audit all user activity across the system to ensure accountability,
              support compliance requirements, and detect unauthorized actions.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">How It Works</h3>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-6 mb-10"
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

        {/* Log Filter & Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-4"
        >
          <h3 className="text-xl font-bold text-[#292929]">
            Activity Log
            <span className="ml-2 text-sm font-normal text-gray-400">({filtered.length} entries)</span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  activeFilter === opt.value
                    ? 'bg-[#292929] text-[#FFB507]'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center text-gray-400">
            <ScrollText className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No activity logs found.</p>
            <p className="text-sm mt-1">Logs will appear here as users interact with the system.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden"
          >
            {filtered.map((log, i) => {
              const Icon = TYPE_ICONS[log.type] ?? Activity;
              return (
                <motion.div
                  key={log.id + i}
                  variants={fadeUp}
                  whileHover={{ backgroundColor: '#FFFDF0' }}
                  className={`flex items-start gap-4 px-6 py-4 transition-colors ${
                    i < filtered.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#292929] flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-[#FFB507]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#292929] leading-snug">{log.message}</p>
                    <p className="text-xs text-gray-400 mt-0.5">User: {log.user}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${TYPE_COLORS[log.type]}`}>
                      {log.type}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(log.timestamp).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}
