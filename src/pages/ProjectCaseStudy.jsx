import { useParams, Link } from "react-router-dom";
import projects from "../../public/projectDetails.json";

export default function ProjectCaseStudy() {
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-semibold">Project not found</h1>
        <Link
          to="/projects"
          className="text-blue-500 hover:underline mt-4 inline-block"
        >
          ← Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Link to="/projects" className="text-blue-500 hover:underline">
        ← Back to projects
      </Link>

      <h1 className="text-3xl font-semibold mt-6">{project.title}</h1>
      <p className="text-gray-600 mt-3">{project.description}</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-gray-200">
        <img
          src={project.ProjectImage}
          alt={project.title}
          className="w-full h-90 object-cover"
        />
      </div>

      {/* Later: sections like Problem, Solution, Role, Stack, Results */}
    </main>
  );
}
