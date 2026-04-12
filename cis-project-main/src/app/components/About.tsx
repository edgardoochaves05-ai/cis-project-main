import { motion } from "framer-motion";
import { Users, Handshake, Search, FileText } from "lucide-react";
import careerCenterImage from "../../assets/CareerCenter.png";

export default function About() {
  const items = [
    {
      icon: Users,
      title: "Career Advising",
      text: "Talk to your career advisers to get started on your desired career path.",
    },
    {
      icon: Handshake,
      title: "Internship and Externship",
      text: "Become acquainted with industry-desired values, competencies, and technical skills. Maximize access to relevant and meaningful internship and externship experiences with T.I.P.'s industry partners.",
    },
    {
      icon: Search,
      title: "Access top online resources to launch and advance your career",
      text: "Access the center's online resources and leading job portals and get your resume out there.",
    },
    {
      icon: FileText,
      title: "My Resume",
      text: "Build your career e-portfolio and be noticed by top employers.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full bg-[#292929] border-t-4 border-[#FFB507]"
      >
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold text-white text-center">About Career Services</h1>
          <p className="text-[#FFB507] mt-4 max-w-4xl mx-auto text-center text-base md:text-lg leading-relaxed">
            The Career Center is a virtual space to engage with students, alumni, industry and the
            community for internship, scholarship, career growth and development, and life design.
          </p>

          <motion.img
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={careerCenterImage}
            alt="Career Center"
            className="mt-6 mx-auto w-full max-w-3xl h-auto rounded-xl border border-[#FFB507]/40 shadow-lg"
          />
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
        }}
        className="container mx-auto px-4 py-12"
      >
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-6 md:p-10 space-y-8">
          {items.map((item) => (
            <motion.div
              key={item.title}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="flex gap-4 md:gap-6"
            >
              <div className="shrink-0 w-12 h-12 rounded-lg bg-[#292929] flex items-center justify-center">
                <item.icon className="w-6 h-6 text-[#FFB507]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#292929]">{item.title}</h3>
                <p className="text-gray-700 mt-1 leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
