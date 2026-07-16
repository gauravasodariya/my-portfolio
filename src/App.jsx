import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "skills", label: "Skills", path: "/skills" },
  { id: "projects", label: "Projects", path: "/projects" },
  { id: "experience", label: "Experience", path: "/experience" },
  { id: "contact", label: "Contact", path: "/contact" },
];

const PATH_TO_SECTION = {
  "/": "home",
  "/home": "home",
  "/about": "about",
  "/skills": "skills",
  "/projects": "projects",
  "/experience": "experience",
  "/contact": "contact",
};

const SECTION_TO_PATH = {
  home: "/",
  about: "/about",
  skills: "/skills",
  projects: "/projects",
  experience: "/experience",
  contact: "/contact",
};

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [typedName, setTypedName] = useState("");
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const currentYear = new Date().getFullYear();
  const fullName = "Gaurav Asodariya";
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const skillGroups = [
    { category: "Languages", items: ["C++", "JavaScript", "SQL"] },
    { category: "Frontend", items: ["React.js", "Tailwind CSS"] },
    { category: "Backend", items: ["Node.js", "Express.js"] },
    { category: "Database", items: ["MongoDB", "MySQL", "PostgreSQL"] },
    {
      category: "AI / LLM",
      items: ["OpenAI API", "Gemini API", "LLM Integration", "NLP Basics"],
    },
    { category: "Tools & Cloud", items: ["Git", "Postman", "AWS", "Vercel"] },
    { category: "CS Fundamentals", items: ["DSA", "OS", "DBMS", "CN"] },
  ];

  const projects = [
    {
      title: "AI-Powered Job Matching Platform",
      description:
        "Built an AI-powered job matching platform that reduced manual resume screening time by an estimated 60% using contextual skill-matching algorithms, with JWT-secured recruiter and job-seeker dashboards and automated resume parsing.",
      stack: ["React.js", "Node.js", "MongoDB", "OpenAI API", "AWS"],
      demoUrl: "https://ai-powered-job-platform-frontend.vercel.app/",
      codeUrl: "https://github.com/gauravasodariya/AI-Powered-Job-Platform",
    },
    {
      title: "Annasetu",
      description:
        "Developed a donation management platform connecting NGOs, donors, and volunteers, cutting manual coordination effort with role-based access control and automated request-scheduling APIs serving 3 distinct user roles.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT"],
      demoUrl: "https://annasetu-frontend.vercel.app/",
      codeUrl: "https://github.com/gauravasodariya/annasetu",
    },
    {
      title: "Account Manager",
      description:
        "Created a finance/account management app that streamlines day-to-day expense tracking, with real-time dashboards replacing manual spreadsheet-based tracking for daily money operations.",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      demoUrl: "",
      codeUrl: "https://github.com/gauravasodariya/Account-Manager",
    },
    {
      title: "MockHire AI",
      description:
        "Built a full-stack AI mock interview platform generating dynamic, resume-personalized interview questions via GPT-4o-mini, cutting manual interview prep effort with instant AI feedback, secure Google auth, Razorpay credit payments, and AWS S3 resume storage — deployed and live in production.",
      stack: [
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "OpenRouter API",
        "AWS S3",
        "Razorpay",
      ],
      demoUrl: "https://mock-hire-ai-sigma.vercel.app/",
      codeUrl: "https://github.com/gauravasodariya/MockHire-AI",
    },
    {
      title: "RankIntel",
      description:
        "Built an AI-powered SEO audit platform generating instant site health scores across keyword, on-page, and Core Web Vitals metrics, cutting manual SEO audit time with automated crawling, competitor comparison, and one-click PDF reporting.",
      stack: [
        "React 19",
        "TypeScript",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Gemini API",
      ],
      demoUrl: "",
      codeUrl: "https://github.com/gauravasodariya/RankIntel",
    },
  ];

  const experience = [
    {
      role: "Software Developer Intern",
      company: "Crinet Technologies",
      period: "January 2026 - June 2026",
      detail:
        "Developed responsive frontend components and integrated MERN REST APIs, improving UX and reducing page load time by 30%, while designing scalable MongoDB schemas and backend APIs that improved system performance by 25%.",
    },
  ];

  const education = [
    {
      role: "MSc IT",
      company: "Dhirubhai Ambani University",
      period: "2024 - 2026",
      detail: "CPI: 7.10 | Gandhinagar, Gujarat",
    },
    {
      role: "BCA",
      company: "Somlalit Institute of Computer Applications",
      period: "2021 - 2024",
      detail: "CPI: 8.29 | Ahmedabad, Gujarat",
    },
    {
      role: "12th (GHSEB)",
      company: "Shree Swaminarayan Gurukul",
      period: "2020 - 2021",
      detail: "Percentage: 82.85 | Amreli, Gujarat",
    },
    {
      role: "10th (GSEB)",
      company: "Shree Swaminarayan Gurukul",
      period: "2018 - 2019",
      detail: "Percentage: 78.66 | Amreli, Gujarat",
    },
  ];

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        threshold: [0.25, 0.5, 0.75],
        rootMargin: "-25% 0px -40% 0px",
      },
    );

    sectionElements.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sectionId = PATH_TO_SECTION[location.pathname] ?? "home";
    setActiveSection(sectionId);

    if (isInitialLoad) {
      // Force scroll to absolute top on initial page load/refresh
      window.scrollTo(0, 0);
      setIsInitialLoad(false);
      return;
    }
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.pathname, isInitialLoad]);

  useEffect(() => {
    // Ensure we start at the absolute top on initial page load
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (showResumeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showResumeModal]);
  useEffect(() => {
    let index = 0;
    setTypedName("");

    const timer = window.setInterval(() => {
      index += 1;
      setTypedName(fullName.slice(0, index));

      if (index >= fullName.length) {
        window.clearInterval(timer);
      }
    }, 115);

    return () => window.clearInterval(timer);
  }, [fullName]);

  return (
    <motion.div
      className="theme-bg relative min-h-screen overflow-hidden text-[#F9FAFB]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 animate-float-slow rounded-full bg-[#8B5CF6]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-52 h-96 w-96 animate-float-medium rounded-full bg-[#A855F7]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-[#6D28D9]/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(168,85,247,0.14),transparent_28%),radial-gradient(circle_at_78%_20%,rgba(139,92,246,0.18),transparent_32%)]" />

      {!showResumeModal && (
        <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#111827]/70 backdrop-blur-xl">
          <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
            <button
              type="button"
              onClick={() => {
                navigate("/");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group text-xl font-black tracking-wide text-left cursor-pointer hover:text-[#DDD6FE] transition-colors"
            >
              Gaurav
              <span className="text-[#A855F7] group-hover:text-[#C4B5FD] transition-colors">
                Asodariya
              </span>
            </button>

            <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      activeSection === item.id ? "nav-link-active" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
      )}

      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-20">
        <section
          id="home"
          className="grid items-center gap-10 py-8 md:grid-cols-2 md:py-12"
        >
          <div className="animate-slide-up [animation-delay:100ms]">
            <p className="mb-4 inline-flex items-center rounded-full border border-violet-400/40 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20 px-5 py-2 text-sm font-bold tracking-wide text-violet-200 shadow-lg backdrop-blur-md">
              Full-Stack AI Engineer
            </p>
            <h1 className="text-[1.65rem] font-black leading-tight sm:text-3xl md:text-3xl">
              Hi, I'm <span className="text-[#A855F7]">{typedName}</span>
              <span
                className="typing-cursor align-middle"
                aria-hidden="true"
              ></span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-slate-200/90 sm:text-lg">
              I build scalable web applications using the MERN stack and AI
              APIs. I focus on performance, clean architecture, and practical
              products that solve real user problems.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="btn-primary"
              >
                View Work
              </button>
              <button
                type="button"
                onClick={() => setShowResumeModal(true)}
                className="btn-secondary"
              >
                📄 View Resume
              </button>
            </div>
          </div>

          <motion.div
            className="animate-slide-up [animation-delay:220ms]"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.18, ease: "easeOut" }}
          >
            <div className="relative mx-auto w-fit">
              <motion.img
                src="/image-1.png"
                alt="Portrait"
                className="relative h-64 w-64 rounded-full border-4 border-white/20 object-cover sm:h-80 sm:w-80"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </section>

        <section
          id="about"
          className="animate-slide-up py-10 [animation-delay:260ms]"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-text">
            I am an M.Sc. IT graduate from Dhirubhai Ambani University with
            hands-on experience in Full Stack MERN development. During my
            internship, I built scalable web applications, designed REST APIs,
            and worked with MongoDB. I enjoy solving real-world problems through
            clean, maintainable code and AI-powered applications. I am currently
            seeking
            <br />
            full-time Software Developer opportunities.
          </p>
        </section>

        <section
          id="skills"
          className="animate-slide-up py-10 [animation-delay:320ms]"
        >
          <h2 className="section-title">Skills</h2>
          <div className="mt-6 space-y-6">
            {skillGroups.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#C4B5FD] mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="surface-card rounded-full px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          className="animate-slide-up py-10 [animation-delay:380ms]"
        >
          <h2 className="section-title">Projects</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                className="surface-card card-glow group rounded-3xl p-5 transition duration-300 hover:-translate-y-1"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
              >
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-slate-300/95">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[#A855F7]/40 bg-[#A855F7]/12 px-3 py-1 text-xs font-semibold text-[#DDD6FE]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action project-action-primary"
                    >
                      Live Demo
                    </a>
                  ) : (
                    <span className="project-action project-action-muted">
                      Demo Soon
                    </span>
                  )}
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="project-action project-action-secondary"
                  >
                    Code
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="animate-slide-up py-10 [animation-delay:440ms]"
        >
          <h2 className="section-title">Experience</h2>
          <div className="mt-6 space-y-5">
            {experience.map((item) => (
              <motion.article
                key={`${item.role}-${item.company}`}
                className="surface-card experience-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#DDD6FE]">
                      {item.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#A855F7]/40 bg-[#A855F7]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
              </motion.article>
            ))}
          </div>

          <h2 className="section-title mt-10">Education</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {education.map((item) => (
              <motion.article
                key={`${item.role}-${item.company}`}
                className="surface-card rounded-2xl p-6"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#DDD6FE]">
                      {item.company}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#A855F7]/40 bg-[#A855F7]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">
                    {item.period}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-300">{item.detail}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="animate-slide-up py-10 [animation-delay:500ms]"
        >
          <div className="grid gap-5 rounded-3xl border border-[#A855F7]/30 bg-gradient-to-br from-[#8B5CF6]/22 via-[#111827] to-[#1F2937] p-6 sm:grid-cols-2 sm:p-10">
            <div>
              <h2 className="text-3xl font-black text-white sm:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-4 max-w-xl text-sm text-slate-200 sm:text-base">
                Have a project in mind or want to collaborate? Let us talk.
              </p>
              <a
                href="mailto:gauravasodariya44@gmail.com"
                className="btn-primary mt-8 inline-flex"
              >
                Email Me
              </a>
            </div>

            <div className="space-y-4">
              <div className="surface-card rounded-xl px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-[#C4B5FD]">
                  Email
                </p>
                <a
                  className="mt-1 block text-sm text-white"
                  href="mailto:gauravasodariya44@gmail.com"
                >
                  gauravasodariya44@gmail.com
                </a>
              </div>
              <div className="surface-card rounded-xl px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-[#C4B5FD]">
                  Phone
                </p>
                <a
                  className="mt-1 block text-sm text-white"
                  href="tel:+918799300210"
                >
                  +91 8799300210
                </a>
              </div>
              <div className="surface-card rounded-xl px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-[#C4B5FD]">
                  Profiles
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <a
                    href="https://github.com/gauravasodariya"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#DDD6FE] hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#DDD6FE] hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://leetcode.com/u/JKM10/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#DDD6FE] hover:text-white"
                  >
                    LeetCode
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {showResumeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="surface-card w-full h-full max-w-7xl rounded-none overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
              <h3 className="text-xl font-bold text-white">Resume</h3>
              <button
                type="button"
                onClick={() => setShowResumeModal(false)}
                className="rounded-full p-2 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <svg
                  className="w-6 h-6 text-slate-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-0 flex flex-col h-[calc(100vh-60px)]">
              <div className="flex-1 w-full overflow-hidden bg-white/5">
                <iframe
                  src="/Gaurav_Asodariya_Resume.pdf"
                  className="w-full h-full"
                  title="Resume"
                />
              </div>
              <div className="py-3 flex justify-center gap-4 bg-[#111827]/95 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowResumeModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                <a
                  href="/Gaurav_Asodariya_Resume.pdf"
                  download
                  className="btn-primary"
                >
                  📥 Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <footer className="border-t border-white/10 py-6 text-center text-xs text-slate-400">
        {`© ${currentYear} Created By Gaurav Asodariya. All rights reserved.`}
      </footer>
    </motion.div>
  );
}

export default App;
