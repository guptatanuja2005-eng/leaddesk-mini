import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold">LeadDesk Mini</h1>

        <div className="space-x-6">
          <a href="#features" className="hover:text-gray-200">
            Features
          </a>

          <a href="#contact" className="hover:text-gray-200">
            Contact
          </a>

          <Link
            to="/admin"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;