import projects from "../../public/projectDetails.json";
import SelectedProjectsCards from "../components/SelectedProjectsCards";
import { Link } from "react-router-dom";

export default function Projects() {
  return (
    <main className="container mx-auto px-4 py-12">
        <Link to="/" className="text-blue-500 hover:underline">Back to home</Link>
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-gray-600 mt-2">All case studies and builds.</p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <SelectedProjectsCards key={project.slug} project={project} />
        ))}
      </div>
    </main>
  );
}
