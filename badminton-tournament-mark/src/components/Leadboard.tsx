import { useEffect, useState } from "react";
import useTournamentStore from "../store";

interface LeaderboardProps {
  tournamentId: number;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ tournamentId }) => {
  const [teams, setTeams] = useState<any[]>([]);

  useEffect(() => {
    const leaderboard = useTournamentStore
      .getState()
      .getLeaderboard(tournamentId);
    setTeams(leaderboard);
  }, [tournamentId]);
  console.log(teams);
  return (
    <div className="max-w-4xl mx-auto my-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Leaderboard</h2>
      <ul className="space-y-4">
        {teams.length > 0 ? (
          teams.map((team) => (
            <li
              key={team.id}
              className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center"
            >
              <p className="text-lg">{team.name}</p>
              <p className="text-gray-500">{team.wins} Wins</p>{" "}
            </li>
          ))
        ) : (
          <div>No teams available for this tournament.</div>
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
