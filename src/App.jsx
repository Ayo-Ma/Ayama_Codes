import SectionHeading from "./components/SectionHeading";
import SelectedProjectsCards from "./components/SelectedProjectsCards";
import { useState, useEffect, useMemo, useRef } from "react";
import SkillSection from "./components/SkillSection";
import Form from "./components/Form";
import Brackets from "./assets/BracketsCurly.svg";
import Browsers from "./assets/Browsers.svg";
import Certificate from "./assets/Certificate.svg";
import User from "./assets/User.svg";
import VideoConference from "./assets/VideoConference.svg";
import Banner from "./assets/banner.png";
import ProfileImg from "./assets/my profile.png";
import resumePath from "./assets/Asimiyu Abdulmaleek Ayomide Dev CV.pdf";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [projects, setProjects] = useState([]);
  const [activeSection, setActiveSection] = useState("about");
  const [hoveredCircle, setHoveredCircle] = useState(null);
  const isNavClickRef = useRef(false);
  const navClickTimeoutRef = useRef(null);

  const navItems = useMemo(
    () => [
      { id: "about", label: "About", icon: User },
      { id: "works", label: "Works", icon: Browsers },
      { id: "experience", label: "Experience", icon: Certificate },
      { id: "skills", label: "Skills", icon: Brackets },
      { id: "contact", label: "Contact", icon: VideoConference },
    ],
    []
  );

  // ✅ Fix: fetch once
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch("/projectDetails.json");
      const data = await res.json();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  // ✅ Auto-active on scroll (IntersectionObserver)
  useEffect(() => {
    let observer;
    const visibilityMap = new Map();

    const createObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          // update visibility for only the entries that changed
          entries.forEach((entry) => {
            visibilityMap.set(entry.target.id, entry.intersectionRatio);
          });

          if (isNavClickRef.current) return;

          // pick the most visible section from ALL tracked sections
          let bestId = activeSection;
          let bestRatio = -1;

          navItems.forEach((item) => {
            const ratio = visibilityMap.get(item.id) ?? 0;
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = item.id;
            }
          });

          if (bestId) setActiveSection(bestId);
        },
        {
          root: null,
          threshold: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9],
          rootMargin: "-25% 0px -55% 0px",
        }
      );
    };
    const observeAll = () => {
      if (!observer) createObserver();

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    };

    observeAll();

    const raf = requestAnimationFrame(observeAll);

    window.addEventListener("load", observeAll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", observeAll);
      if (observer) observer.disconnect();
      if (navClickTimeoutRef.current) clearTimeout(navClickTimeoutRef.current);
    };
  }, [navItems]);

  // ---- Animations (simple + clean) ----
  const pageVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const gridVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <>
      {/* Page enter animation */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={pageVariants}
        className="mx-auto px-6 sm:px-6 md:px-8 lg:px-24 text-slate-800"
      >
        <header>
          <nav className="flex items-center justify-between py-10 relative">
            <motion.h1
              className="text-3xl font-bold text-slate-800"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              Logo
            </motion.h1>

            <ul
              className="
                flex items-center
                space-x-6 lg:space-x-4

                fixed
                bottom-6 left-1/2 -translate-x-1/2

                lg:top-6 lg:bottom-auto
                lg:left-1/2 lg:-translate-x-1/2

                z-50 rounded-full

                bg-black/30
                lg:bg-white/30
                backdrop-blur-lg
                border border-white/40
                shadow-md lg:shadow-none

                px-6 py-3
              "
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      id={`nav-${item.id}`}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        // lock observer updates during anchor jump
                        isNavClickRef.current = true;
                        setActiveSection(item.id);

                        if (navClickTimeoutRef.current)
                          clearTimeout(navClickTimeoutRef.current);
                        navClickTimeoutRef.current = setTimeout(() => {
                          isNavClickRef.current = false;
                        }, 800); // enough time for anchor scroll to settle
                      }}
                      className="
                        group relative
                        flex items-center gap-2
                        px-3 py-2 lg:px-4 lg:py-3
                        rounded-full shrink-0

                        text-slate-600
                        transition-colors duration-300
                        hover:text-blue-500

                        aria-[current=page]:text-white
                        focus:outline-none
                        focus-visible:ring-4
                        focus-visible:ring-blue-200/70
                      "
                    >
                      {/* ✅ Sliding pill background */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="
                              absolute inset-0 rounded-full bg-blue-500
                              shadow-[0_10px_25px_rgba(37,99,235,0.28)]
                            "
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 40,
                            }}
                          />
                        )}
                      </AnimatePresence>

                      {/* Content on top of pill */}
                      <span className="relative z-10 hidden lg:block font-medium">
                        {item.label}
                      </span>

                      {/* ✅ Mobile-only icon highlight */}
                      <img
                        src={item.icon}
                        alt=""
                        className="
                          relative z-10 w-6 h-6 shrink-0
                          lg:opacity-80 lg:group-hover:opacity-100
                          aria-[current=page]:brightness-0 aria-[current=page]:invert
                        "
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <motion.a 
            href={resumePath} download={true}
              className="
                resume
                text-blue-600 bg-blue-100
                px-6 py-2 rounded-full
                lg:inline-block
                border border-blue-100
                transition-all duration-300
                hover:bg-blue-200 hover:text-blue-700
                active:scale-[0.98]
                focus:outline-none
                focus-visible:ring-4 focus-visible:ring-blue-200/70
              "
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              Resume
              <span></span>
            </motion.a>
          </nav>

          <div className="profile-header relative">
            <motion.div
              className=" w-full h-60 bg-cover bg-center rounded-xl " 
              style={{backgroundImage: `url(${Banner})`}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <motion.div
                className="
                  profile-img
                  bg-cover bg-center border-8 border-white
                  rounded-full w-40 h-40 absolute
                  transform translate-x-[20%] translate-y-[100%]
                  shadow-lg
                "
                style={{ backgroundImage: `url(${ProfileImg})` }}
                whileHover={{ y: -2, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              />
            </motion.div>

            <motion.a
              href="/"
              aria-label="Available for work"
              className="
                profile-button
                flex items-center gap-3 absolute right-12 mt-6 lg:mr-12
                px-4 py-2 rounded-full text-white
                bg-blue-500
                shadow-lg
                transition-all duration-300
                hover:shadow-xl
                ring-4 ring-blue-200/60
                focus:outline-none
                focus-visible:ring-blue-300/70
              "
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <span className="relative inline-flex items-center w-3 h-3 mr-2">
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-white/60 animate-ping" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white shadow-sm" />
              </span>
              <span className="font-semibold">Available for work</span>
            </motion.a>
          </div>
        </header>

        <main className="mt-28">
          {/* hero */}
          <section className="hero-section overflow-hidden">
            <motion.div
              className="max-w-3xl"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ translateY: -2 }}
            >
              <motion.h2
                className="text-3xl/normal md:text-4xl lg:text-5xl/normal font-bold mb-4 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.55 }}
                whileTap={{ scale: 0.995 }}
                style={{ WebkitFontSmoothing: "antialiased" }}
              >
                <motion.span
                  layout
                  className="inline-block text-slate-700"
                  initial={{ x: -6, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20 }}
                >
                  Interfaces Fail When Users Don’t Trust Them.
                </motion.span>

                <motion.span
                  className="inline-block text-blue-500"
                  initial={{ scale: 0.98, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, duration: 0.45 }}
                  whileHover={{ x: 3 }}
                >
                  {" "}
                  I Build the Ones that Don’t.
                </motion.span>
              </motion.h2>

              <motion.p
                className="text-slate-600 mb-6"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
              >
                Frontend Developer & UI Designer with 4+ years of experience
                turning designs into high-performance, accessible websites using
                React, modern CSS, and real-world UX principles.
              </motion.p>

              <motion.div className="flex items-center gap-4">
                <motion.a
                  href="#contact"
                  className="
                    inline-flex items-center gap-3
                    bg-blue-500 text-white px-5 py-3 rounded-full ml-2
                    shadow-md hover:shadow-lg
                    transition-colors duration-300
                    focus:outline-none
                    focus-visible:ring-4 focus-visible:ring-blue-200/70
                  "
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  aria-label="Contact me"
                >
                  <span className="text-sm font-semibold">Let's talk</span>
                  <span className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
                </motion.a>

                <motion.a
                  href="#works"
                  className="
                    text-sm text-slate-600
                    hover:text-blue-500
                    transition-colors duration-300
                    focus:outline-none
                    focus-visible:ring-4 focus-visible:ring-blue-200/70
                    rounded-full px-2 py-1
                  "
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  See selected work
                </motion.a>
              </motion.div>
            </motion.div>
          </section>

          {/* About - reveal on scroll */}
          <motion.section
            className="about-me mt-24"
            id="about"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-blue-400">About Me</h3>
            <p className="mb-4 text-slate-600">
              I’m Abdulmaleek Asimiyu, a frontend developer and UI-focused web
              designer with over 4 years of hands-on experience building
              responsive, performance-optimized websites.
            </p>
            <p className="mb-4 text-slate-600">
              I specialize in turning Figma designs into clean, scalable React
              applications that load fast, look sharp, and feel effortless to
              use. I care deeply about performance, accessibility, and real user
              experience—not just making things “look good.”
            </p>
            <p className="mb-4 text-slate-600">
              I’ve worked with teams across marketing, content, and development
              to ship websites that are easy to maintain, optimized for speed,
              and aligned with business goals. In one role alone, I helped
              reduce page load time by 40% through smart optimization techniques
              like lazy loading, caching, and responsive design.
            </p>
            <p className="mb-4 text-slate-600">
              When I’m not coding, I’m refining UI systems, improving workflows,
              and learning how to build better products—not just more projects.
            </p>

            <motion.div
              className="w-full flex justify-center items-center relative h-[25rem]"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-80 h-80">
                {/* Left circle (primary/profile) */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden border-8 border-white shadow-lg -translate-x-5"
                  initial={{ x: -12, rotate: -6, scale: 0.98 }}
                  whileHover={{ x: -30, rotate: -2, scale: 1.05 }}
                  onHoverStart={() => setHoveredCircle("left")}
                  onHoverEnd={() => setHoveredCircle(null)}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  aria-hidden={false}
                  style={{
                    zIndex:
                      hoveredCircle === "left"
                        ? 50
                        : hoveredCircle === "right"
                        ? 30
                        : 20,
                  }}
                >
                  <img
                    src={ProfileImg}
                    alt="Profile - coding"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/25 to-transparent mix-blend-overlay" />
                </motion.div>

                {/* Right circle (hobby/activity) */}
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden border-8 border-blue-200 shadow-lg translate-x-5"
                  initial={{ x: 12, rotate: 6, scale: 0.98 }}
                  whileHover={{ x: 30, rotate: 2, scale: 1.05 }}
                  onHoverStart={() => setHoveredCircle("right")}
                  onHoverEnd={() => setHoveredCircle(null)}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  style={{
                    zIndex:
                      hoveredCircle === "right"
                        ? 50
                        : hoveredCircle === "left"
                        ? 20
                        : 30,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
                    alt="Hobby / interest"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent mix-blend-overlay" />
                </motion.div>

                {/* Decorative animated ring */}
                <motion.div
                  className="absolute -inset-1 rounded-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="ringGrad" x1="0" x2="1">
                        <stop
                          offset="0"
                          stopColor="#93c5fd"
                          stopOpacity="0.32"
                        />
                        <stop
                          offset="1"
                          stopColor="#60a5fa"
                          stopOpacity="0.22"
                        />
                      </linearGradient>
                    </defs>
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="url(#ringGrad)"
                      strokeWidth="1.6"
                      strokeDasharray="2 4"
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          </motion.section>

          {/* Works - reveal + subtle card micro interaction */}
          <motion.section
            className="selected-projects mt-24 mb-20"
            id="works"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            <SectionHeading
              heading="Selected Projects"
              paragraph="A few projects that showcase my approach to frontend development, UI execution, and performance-focused builds."
            />

            <motion.div
              className="row1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center justify-center"
              variants={gridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {projects.slice(0, 3).map((project, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <SelectedProjectsCards
                    projectTitle={project.title}
                    projectDescription={project.description}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-12 flex justify-center">
              <motion.a
                href="#"
                className="
                  group inline-flex items-center gap-2
                  rounded-full border border-blue-200
                  bg-white/40
                  px-6 py-3
                  text-blue-500 font-medium
                  transition-all duration-300
                  hover:bg-blue-500 hover:text-white
                  focus:outline-none
                  focus-visible:ring-4 focus-visible:ring-blue-200/70
                "
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                View all projects
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </motion.a>
            </div>
          </motion.section>

          {/* Experience - reveal */}
          <motion.section
            className="experience mt-24 mb-20"
            id="experience"
            variants={sectionVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.22 }}
          >
            <SectionHeading heading="Professional Experience" />
            <div className="experiences max-w-3xl mx-auto flex flex-col gap-12">
              <div className="expriences-role flex justify-between items-center gap-6">
                <p className="text-slate-500">2024 - Present</p>
                <span className="line w-[12.5rem] h-0.5 bg-slate-200 block"></span>
                <div className="role flex flex-col items-center gap-1">
                  <h4 className="text-md font-semibold mb-2 text-slate-700">
                    Website Developer
                  </h4>
                  <motion.a
                    href="#"
                    className="
                      inline-block
                      bg-blue-100 text-sm text-blue-500
                      rounded-full px-4 py-2
                      border border-blue-200
                      transition-all duration-300
                      hover:bg-blue-200 hover:text-blue-700
                      focus:outline-none
                      focus-visible:ring-4 focus-visible:ring-blue-200/70
                    "
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    @WilliamSynergyCo
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.section>
        </main>
      </motion.div>

      {/* Skills - reveal (no pure black) */}
      <motion.section
        className="skills-tools bg-zinc-900 py-12 mt-20 px-10 md:px-20"
        id="skills"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.18 }}
      >
        <SkillSection />
      </motion.section>

      {/* Contact - reveal */}
      <motion.section
        className="contact mt-24 mb-12 container mx-auto px-4 sm:px-4 md:px-8 lg:px-24"
        id="contact"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <SectionHeading
          heading="Let's Build Something That Works!"
          paragraph="I'm currently open to new opportunities and collaborations. Whether you have a project in mind or just want to say hello, feel free to reach out!"
        />
        <Form />
      </motion.section>
    </>
  );
}

export default App;
