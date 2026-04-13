import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  UserCog,
  Lock,
  ScrollText,
  ChevronRight,
  Users,
  KeyRound,
  ClipboardList,
} from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
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
    title: 'User Role Assignment',
    description: 'Assign and manage roles for all system users',
    icon: UserCog,
    link: '/admin/rbac/roles',
  },
  {
    title: 'Permission Updates',
    description: 'Define and update what each role is allowed to access',
    icon: Lock,
    link: '/admin/rbac/permissions',
  },
  {
    title: 'Activity Logging',
    description: 'Track and audit all user activity across the system',
    icon: ScrollText,
    link: '/admin/rbac/logs',
  },
];

const ROLES = ['Admin', 'Student', 'Alumni', 'Employer'];

export function RBACPortal() {
  const { alumniRecords, applications, jobPostings, careerEvents } = useCareerService();

  const stats = [
    { label: 'Total Roles',       value: ROLES.length,          icon: KeyRound     },
    { label: 'Alumni Users',      value: alumniRecords.length,  icon: Users        },
    { label: 'Active Job Users',  value: jobPostings.length,    icon: ClipboardList },
    { label: 'System Activities', value: applications.length + careerEvents.length, icon: ScrollText },
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
                <ShieldCheck className="w-8 h-8 text-[#FFB507]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Module 9
                </p>
                <h1 className="text-2xl font-bold text-white">Role-Based Access Control</h1>
              </div>
            </div>
            <motion.div whileHover={{ x: -2 }}>
              <Link to="/admin" className="text-white hover:text-[#FFB507] transition-colors">
                Back to Admin Portal
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">

        {/* Welcome */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8">
          <h2 className="text-3xl font-bold text-[#292929] mb-2">Access Control Dashboard</h2>
          <p className="text-gray-600">Manage user roles, update permissions, and audit system activity</p>
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
              <p className="text-3xl font-bold text-[#292929]">{stat.value}</p>
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

        {/* Roles Overview */}
        <motion.div
          className="mt-8"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold text-[#292929] mb-4">System Roles</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {[
              { role: 'Admin',    desc: 'Full system access, manages all modules',           color: 'border-[#FFB507]' },
              { role: 'Student',  desc: 'Access to career tools, applications, and surveys', color: 'border-gray-300'  },
              { role: 'Alumni',   desc: 'Access to tracer survey and employment updates',    color: 'border-gray-300'  },
              { role: 'Employer', desc: 'Access to job postings and applicant management',   color: 'border-gray-300'  },
            ].map(({ role, desc, color }) => (
              <motion.div
                key={role}
                variants={fadeUp}
                whileHover={{ y: -3, borderColor: '#FFB507' }}
                className={`bg-white rounded-xl border-2 ${color} p-5 transition-all`}
              >
                <div className="w-10 h-10 rounded-full bg-[#292929] flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-[#FFB507]" />
                </div>
                <p className="font-bold text-[#292929] mb-1">{role}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}
