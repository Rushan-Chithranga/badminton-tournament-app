import { useState } from "react";

interface AddMatchProps {
  tournamentId: number;
  teams: any[]; 
  setMatches: React.Dispatch<React.SetStateAction<any[]>>; 
}

const AddMatch: React.FC<AddMatchProps> = ({
  tournamentId,
  teams,
  setMatches,
}) => {
  const [team1, setTeam1] = useState<string>("");
  const [team2, setTeam2] = useState<string>("");
  const [score1, setScore1] = useState<number>(0);
  const [score2, setScore2] = useState<number>(0);

  const handleAddMatch = () => {
    const winner = score1 > score2 ? team1 : score2 > score1 ? team2 : null;

    const newMatch = {
      id: Date.now(),
      tournamentId,
      team1,
      team2,
      score1,
      score2,
      winner,
    };

    // Save match to localStorage or update Zustand state
    const updatedMatches = [
      ...JSON.parse(localStorage.getItem("matches") || "[]"),
      newMatch,
    ];
    localStorage.setItem("matches", JSON.stringify(updatedMatches));

    // Update matches state
    setMatches(updatedMatches);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Match</h2>
      <div className="space-y-4">
        <select
          className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
          value={team1}
          onChange={(e) => setTeam1(e.target.value)}
        >
          <option value="">Select Team 1</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
          value={team2}
          onChange={(e) => setTeam2(e.target.value)}
        >
          <option value="">Select Team 2</option>
          {teams.map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>

        <div className="flex space-x-4">
          <input
            type="number"
            className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="Score 1"
            value={score1}
            onChange={(e) => setScore1(Number(e.target.value))}
          />
          <input
            type="number"
            className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="Score 2"
            value={score2}
            onChange={(e) => setScore2(Number(e.target.value))}
          />
        </div>

        <button
          onClick={handleAddMatch}
          className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          Add Match
        </button>
      </div>
    </div>
  );
};

export default AddMatch;
