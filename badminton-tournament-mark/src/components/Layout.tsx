import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <nav className="bg-gray-800 text-white p-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold flex items-center space-x-2">
              {/* Image next to the title */}
              <img
                src="https://cdn-icons-png.flaticon.com/512/9293/9293277.png"
                alt="Tournament Logo"
                className="w-10 h-10 rounded-full"
              />
              <Link to="/">Tournament</Link>
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex space-x-6">
              <Link to="/add-tournament" className="text-lg">
                Tournament
              </Link>
              <Link to="/add-team" className="text-lg">
                Team
              </Link>
              <Link to="/add-match" className="text-lg">
                Match
              </Link>
              <Link to="/leaderboard" className="text-lg">
                Leaderboard
              </Link>
              <Link to="/match-list" className="text-lg">
                Matches List
              </Link>
            </div>
          </div>

          <div
            className={`lg:hidden ${
              isMenuOpen ? "block" : "hidden"
            } bg-gray-800 text-white p-4 space-y-4`}
          >
            <Link to="/add-tournament" className="text-lg block">
              Tournament
            </Link>
            <Link to="/add-team" className="text-lg block">
              Team
            </Link>
            <Link to="/add-match" className="text-lg block">
              Match
            </Link>
            <Link to="/leaderboard" className="text-lg block">
              Leaderboard
            </Link>
            <Link to="/match-list" className="text-lg block">
              Matches List
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 bg-gray-900 p-8">{children}</main>
    </div>
  );
};

export default Layout;
