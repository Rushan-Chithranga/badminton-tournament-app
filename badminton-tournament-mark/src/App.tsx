import { useEffect, useState } from "react";
import AddTeam from "./components/TeamCreate";
import AddMatch from "./components/MatchCreate";
import AddTournament from "./components/TournamentCreate";
import MatchList from "./components/MatchList";
import Leaderboard from "./components/Leadboard";

const App: React.FC = () => {
  const [tournamentId, setTournamentId] = useState<number | null>(() => {
    const savedTournamentId = localStorage.getItem("tournamentId");
    return savedTournamentId ? JSON.parse(savedTournamentId) : null;
  });

  const [teams, setTeams] = useState<any[]>(() => {
    const savedTeams = localStorage.getItem("teams");
    return savedTeams ? JSON.parse(savedTeams) : [];
  });

  const [matches, setMatches] = useState<any[]>(() => {
    const savedMatches = localStorage.getItem("matches");
    return savedMatches ? JSON.parse(savedMatches) : [];
  });

  useEffect(() => {
    if (tournamentId !== null) {
      localStorage.setItem("tournamentId", JSON.stringify(tournamentId));
    }
  }, [tournamentId]);

  useEffect(() => {
    if (teams.length > 0) {
      localStorage.setItem("teams", JSON.stringify(teams));
    }
  }, [teams]);

  useEffect(() => {
    if (matches.length > 0) {
      localStorage.setItem("matches", JSON.stringify(matches));
    }
  }, [matches]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold text-center text-indigo-600 mb-8">
        Badminton Tournament Management
      </h1>
      <div className="space-y-8">
        <AddTournament setTournamentId={setTournamentId} />

        {tournamentId && (
          <>
            <AddTeam tournamentId={tournamentId} setTeams={setTeams} />
            {teams.length > 0 && (
              <>
                <AddMatch
                  tournamentId={tournamentId}
                  teams={teams}
                  setMatches={setMatches}
                />
                <MatchList tournamentId={tournamentId} />
                <Leaderboard tournamentId={tournamentId} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;
