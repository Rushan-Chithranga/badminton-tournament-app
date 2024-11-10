import { useEffect, useState } from "react";
import useTournamentStore from "../store";

interface Match {
  id: number;
  tournamentId: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  winner: string | null;
}

interface MatchListProps {
  tournamentId: number;
}

const MatchList: React.FC<MatchListProps> = ({ tournamentId }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [editMatchId, setEditMatchId] = useState<number | null>(null);
  const [editedScore1, setEditedScore1] = useState<number>(0);
  const [editedScore2, setEditedScore2] = useState<number>(0);

  useEffect(() => {
    const matches = useTournamentStore
      .getState()
      .matches.filter((match) => match.tournamentId === tournamentId);
    setMatches(matches);
  }, [tournamentId]);

  const handleUpdateScore = (
    matchId: number,
    score1: number,
    score2: number
  ) => {
    const winner = score1 > score2 ? "team1" : score2 > score1 ? "team2" : null;
    useTournamentStore.getState().updateMatchScore(matchId, score1, score2);
    useTournamentStore.getState().markMatchWinner(matchId, winner || ""); // Update the winner

    setEditMatchId(null); // Close editing mode
  };

  return (
    <div className="space-y-4">
      {matches.length === 0 ? (
        <p>No matches have been played yet.</p>
      ) : (
        matches.map((match) => (
          <div key={match.id} className="p-4 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">
                {match.team1} vs {match.team2}
              </p>
              <p className="text-sm text-gray-500">
                {match.winner ? `Winner: ${match.winner}` : "No winner yet"}
              </p>
            </div>
            <div className="flex justify-between mt-2">
              {editMatchId === match.id ? (
                <>
                  <input
                    type="number"
                    className="w-16 p-2 border rounded"
                    value={editedScore1}
                    onChange={(e) => setEditedScore1(Number(e.target.value))}
                  />
                  <span> - </span>
                  <input
                    type="number"
                    className="w-16 p-2 border rounded"
                    value={editedScore2}
                    onChange={(e) => setEditedScore2(Number(e.target.value))}
                  />
                  <button
                    className="ml-4 bg-blue-500 text-white p-2 rounded"
                    onClick={() =>
                      handleUpdateScore(match.id, editedScore1, editedScore2)
                    }
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span>{match.score1}</span> - <span>{match.score2}</span>
                  <button
                    className="ml-4 text-blue-600"
                    onClick={() => {
                      setEditMatchId(match.id); // Set match to be edited
                      setEditedScore1(match.score1);
                      setEditedScore2(match.score2);
                    }}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchList;
