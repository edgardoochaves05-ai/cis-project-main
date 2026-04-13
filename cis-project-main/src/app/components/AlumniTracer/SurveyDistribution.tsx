import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Bell, Link2, Zap, ChevronRight } from 'lucide-react';
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
    icon: Zap,
    title: 'Trigger-Based Notifications',
    description:
      'The system automatically generates in-app alerts for students who have reached their expected graduation year or who lack an alumni record. No manual follow-up needed.',
  },
  {
    icon: Link2,
    title: 'Simplified Access',
    description:
      'Graduates receive a direct link to the Alumni Tracer Survey to ensure high engagement and a frictionless submission experience.',
  },
  {
    icon: Bell,
    title: 'Integration Points',
    description:
      'Taps into the existing notification service to alert alumni smoothly, keeping the process seamless within the career services platform.',
  },
];

export function SurveyDistribution() {
  const { studentProfile, alumniRecords } = useCareerService();

  const hasSurvey = studentProfile
    ? alumniRecords.some((r) => r.studentId === studentProfile.id)
    : false;

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
                <Send className="w-8 h-8 text-[#292929]" />
              </motion.div>
              <div>
                <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest leading-none">
                  Transaction 01
                </p>
                <h1 className="text-2xl font-bold text-[#292929]">Alumni Survey Distribution</h1>
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
            <Send className="w-5 h-5 text-[#292929]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#FFB507] uppercase tracking-widest mb-1">Goal</p>
            <p className="text-white text-sm leading-relaxed">
              Automate the distribution of employment surveys to graduates to maximize response
              rates and reduce manual follow-ups.
            </p>
          </div>
        </motion.div>

        {/* Survey Alert */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.1 }}
          className={`rounded-xl border-2 p-6 mb-8 flex items-start gap-4 ${
            hasSurvey
              ? 'border-green-300 bg-green-50'
              : 'border-[#FFB507] bg-[#FFFDF0]'
          }`}
        >
          <Bell
            className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
              hasSurvey ? 'text-green-600' : 'text-[#FFB507]'
            }`}
          />
          <div className="flex-1">
            <p className="font-bold text-[#292929] mb-1">
              {hasSurvey ? 'Survey Already Submitted' : 'Survey Pending — Action Required'}
            </p>
            <p className="text-sm text-gray-600">
              {hasSurvey
                ? 'You have already submitted your Graduate Tracer Survey. You can update your record at any time via Employment Status Update.'
                : 'You have not yet completed your Graduate Tracer Survey. Please submit your employment information to help improve career services.'}
            </p>
          </div>
          {!hasSurvey && (
            <Link
              to="/student/alumni/survey"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 bg-[#292929] text-white text-sm font-semibold rounded-lg hover:bg-[#FFB507] hover:text-[#292929] transition-colors"
            >
              Take Survey <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.15 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">How It Works</h3>
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
