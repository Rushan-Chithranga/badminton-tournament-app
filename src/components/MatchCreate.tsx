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
  const [score1, setScore1] = useState<string>(""); // Change to string type
  const [score2, setScore2] = useState<string>(""); // Change to string type

  const handleAddMatch = () => {
    // Parse the score inputs to numbers before comparing them
    const parsedScore1 = Number(score1);
    const parsedScore2 = Number(score2);

    const winner = parsedScore1 > parsedScore2 ? team1 : parsedScore2 > parsedScore1 ? team2 : null;

    const newMatch = {
      id: Date.now(),
      tournamentId,
      team1,
      team2,
      score1: parsedScore1,
      score2: parsedScore2,
      winner,
    };

    const updatedMatches = [
      ...JSON.parse(localStorage.getItem("matches") || "[]"),
      newMatch,
    ];
    localStorage.setItem("matches", JSON.stringify(updatedMatches));

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
            type="text" // Changed to text input
            className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="Score 1"
            value={score1}
            onChange={(e) => setScore1(e.target.value)} // Keep score as string
          />
          <input
            type="text" // Changed to text input
            className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
            placeholder="Score 2"
            value={score2}
            onChange={(e) => setScore2(e.target.value)} // Keep score as string
          />
        </div>

        <button
          onClick={handleAddMatch}
          className="w-full p-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600"
        >
          Add Match
        </button>
      </div>
    </div>
  );
};

export default AddMatch;
