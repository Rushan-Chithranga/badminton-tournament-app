import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout"; // Import the Layout component
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
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <h2 className="text-3xl text-center">Welcome to the Tournament</h2>
                <p className="text-center">
                  Select an option from the menu to manage your tournament.
                </p>
              </div>
            }
          />
          <Route path="/add-tournament" element={<AddTournament setTournamentId={setTournamentId} />} />
          <Route path="/add-team" element={<AddTeam tournamentId={tournamentId!} setTeams={setTeams} />} />
          <Route path="/add-match" element={<AddMatch tournamentId={tournamentId!} teams={teams} setMatches={setMatches} />} />
          <Route path="/leaderboard" element={<Leaderboard tournamentId={tournamentId!} />} />
          <Route path="/match-list" element={<MatchList tournamentId={tournamentId!} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
