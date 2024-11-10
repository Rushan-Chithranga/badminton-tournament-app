import { Link } from "react-router-dom";
import image from '../assets/homeimage.png';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <h2 className="text-4xl font-bold text-center text-indigo-600 mb-4 animate__animated animate__fadeIn">
        Welcome to the Badminton Tournament
      </h2>
      <p className="text-lg text-center mb-6 animate__animated animate__fadeIn">
        Select an option from the menu to manage your tournament.
      </p>
      <div className=" p-6  animate__animated animate__fadeIn">
        <div className="flex justify-center mb-6 animate-pulse">
          <img
            src={image}
            alt="Badminton Tournament"
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <h3 className="text-xl font-semibold text-center mb-4">
          What can you do?
        </h3>

        <div className="mt-6 text-center">
          <Link
            to="/add-tournament"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
