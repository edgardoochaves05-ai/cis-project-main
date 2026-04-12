import { Link } from 'react-router';
import { GraduationCap, Building2, ArrowLeft, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion'; // Add this import
import tipLogo from '../../assets/168f322f0f107f9b8d44f05a40c22b8dd21cafd3.png';

export function PortalSelection() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with animations */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full border-b-2 border-[#FFB507] bg-white"
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ x: -5 }}
            >
              <Link to="/" className="flex items-center gap-2 text-[#292929] hover:text-[#FFB507] transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <motion.img
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                src={tipLogo}
                alt="TIP Logo"
                className="w-10 h-10"
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl font-bold text-[#292929]"
              >
                TIP Career Services
              </motion.span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Portal Selection */}
      <div className="container mx-auto px-4 py-16">
        {/* Title Section with animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl font-bold text-[#292929] mb-4"
          >
            Choose Your Portal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Select the portal that best fits your needs
          </motion.p>
        </motion.div>

        {/* Portal Cards Grid with staggered animation */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {/* Student Portal Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -50 },
              show: { opacity: 1, x: 0 }
            }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <Link to="/student" className="group block h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border-2 border-gray-200 hover:border-[#FFB507]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                  className="flex items-center justify-center w-20 h-20 bg-[#FFF4CC] rounded-full mb-6 mx-auto group-hover:bg-[#FFE9A3] transition-colors"
                >
                  <GraduationCap className="w-10 h-10 text-[#292929]" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-3xl font-bold text-[#292929] mb-4 text-center"
                >
                  Student Portal
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-gray-600 mb-6 text-center"
                >
                  Build your profile, manage resumes, track applications, and book career appointments
                </motion.p>

                <motion.ul
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="space-y-3 mb-8"
                >
                  {[
                    'Create and manage your professional profile',
                    'Upload and track resume versions',
                    'Apply to internships and job opportunities',
                    'Schedule career counseling appointments',
                    'Attend career events and workshops',
                    'Connect with alumni network',
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 5, color: '#FFB507' }}
                      className="flex items-start group/item"
                    >
                      <motion.svg
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 text-[#FFB507] mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <span className="text-gray-700 group-hover/item:text-[#292929] transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#292929] text-white rounded-lg group-hover:bg-[#1F1F1F] transition-colors font-semibold cursor-pointer"
                  >
                    Access Student Portal
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>

          {/* Employer Portal Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 50 },
              show: { opacity: 1, x: 0 }
            }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <Link to="/employer" className="group block h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border-2 border-gray-200 hover:border-[#FFB507]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                  className="flex items-center justify-center w-20 h-20 bg-[#FFF4CC] rounded-full mb-6 mx-auto group-hover:bg-[#FFE9A3] transition-colors"
                >
                  <Building2 className="w-10 h-10 text-[#292929]" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-3xl font-bold text-[#292929] mb-4 text-center"
                >
                  Employer Portal
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-gray-600 mb-6 text-center"
                >
                  Post opportunities, manage applications, and connect with talented students
                </motion.p>

                <motion.ul
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="space-y-3 mb-8"
                >
                  {[
                    'Register and verify your company profile',
                    'Post and manage job opportunities',
                    'Review and shortlist qualified applicants',
                    'Track posting status and engagement',
                    'Access to verified student profiles',
                    'Participate in career fairs and events',
                  ].map((item, index) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 5, color: '#FFB507' }}
                      className="flex items-start group/item"
                    >
                      <motion.svg
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 text-[#FFB507] mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <span className="text-gray-700 group-hover/item:text-[#292929] transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFB507] text-[#292929] rounded-lg group-hover:bg-[#E0A100] transition-colors font-semibold cursor-pointer"
                  >
                    Access Employer Portal
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
          {/* Alumni Portal Card */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            <Link to="/student/alumni" className="group block h-full">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all h-full border-2 border-gray-200 hover:border-[#FFB507]"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                  className="flex items-center justify-center w-20 h-20 bg-[#FFF4CC] rounded-full mb-6 mx-auto group-hover:bg-[#FFE9A3] transition-colors"
                >
                  <ClipboardList className="w-10 h-10 text-[#292929]" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-3xl font-bold text-[#292929] mb-4 text-center"
                >
                  Alumni Portal
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-gray-600 mb-6 text-center"
                >
                  Submit and update your employment status to support institutional analytics and career improvement
                </motion.p>

                <motion.ul
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.8 }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                  className="space-y-3 mb-8"
                >
                  {[
                    'Receive alumni survey distribution alerts',
                    'Report current employment status',
                    'Provide company, position, and salary details',
                    'Update your record when your situation changes',
                    'Track months to employment after graduation',
                    'Contribute to graduate tracer data validation',
                  ].map((item) => (
                    <motion.li
                      key={item}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        show: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 5, color: '#FFB507' }}
                      className="flex items-start group/item"
                    >
                      <motion.svg
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className="w-6 h-6 text-[#FFB507] mr-3 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </motion.svg>
                      <span className="text-gray-700 group-hover/item:text-[#292929] transition-colors">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#292929] text-white rounded-lg group-hover:bg-[#1F1F1F] transition-colors font-semibold cursor-pointer"
                  >
                    Access Alumni Portal
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </motion.svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>

        {/* Additional Info with animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-xl p-8 max-w-3xl mx-auto shadow-md border border-gray-200"
          >
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
              className="text-2xl font-bold text-[#292929] mb-4"
            >
              Need Help Choosing?
            </motion.h3>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="text-gray-600 mb-6"
            >
              If you're a TIP student or alumni looking for career opportunities, choose the Student Portal. If you're
              an employer looking to hire talented students, choose the Employer Portal.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 1.9 }
                }
              }}
              initial="hidden"
              animate="show"
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.a
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#292929', color: 'white' }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                className="px-6 py-2 border-2 border-[#292929] text-[#292929] rounded-lg hover:bg-[#292929] hover:text-white transition-colors font-medium cursor-pointer"
              >
                Contact Support
              </motion.a>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin"
                  className="inline-block px-6 py-2 border-2 border-[#FFB507] text-[#292929] rounded-lg hover:bg-[#FFB507] transition-colors font-medium"
                >
                  Admin Access
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
