import { useState } from "react";
import useTournamentStore from "../store";

interface AddTeamProps {
  tournamentId: number;
  setTeams: React.Dispatch<React.SetStateAction<any[]>>;
}

const AddTeam: React.FC<AddTeamProps> = ({ tournamentId, setTeams }) => {
  const [teamName, setTeamName] = useState("");
  const addTeam = useTournamentStore((state) => state.addTeam);

  const handleAddTeam = () => {
    const newTeam = {
      id: Date.now(),
      name: teamName,
      tournamentId,
      wins: 0,
    };
    addTeam(newTeam);
    setTeams((prevTeams) => {
      const updatedTeams = [...prevTeams, newTeam];
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      return updatedTeams;
    });

    setTeamName("");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Team</h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <button
          onClick={handleAddTeam}
          className="w-full p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
        >
          Add Team
        </button>
      </div>
    </div>
  );
};

export default AddTeam;
