/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import SelectedProjectsCards from "../components/SelectedProjectsCards";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
     
      const data = await fetch("/projectDetails.json");
      const projects = await data.json();
      setProjects(projects);
    };

    fetchProjects();
  }, []);

  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 600], [0, 120]);
  const blobY2 = useTransform(scrollY, [0, 600], [0, -90]);
  const headerY = useTransform(scrollY, [0, 500], [0, -30]);

  const container = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut", staggerChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 via-white to-slate-50">
      <section className="relative overflow-hidden">
        <motion.div
          style={{ y: blobY }}
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl"
        />
        <motion.div
          style={{ y: blobY2 }}
          className="pointer-events-none absolute -top-28 -right-24 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.10),transparent_55%)]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-24 pt-10 pb-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="
                inline-flex items-center gap-2 rounded-full
                bg-white/70 backdrop-blur border border-slate-200
                px-4 py-2 text-slate-600
                shadow-sm transition-all duration-300
                hover:bg-white hover:text-blue-500 hover:border-blue-200
                focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
                active:scale-[0.98]
              "
              aria-label="Back to home"
            >
              <span className="text-lg leading-none">←</span>
              <span className="text-sm font-medium">Back to home</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              <span>Case studies & builds</span>
            </div>
          </div>

          <motion.div
            style={{ y: headerY }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mt-10 max-w-3xl"
          >
            <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-600 px-4 py-2 text-sm font-medium border border-blue-200">
              Projects
              <span className="h-1 w-1 rounded-full bg-blue-400" />
              Selected work
            </p>

            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900">
              Here are a few projects I’ve had the opportunity of working on.
            </h1>

            <p className="mt-4 text-slate-600 leading-relaxed">
              A mix of case studies and production builds focused on
              performance, clean UI execution, and UX that feels effortless.
              Browse through, and open any project to see details.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#projects-grid"
                className="
                  inline-flex items-center gap-2 rounded-full
                  bg-blue-500 text-white px-5 py-3 text-sm font-semibold
                  shadow-md transition-all duration-300
                  hover:shadow-lg hover:-translate-y-1px
                  focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
                  active:scale-[0.99]
                "
              >
                Explore projects <span className="opacity-80">↓</span>
              </a>

              <span className="text-sm text-slate-500">
                {projects.length} projects
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-24 pb-16">
        <div className="mt-6 flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              All projects
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Tap a card to view its case study, screenshots, and details.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs text-slate-500">Tip:</span>
            <span className="text-xs text-slate-600 bg-white border border-slate-200 rounded-full px-3 py-1">
              Use your browser search (Ctrl/⌘ + F) to find a project
            </span>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <SelectedProjectsCards key={project.slug} project={project} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 rounded-3xl border border-slate-200 bg-white/70 backdrop-blur p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-lg font-semibold text-slate-900">
                Want to discuss a project?
              </h3>
              <p className="mt-2 text-slate-600">
                If you’re building something and want it fast, clean, and
                user-proof—let’s talk.
              </p>
            </div>
            <Link
              to="/#contact"
              className="
                inline-flex items-center justify-center gap-2 rounded-full
                bg-blue-500 text-white px-6 py-3 font-semibold
                shadow-md transition-all duration-300
                hover:shadow-lg hover:-translate-y-px
                focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200/70
                active:scale-[0.99]
              "
            >
              Contact me <span className="opacity-80">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
