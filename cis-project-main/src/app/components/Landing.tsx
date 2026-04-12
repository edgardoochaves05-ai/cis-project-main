import { Link } from 'react-router';
import { Shield, ChevronRight, GraduationCap, Building2, ThumbsUp } from 'lucide-react';
import { motion } from 'framer-motion';
import tipLogo from '../../assets/168f322f0f107f9b8d44f05a40c22b8dd21cafd3.png';
import jobHiring from '../../assets/JobHiring.jpg';
import careerImage from '../../assets/CareerImage.jpg';
import accentureLogo from '../../assets/logos/AccentureLogo.png';
import sapLogo from '../../assets/logos/SAPLogo.png';
import ibmLogo from '../../assets/logos/IBMLogo.png';
import timLogo from '../../assets/logos/TimLogo.png';
import ansiLogo from '../../assets/logos/AnsiLogo.png';
import capgeminiLogo from '../../assets/logos/CapGeminiLogo.png';

export function Landing() {
  const companyLogos = [
    { name: 'Accenture', logo: accentureLogo },
    { name: 'SAP', logo: sapLogo },
    { name: 'IBM', logo: ibmLogo },
    { name: 'TIM', logo: timLogo },
    { name: 'ANSI', logo: ansiLogo },
    { name: 'Capgemini', logo: capgeminiLogo },
  ];

  return (
    <div className="min-h-screen bg-white text-[#292929]">
      {/* Top Utility Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-white border-b border-gray-200"
      >
        <div className="container mx-auto px-4 py-2 text-right text-xs md:text-sm text-[#292929]">
          <span className="font-semibold">TIP Career Services</span>
        </div>
      </motion.div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full bg-[#292929] border-t-4 border-[#FFB507]"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-8">
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                src={tipLogo}
                alt="TIP Logo"
                className="h-12 w-auto"
              />
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.4 },
                  },
                }}
                className="hidden md:flex gap-6"
              >
                {['Features', 'About', 'Contact'].map((item) => (
                  <motion.div
                    key={item}
                    variants={{
                      hidden: { opacity: 0, y: -10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <Link to={`/${item.toLowerCase()}`} className="text-white hover:text-[#FFB507] transition-colors">
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link to="/admin" className="text-white hover:text-[#FFB507] flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-1"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-5xl font-bold text-[#292929] mb-2"
            >
              Build confidence.
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-5xl font-bold text-[#FFB507] mb-6"
            >
              Get the job.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-xl"
            >
              Explore career opportunities and prepare for your future with comprehensive career services designed for
              TIP students and top employers.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-[#292929] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#1f1f1f] transition-colors"
              >
                Get Started
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="flex-1"
          >
            <img src={jobHiring} alt="Career Opportunities" className="w-full h-auto rounded-lg shadow-xl" />
          </motion.div>
        </div>

        {/* Trusted By - Company Logos with Names */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-20 text-center"
        >
          <p className="text-sm font-semibold text-[#FFB507] tracking-wider mb-4">TRUSTED BY</p>
          <p className="text-gray-600 mb-8">Featuring opportunities from leading companies</p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companyLogos.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-20 h-20 bg-white rounded-lg shadow-md p-3 flex items-center justify-center hover:shadow-xl transition-shadow">
                  <img src={company.logo} alt={company.name} className="max-w-full max-h-full object-contain" />
                </div>
                <span className="font-bold text-sm text-[#292929]">{company.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Services */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-32"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center text-[#292929] mb-4"
          >
            Comprehensive Career Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Everything you need to launch your career or find the perfect candidate
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Profile Management',
                body: 'Create comprehensive profiles with skills inventory, resume uploads, and version tracking',
              },
              {
                title: 'Job & Internship Tracking',
                body: 'Apply to opportunities and track your application status with real-time updates',
              },
              {
                title: 'Career Events & Counseling',
                body: 'Book appointments, attend job fairs, seminars, and workshops to advance your career',
              },
              {
                title: 'Employer Verification',
                body: 'Verified employer profiles with streamlined posting workflows and applicant management',
              },
              {
                title: 'Analytics Dashboard',
                body: 'Comprehensive placement analytics and graduate tracer studies for data-driven decisions',
              },
              {
                title: 'Alumni Network',
                body: 'Connect with alumni through our graduate tracer module and expand your professional network',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, borderColor: '#FFB507', boxShadow: '0 10px 25px -5px rgba(255, 181, 7, 0.2)' }}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-bold text-[#292929] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* About Section with Icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-32 bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-200"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#292929] mb-6">About TIP Career Services</h2>
              <p className="text-gray-600 mb-10">
                The Technological Institute of the Philippines Career Resource Service is dedicated to bridging the gap
                between students seeking opportunities and employers looking for talent.
              </p>

              <div className="grid grid-cols-3 gap-6 text-center">
                {/* Students Placed */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#292929] flex items-center justify-center mb-2">
                    <GraduationCap className="w-6 h-6 text-[#FFB507]" />
                  </div>
                  <div className="text-4xl font-bold text-[#FFB507] mb-1">1000+</div>
                  <div className="text-gray-600 text-sm">Students Placed</div>
                </motion.div>

                {/* Partner Companies */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#292929] flex items-center justify-center mb-2">
                    <Building2 className="w-6 h-6 text-[#FFB507]" />
                  </div>
                  <div className="text-4xl font-bold text-[#FFB507] mb-1">200+</div>
                  <div className="text-gray-600 text-sm">Partner Companies</div>
                </motion.div>

                {/* Satisfaction Rate */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#292929] flex items-center justify-center mb-2">
                    <ThumbsUp className="w-6 h-6 text-[#FFB507]" />
                  </div>
                  <div className="text-4xl font-bold text-[#FFB507] mb-1">95%</div>
                  <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                </motion.div>
              </div>
            </div>

            {/* Right side image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <img
                src={careerImage}
                alt="TIP Career Services"
                className="w-full h-[320px] md:h-[420px] object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-8 bg-white px-4 py-10"
      >
        <div className="mx-auto max-w-6xl text-center rounded-2xl bg-[#292929] px-6 py-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-3 text-3xl font-bold text-white md:text-4xl"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mb-8 text-base text-gray-200 md:text-xl"
          >
            Join thousands of TIP students and employers already using our platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/get-started"
              className="inline-flex items-center gap-2 rounded-lg bg-[#FFB507] px-6 py-3 text-base font-semibold text-[#292929] transition-colors hover:bg-[#e0a100]"
            >
              Get Started Today
              <ChevronRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="w-full bg-[#292929] px-4 py-12 text-gray-200 border-t border-[#3a3a3a]"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 flex items-center gap-3">
                <img src={tipLogo} alt="TIP Logo" className="h-7 w-7 rounded-full" />
                <h3 className="text-2xl font-bold text-white">TIP Career Services</h3>
              </div>
              <p className="text-base text-gray-300">Empowering students and connecting employers since 1962</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-3 text-xl font-bold text-[#FFB507]">Quick Links</h3>
              <ul className="space-y-2 text-base">
                <li>
                  <Link to="/features" className="text-white hover:text-[#FFB507] transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white hover:text-[#FFB507] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/get-started" className="text-white hover:text-[#FFB507] transition-colors">
                    Get Started
                  </Link>
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-3 text-xl font-bold text-[#FFB507]">Contact</h3>
              <address className="not-italic text-base text-white">
                <p className="mb-1">938 Aurora Blvd, Cubao</p>
                <p className="mb-1">Quezon City, Metro Manila</p>
                <a href="mailto:career@tip.edu.ph" className="text-white hover:text-[#FFB507] transition-colors">
                  career@tip.edu.ph
                </a>
              </address>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-8 border-t border-[#3a3a3a] pt-6 text-center text-sm text-gray-300"
          >
            © 2026 Technological Institute of the Philippines. All rights reserved.
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
}