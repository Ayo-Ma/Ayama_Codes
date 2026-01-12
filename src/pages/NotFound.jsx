import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Decorative Elements - The "Grid" */}
      <div className="absolute inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="relative z-10 text-center flex flex-col items-center">
        {/* Complex SVG Illustration */}
        <div className="w-full max-w-md animate-float mb-8">
          <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
            {/* The "404" Monitor */}
            <rect x="100" y="50" width="300" height="200" rx="20" fill="#eff6ff" stroke="#3b82f6" strokeWidth="4" />
            <rect x="120" y="70" width="260" height="140" rx="10" fill="#dbeafe" />
            
            {/* Code Lines inside monitor */}
            <rect x="140" y="90" width="100" height="8" rx="4" fill="#60a5fa" />
            <rect x="140" y="110" width="180" height="8" rx="4" fill="#93c5fd" />
            <rect x="140" y="130" width="140" height="8" rx="4" fill="#bfdbfe" />
            
            {/* The Big 404 Text */}
            <text x="50%" y="185" textAnchor="middle" className="fill-blue-500 font-bold text-[60px]" style={{ fontFamily: 'monospace' }}>404</text>
            
            {/* Floating Brackets/Elements */}
            <g className="animate-pulse">
               <path d="M80 150 L50 120 L80 90" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M420 150 L450 120 L420 90" stroke="#2563eb" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Pedestal */}
            <path d="M200 250 L300 250 L320 300 L180 300 Z" fill="#3b82f6" />
            <rect x="150" y="300" width="200" height="10" rx="5" fill="#1d4ed8" />
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-6xl font-black text-blue-500 mb-4 tracking-tighter">
          LOST IN SPACE
        </h1>
        <p className="text-blue-400 text-xl max-w-md mb-8 font-medium">
          The page you are looking for has been moved, deleted, or never existed in this dimension.
        </p>

        {/* Interactive Button */}
        <Link
          to="/"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-500 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-200/50"
        >
          <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Mission Control
        </Link>
      </div>

      {/* Floating Blobs (GitHub-esque depth) */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      {/* Tailwind Custom Animation (Add this to your globals.css or a style tag) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}} />
    </div>
  );
};

export default NotFound;