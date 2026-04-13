import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Eye, PencilLine, ShieldOff, CheckCircle, XCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

type Role = 'Admin' | 'Student' | 'Alumni' | 'Employer';

type PermissionMatrix = Record<string, Record<Role, boolean>>;

const ROLES: Role[] = ['Admin', 'Student', 'Alumni', 'Employer'];

const INITIAL_PERMISSIONS: PermissionMatrix = {
  'View Job Postings':       { Admin: true,  Student: true,  Alumni: true,  Employer: true  },
  'Apply for Jobs':          { Admin: true,  Student: true,  Alumni: false, Employer: false },
  'Post Job Listings':       { Admin: true,  Student: false, Alumni: false, Employer: true  },
  'Manage Appointments':     { Admin: true,  Student: true,  Alumni: false, Employer: false },
  'Submit Alumni Survey':    { Admin: true,  Student: true,  Alumni: true,  Employer: false },
  'View Analytics':          { Admin: true,  Student: false, Alumni: false, Employer: false },
  'Approve / Reject Items':  { Admin: true,  Student: false, Alumni: false, Employer: false },
  'Manage Career Events':    { Admin: true,  Student: false, Alumni: false, Employer: false },
  'Assign User Roles':       { Admin: true,  Student: false, Alumni: false, Employer: false },
  'View Activity Logs':      { Admin: true,  Student: false, Alumni: false, Employer: false },
};

const features = [
  {
    icon: Eye,
    title: 'Admin Management Portal',
    description:
      'A centralized view where admins can see every role's permissions across all modules and toggle access with a single click.',
  },
  {
    icon: PencilLine,
    title: 'Verification Workflow',
    description:
      'Permission changes are scoped and reviewed before being applied, ensuring no accidental over-provisioning of access rights.',
  },
  {
    icon: ShieldOff,
    title: 'Quality Assurance',
    description:
      'The permissions matrix ensures system integrity — only roles with explicit grants can perform sensitive operations.',
  },
];

export function PermissionUpdates() {
  const [permissions, setPermissions] = useState<PermissionMatrix>(INITIAL_PERMISSIONS);
  const [editMode, setEditMode] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggle = (permission: string, role: Role) => {
    if (!editMode) return;
    if (role === 'Admin') return; // Admin always has all permissions
    setPermissions((prev) => ({
      ...prev,
      [permission]: {
        ...prev[permission],
        [role]: !prev[permission][role],
      },
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
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
                <Lock className="w-8 h-8 text-[#FFB507]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Transaction 02
                </p>
                <h1 className="text-2xl font-bold text-white">Permission Updates</h1>
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
            <Lock className="w-5 h-5 text-[#292929]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest mb-1">Goal</p>
            <p className="text-white text-sm leading-relaxed">
              Define and update what each role is allowed to access or perform across the system,
              maintaining security boundaries and ensuring proper data segregation.
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

        {/* Permissions Matrix */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-4"
        >
          <h3 className="text-xl font-bold text-[#292929]">Permissions Matrix</h3>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-sm text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" /> Saved!
              </span>
            )}
            {editMode ? (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#FFB507] text-[#292929] text-sm font-bold rounded-lg hover:bg-[#e0a100] transition-colors"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-4 py-2 bg-[#292929] text-white text-sm font-bold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
              >
                Edit Permissions
              </button>
            )}
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#292929] text-white">
                  <th className="text-left px-6 py-4 font-bold">Permission</th>
                  {ROLES.map((role) => (
                    <th key={role} className="px-6 py-4 font-bold text-center">
                      <span className={role === 'Admin' ? 'text-[#FFB507]' : 'text-white'}>
                        {role}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(permissions).map(([perm, roles], i) => (
                  <tr
                    key={perm}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-[#FFFDF0] transition-colors`}
                  >
                    <td className="px-6 py-4 font-medium text-[#292929]">{perm}</td>
                    {ROLES.map((role) => (
                      <td key={role} className="px-6 py-4 text-center">
                        <button
                          onClick={() => toggle(perm, role)}
                          disabled={!editMode || role === 'Admin'}
                          className={`inline-flex items-center justify-center transition-transform ${
                            editMode && role !== 'Admin' ? 'hover:scale-110 cursor-pointer' : 'cursor-default'
                          }`}
                        >
                          {roles[role] ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300" />
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {editMode && (
            <p className="text-xs text-gray-400 px-6 py-3 border-t border-gray-100">
              Click a cell to toggle permission. Admin permissions are locked and cannot be changed.
            </p>
          )}
        </motion.div>

      </div>
    </motion.div>
  );
}
