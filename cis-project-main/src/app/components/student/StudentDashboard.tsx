import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  User,
  FileText,
  Briefcase,
  Calendar,
  ChevronRight,
  GraduationCap,
  CalendarDays,
  Users,
} from 'lucide-react';
import { useCareerService } from '../../context/CareerServiceContext';

export function StudentDashboard() {
  const { studentProfile, resumes, applications, appointments } = useCareerService();

  const stats = [
    {
      label: 'Profile Completion',
      value: studentProfile ? '100%' : '0%',
      icon: User,
    },
    {
      label: 'Resumes',
      value: resumes.length,
      icon: FileText,
    },
    {
      label: 'Active Applications',
      value: applications.filter((a) => ['submitted', 'under_review', 'interview'].includes(a.status)).length,
      icon: Briefcase,
    },
    {
      label: 'Upcoming Appointments',
      value: appointments.filter((a) => a.status === 'scheduled').length,
      icon: Calendar,
    },
  ];

  const quickLinks = [
    {
      title: 'My Profile & Skills',
      description: 'Update your profile and skills inventory',
      icon: User,
      link: '/student/profile',
    },
    {
      title: 'Resume Management',
      description: 'Upload and track your resume versions',
      icon: FileText,
      link: '/student/resume',
    },
    {
      title: 'Application Tracking',
      description: 'Track your job and internship applications',
      icon: Briefcase,
      link: '/student/applications',
    },
    {
      title: 'Book Appointment',
      description: 'Schedule a career counseling session',
      icon: Calendar,
      link: '/student/appointments',
    },
    {
      title: 'Career Events',
      description: 'Browse and register for upcoming events',
      icon: CalendarDays,
      link: '/student/events',
    },
    {
      title: 'Alumni Survey',
      description: 'Submit your employment information',
      icon: Users,
      link: '/student/alumni',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
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
              <motion.div whileHover={{ rotate: -8, scale: 1.05 }} transition={{ duration: 0.2 }}>
                <GraduationCap className="w-8 h-8 text-[#292929]" />
              </motion.div>
              <h1 className="text-2xl font-bold text-[#292929]">Student Portal</h1>
            </div>
            <motion.div whileHover={{ x: -2 }}>
              <Link to="/" className="text-[#292929] hover:text-[#FFB507] transition-colors">
                Back to Home
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
          <p className="text-gray-600">Manage your career journey from your dashboard</p>
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

        {/* Quick Links */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
          <h3 className="text-xl font-bold text-[#292929] mb-4">Quick Actions</h3>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {quickLinks.map((link) => (
              <motion.div key={link.title} variants={fadeUp} whileHover={{ y: -4 }}>
                <Link to={link.link} className="group block">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-[#FFB507] transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <motion.div
                          whileHover={{ scale: 1.08 }}
                          className="w-12 h-12 rounded-lg bg-[#292929] flex items-center justify-center flex-shrink-0"
                        >
                          <link.icon className="w-6 h-6 text-[#FFB507]" />
                        </motion.div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#292929] mb-1">{link.title}</h4>
                          <p className="text-sm text-gray-600">{link.description}</p>
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

        {/* Recent Activity */}
        {applications.length > 0 && (
          <motion.div
            className="mt-8"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-xl font-bold text-[#292929] mb-4">Recent Applications</h3>
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {applications.slice(0, 5).map((app) => (
                <motion.div
                  key={app.id}
                  variants={fadeUp}
                  whileHover={{ backgroundColor: '#fafafa', x: 3 }}
                  className="border-b last:border-b-0 p-4 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-[#292929]">{app.jobTitle}</h4>
                      <p className="text-sm text-gray-600">{app.companyName}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        app.status === 'accepted'
                          ? 'bg-[#FFF4CC] text-[#292929]'
                          : app.status === 'rejected'
                          ? 'bg-gray-200 text-[#292929]'
                          : app.status === 'interview'
                          ? 'bg-[#292929] text-[#FFB507]'
                          : 'bg-[#FFB507] text-[#292929]'
                      }`}
                    >
                      {app.status.replace('_', ' ')}
                    </span>
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
