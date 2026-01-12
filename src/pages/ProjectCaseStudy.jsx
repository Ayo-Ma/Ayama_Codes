import { useState, useEffect } from "react";
/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
import projects from "../../public/projectDetails.json";
import { motion } from "framer-motion";

export default function ProjectCaseStudy() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await fetch("/projectDetails.json");
      const projects = await data.json();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  const section = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (!project) {
    return (
      <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-16">
          <h1 className="text-2xl font-semibold text-slate-800">
            Project not found
          </h1>
          <Link
            to="/projects"
            className="
              mt-4 inline-flex items-center gap-2 rounded-full
              bg-white/70 backdrop-blur border border-slate-200
              px-4 py-2 text-slate-600
              transition-all duration-300
              hover:text-blue-500 hover:border-blue-200 hover:bg-white
              focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
              active:scale-[0.99]
            "
          >
            <span className="text-lg leading-none">←</span>
            Back to projects
          </Link>
        </div>
      </main>
    );
  }

  const tags = project.tags || ["React", "UI", "UX"];
  const role = project.role || "Frontend + UI";
  const stack = project.stack || ["React", "Tailwind", "Framer Motion"];
  const timeline = project.timeline || "—";
  const results = project.results || [
    "Improved clarity and usability",
    "Faster interactions and cleaner UI",
    "More consistent component system",
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-24 py-10">
        {/* Sticky back button (UX win) */}
        <div className="sticky top-4 z-40">
          <Link
            to="/projects"
            className="
              inline-flex items-center gap-2 rounded-full
              bg-white/75 backdrop-blur border border-slate-200
              px-4 py-2 text-slate-600 shadow-sm
              transition-all duration-300
              hover:text-blue-500 hover:border-blue-200 hover:bg-white
              focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
              active:scale-[0.99]
            "
          >
            <span className="text-lg leading-none">←</span>
            Back to projects
          </Link>
        </div>

        {/* Hero */}
        <motion.header
          initial="hidden"
          animate="show"
          variants={section}
          className="mt-8"
        >
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-600 px-4 py-2 text-sm font-semibold border border-blue-200">
            Case Study
            <span className="h-1 w-1 rounded-full bg-blue-400" />
            {timeline}
          </p>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
            {project.title}
          </h1>

          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            {project.description}
          </p>

          {/* Quick meta chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-white border border-slate-200 px-4 py-2 text-sm text-slate-600">
              <span className="text-slate-500">Role:</span>{" "}
              <span className="font-semibold text-slate-700">{role}</span>
            </span>

            {tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full bg-blue-50 border border-blue-100 px-4 py-2 text-sm text-blue-600"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Cover image */}
        <motion.section
          variants={section}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mt-10"
        >
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative">
              <img
                src={project.ProjectImage}
                alt={project.title}
                className="w-full max-h-[520px] object-cover"
                loading="lazy"
              />
              {/* Subtle overlay for polish */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/15 via-transparent to-transparent" />
            </div>

            <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <p className="text-sm text-slate-600">
                Preview —{" "}
                <span className="text-slate-500">hero screenshot</span>
              </p>

              <div className="flex flex-wrap gap-2">
                {stack.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-slate-600 bg-slate-100 border border-slate-200 rounded-full px-3 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Content sections */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: narrative */}
          <div className="lg:col-span-2 space-y-10">
            <motion.section
              variants={section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-7"
            >
              <h2 className="text-xl font-semibold text-slate-900">Problem</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {project.problem ||
                  "Users struggled to understand key actions and trust what they were seeing. The UI had inconsistent spacing, weak hierarchy, and unclear interaction states."}
              </p>
            </motion.section>

            <motion.section
              variants={section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-7"
            >
              <h2 className="text-xl font-semibold text-slate-900">Solution</h2>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {project.solution ||
                  "I redesigned the experience around clearer hierarchy, stronger states, and reduced cognitive load. Components were standardized to improve consistency and speed of iteration."}
              </p>

              <ul className="mt-5 space-y-3 text-slate-600">
                {(
                  project.solutionPoints || [
                    "Tighter spacing + consistent typography scale",
                    "Clear active/hover/focus states using blue-100 → blue-500",
                    "Improved accessibility: focus rings, contrast, tap targets",
                  ]
                ).map((x) => (
                  <li key={x} className="flex items-start gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-blue-400 shrink-0" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              variants={section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-7"
            >
              <h2 className="text-xl font-semibold text-slate-900">Results</h2>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.slice(0, 4).map((r) => (
                  <div
                    key={r}
                    className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5"
                  >
                    <p className="text-sm font-semibold text-blue-700">{r}</p>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right: sidebar */}
          <div className="space-y-6">
            <motion.aside
              variants={section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-7"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Project info
              </h3>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Role
                  </p>
                  <p className="text-slate-700 font-semibold">{role}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Stack
                  </p>
                  <p className="text-slate-600">
                    {Array.isArray(stack) ? stack.join(" • ") : stack}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Timeline
                  </p>
                  <p className="text-slate-600">{timeline}</p>
                </div>
              </div>
            </motion.aside>

            <motion.div
              variants={section}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-7"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Next step
              </h3>
              <p className="mt-2 text-slate-600">
                Want something like this built fast and clean?
              </p>

              <Link
                to="/#contact"
                className="
                  mt-5 inline-flex w-full items-center justify-center gap-2
                  rounded-full bg-blue-500 text-white px-5 py-3 font-semibold
                  shadow-md transition-all duration-300
                  hover:shadow-lg hover:translate-y-[-1px]
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
                  active:scale-[0.99]
                "
              >
                Let’s talk <span className="opacity-80">→</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
