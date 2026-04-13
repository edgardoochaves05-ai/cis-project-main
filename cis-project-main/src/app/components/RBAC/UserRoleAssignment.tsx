import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, UserCog, Users, Briefcase, GraduationCap, ShieldCheck, Save } from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type Role = 'Admin' | 'Student' | 'Alumni' | 'Employer';

const ROLE_ICONS: Record<Role, React.ElementType> = {
  Admin:    ShieldCheck,
  Student:  GraduationCap,
  Alumni:   Users,
  Employer: Briefcase,
};

const ROLE_COLORS: Record<Role, string> = {
  Admin:    'bg-[#FFB507] text-[#292929]',
  Student:  'bg-[#292929] text-white',
  Alumni:   'bg-blue-100 text-blue-800',
  Employer: 'bg-green-100 text-green-800',
};

const features = [
  {
    icon: UserCog,
    title: 'Trigger-Based Notifications',
    description:
      'The system automatically detects new registrations and prompts admins to assign the appropriate role based on the user type.',
  },
  {
    icon: ShieldCheck,
    title: 'Simplified Role Management',
    description:
      'Admins can assign or change roles from a single interface, reducing overhead and ensuring correct access levels at all times.',
  },
  {
    icon: Users,
    title: 'Integration Points',
    description:
      'Role assignments propagate instantly across all modules — portals, dashboards, and permissions update in real time.',
  },
];

export function UserRoleAssignment() {
  const { studentProfile, employer, alumniRecords } = useCareerService();

  // Build a user list from available context data
  const initialUsers = [
    ...(studentProfile
      ? [{
          id: studentProfile.id,
          name: studentProfile.name,
          email: studentProfile.email,
          role: (alumniRecords.some(r => r.studentId === studentProfile.id)
            ? 'Alumni'
            : 'Student') as Role,
          source: 'Student Profile',
        }]
      : []),
    ...(employer
      ? [{
          id: employer.id,
          name: employer.contactName,
          email: employer.email,
          role: 'Employer' as Role,
          source: 'Employer Profile',
        }]
      : []),
    {
      id: 'admin-001',
      name: 'System Administrator',
      email: 'admin@tip.edu.ph',
      role: 'Admin' as Role,
      source: 'System',
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [saved, setSaved] = useState<string | null>(null);

  const handleRoleChange = (id: string, role: Role) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  };

  const handleSave = (id: string) => {
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
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
        className="bg-[#292929] border-b-4 border-[#FFB507]"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ rotate: -8, scale: 1.05 }} transition={{ duration: 0.2 }}>
                <UserCog className="w-8 h-8 text-[#FFB507]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Transaction 01
                </p>
                <h1 className="text-2xl font-bold text-white">User Role Assignment</h1>
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
            <UserCog className="w-5 h-5 text-[#292929]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest mb-1">Goal</p>
            <p className="text-white text-sm leading-relaxed">
              Assign and manage system roles for all users to ensure each individual has the
              correct access level — Admin, Student, Alumni, or Employer.
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

        {/* User Role Table */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">Manage User Roles</h3>
        </motion.div>

        {users.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center text-gray-400">
            <UserCog className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No users found in the system yet.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-4"
          >
            {users.map((user) => {
              const RoleIcon = ROLE_ICONS[user.role];
              return (
                <motion.div
                  key={user.id}
                  variants={fadeUp}
                  whileHover={{ borderColor: '#FFB507' }}
                  className="bg-white rounded-xl border-2 border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4 transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-[#292929] flex items-center justify-center flex-shrink-0">
                    <RoleIcon className="w-6 h-6 text-[#FFB507]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#292929] truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Source: {user.source}</p>
                  </div>

                  {/* Role badge */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${ROLE_COLORS[user.role]} flex-shrink-0`}>
                    {user.role}
                  </span>

                  {/* Role selector */}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value as Role)}
                    className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm font-medium text-[#292929] focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                  >
                    <option value="Admin">Admin</option>
                    <option value="Student">Student</option>
                    <option value="Alumni">Alumni</option>
                    <option value="Employer">Employer</option>
                  </select>

                  {/* Save button */}
                  <button
                    onClick={() => handleSave(user.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0 ${
                      saved === user.id
                        ? 'bg-green-500 text-white'
                        : 'bg-[#292929] text-white hover:bg-[#FFB507] hover:text-[#292929]'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    {saved === user.id ? 'Saved!' : 'Save'}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
