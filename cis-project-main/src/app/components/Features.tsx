import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  UserCircle2,
  Briefcase,
  FileText,
  CalendarDays,
  Building2,
  CheckCheck,
  BarChart3,
  Users,
  ArrowRight,
} from "lucide-react";

export default function Features() {
  const studentFeatures = [
    {
      icon: UserCircle2,
      title: "Student Profile Management",
      desc: "Build a complete profile with skills, experience, and career goals for better matching.",
    },
    {
      icon: FileText,
      title: "Resume Management",
      desc: "Upload and track resume versions, then submit the best one for each opportunity.",
    },
    {
      icon: Briefcase,
      title: "Application Tracking",
      desc: "Monitor each application stage from submitted to interview and final decision.",
    },
    {
      icon: CalendarDays,
      title: "Appointment Booking",
      desc: "Book counseling sessions with career advisers and manage schedules with ease.",
    },
  ];

  const employerFeatures = [
    {
      icon: Building2,
      title: "Employer Verification",
      desc: "Verified company profiles improve trust and quality of opportunities for students.",
    },
    {
      icon: Briefcase,
      title: "Job Posting Management",
      desc: "Create, edit, and publish opportunities with requirements, location, and type details.",
    },
    {
      icon: Users,
      title: "Applicant Management",
      desc: "Review applicants efficiently and manage candidate pipelines in one place.",
    },
  ];

  const adminFeatures = [
    {
      icon: CheckCheck,
      title: "Approval Workflow",
      desc: "Review pending resumes, postings, and events with a centralized approval process.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Track placement trends, engagement, and performance metrics for better decisions.",
    },
    {
      icon: CalendarDays,
      title: "Event Management",
      desc: "Plan and publish career events, workshops, and guidance sessions for students.",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const cardContainer = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  const FeatureGrid = ({
    title,
    items,
  }: {
    title: string;
    items: { icon: any; title: string; desc: string }[];
  }) => (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-12"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-[#292929] mb-6">{title}</h2>
      <motion.div
        variants={cardContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <motion.div
            key={item.title}
            variants={cardItem}
            whileHover={{ y: -4 }}
            className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#FFB507] hover:shadow-md"
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#292929]">
              <item.icon className="h-6 w-6 text-[#FFB507]" />
            </div>
            <h3 className="text-lg font-bold text-[#292929] mb-2">{item.title}</h3>
            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#292929] border-t-4 border-[#FFB507]"
      >
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">Platform Features</h1>
          <p className="mt-4 max-w-3xl mx-auto text-[#FFB507] text-base md:text-lg leading-relaxed">
            A complete career-services ecosystem for students, employers, and administrators.
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <FeatureGrid title="For Students" items={studentFeatures} />
        <FeatureGrid title="For Employers" items={employerFeatures} />
        <FeatureGrid title="For Administrators" items={adminFeatures} />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="mt-6 rounded-2xl border border-[#FFB507]/40 bg-[#292929] p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white">Ready to explore the platform?</h3>
          <p className="mt-2 text-gray-200">
            Start with the portal that matches your role and access the tools you need.
          </p>
          <Link
            to="/get-started"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#FFB507] px-6 py-3 font-semibold text-[#292929] transition-colors hover:bg-[#e0a100]"
          >
            Go to Portal Selection
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
