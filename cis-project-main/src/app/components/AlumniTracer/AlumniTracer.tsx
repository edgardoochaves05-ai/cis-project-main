import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  RefreshCw,
  TrendingUp,
  LayoutGrid,
  ClipboardCheck,
  PencilLine,
} from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';
import type { AlumniRecord } from '../../context/CareerServiceContext';

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
    icon: LayoutGrid,
    title: 'Dynamic Survey Dashboard',
    description:
      'A dedicated interface where alumni can state their current status — Employed, Unemployed, Self-Employed, or Pursuing Further Education.',
  },
  {
    icon: ClipboardCheck,
    title: 'Comprehensive Fields',
    description:
      'Tracks current company, position/title, estimated salary range, and the number of months it took to secure employment after graduation.',
  },
  {
    icon: PencilLine,
    title: 'Record Edits',
    description:
      'Alumni can return to update their records when they get promoted or change companies, providing real-time employment data back to the institution.',
  },
];

export function AlumniTracer() {
  const { studentProfile, addAlumniRecord } = useCareerService();
  const [formData, setFormData] = useState({
    employmentStatus: 'employed' as AlumniRecord['employmentStatus'],
    currentCompany: '',
    currentPosition: '',
    salary: '',
    employedWithinMonths: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentProfile) {
      const record: AlumniRecord = {
        id: crypto.randomUUID(),
        studentId: studentProfile.id,
        name: studentProfile.name,
        graduationYear: studentProfile.graduationYear,
        major: studentProfile.major,
        employmentStatus: formData.employmentStatus,
        currentCompany: formData.currentCompany || undefined,
        currentPosition: formData.currentPosition || undefined,
        salary: formData.salary || undefined,
        employedWithinMonths: formData.employedWithinMonths
          ? parseInt(formData.employedWithinMonths)
          : undefined,
        surveyDate: new Date().toISOString(),
        verified: false,
      };
      addAlumniRecord(record);
      setSubmitted(true);
    }
  };

  /* ── No profile state ── */
  if (!studentProfile) {
    return (
      <motion.div
        className="min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="bg-white border-b-2 border-[#FFB507]"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-[#292929]" />
                <div>
                  <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                    Transaction 02
                  </p>
                  <h1 className="text-2xl font-bold text-[#292929]">Employment Status Update</h1>
                </div>
              </div>
              <Link
                to="/student/alumni"
                className="flex items-center gap-2 text-[#292929] hover:text-[#FFB507] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Alumni Portal
              </Link>
            </div>
          </div>
        </motion.div>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-[#FFFDF0] border-2 border-[#FFB507] rounded-xl p-6">
            <p className="text-[#292929] font-medium">
              Please{' '}
              <Link to="/student/profile" className="underline font-bold">
                complete your profile
              </Link>{' '}
              first to submit your employment information.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  /* ── Submitted success state ── */
  if (submitted) {
    return (
      <motion.div
        className="min-h-screen bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
      >
        <motion.div
          className="bg-white border-b-2 border-[#FFB507]"
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-8 h-8 text-[#292929]" />
                <div>
                  <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                    Transaction 02
                  </p>
                  <h1 className="text-2xl font-bold text-[#292929]">Employment Status Update</h1>
                </div>
              </div>
              <Link
                to="/student/alumni"
                className="flex items-center gap-2 text-[#292929] hover:text-[#FFB507] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Alumni Portal
              </Link>
            </div>
          </div>
        </motion.div>
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#292929] mb-6"
          >
            <TrendingUp className="w-10 h-10 text-[#FFB507]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-[#292929] mb-3"
          >
            Submitted Successfully!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8 max-w-md mx-auto"
          >
            Your employment information has been recorded. This data helps improve career services
            and support future students.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/student/alumni"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#292929] text-white font-semibold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
            >
              Return to Alumni Portal
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  /* ── Main form view ── */
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
                <RefreshCw className="w-8 h-8 text-[#292929]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Transaction 02
                </p>
                <h1 className="text-2xl font-bold text-[#292929]">Employment Status Update</h1>
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
            <RefreshCw className="w-5 h-5 text-[#292929]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest mb-1">Goal</p>
            <p className="text-white text-sm leading-relaxed">
              Allow graduates to easily report and update their employment progress over time,
              providing real-time data back to the institution.
            </p>
          </div>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.05 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">What You Can Do</h3>
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

        {/* Form */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">Submit Your Information</h3>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.25 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border-2 border-gray-200 p-8"
        >
          {/* Student Info */}
          <div className="mb-6">
            <h4 className="text-base font-bold text-[#292929] mb-3">Student Information</h4>
            <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Name</p>
                <p className="font-semibold text-[#292929]">{studentProfile.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Major</p>
                <p className="font-semibold text-[#292929]">{studentProfile.major}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">Graduation Year</p>
                <p className="font-semibold text-[#292929]">{studentProfile.graduationYear}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">GPA</p>
                <p className="font-semibold text-[#292929]">{studentProfile.gpa || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Employment Info */}
          <div className="mb-6">
            <h4 className="text-base font-bold text-[#292929] mb-4">Employment Information</h4>

            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employment Status <span className="text-[#FFB507]">*</span>
              </label>
              <select
                required
                value={formData.employmentStatus}
                onChange={(e) =>
                  setFormData({ ...formData, employmentStatus: e.target.value as AlumniRecord['employmentStatus'] })
                }
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
              >
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="self-employed">Self-Employed</option>
                <option value="pursuing_education">Pursuing Further Education</option>
              </select>
            </div>

            {formData.employmentStatus === 'employed' && (
              <>
                <div className="grid md:grid-cols-2 gap-6 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Company <span className="text-[#FFB507]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentCompany}
                      onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position / Title <span className="text-[#FFB507]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentPosition}
                      onChange={(e) =>
                        setFormData({ ...formData, currentPosition: e.target.value })
                      }
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary Range <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <select
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                    >
                      <option value="">Prefer not to say</option>
                      <option value="Below ₱20,000">Below ₱20,000</option>
                      <option value="₱20,000 - ₱30,000">₱20,000 – ₱30,000</option>
                      <option value="₱30,000 - ₱50,000">₱30,000 – ₱50,000</option>
                      <option value="₱50,000 - ₱75,000">₱50,000 – ₱75,000</option>
                      <option value="Above ₱75,000">Above ₱75,000</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Months After Graduation to Employment
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.employedWithinMonths}
                      onChange={(e) =>
                        setFormData({ ...formData, employedWithinMonths: e.target.value })
                      }
                      placeholder="e.g. 3"
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFB507] focus:border-[#FFB507] outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-[#292929] text-white font-semibold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
          >
            Submit Employment Information
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}
