import { create } from "zustand";

interface Team {
  id: number;
  name: string;
  tournamentId: number;
  wins: number; // Track the number of matches won
}

interface Match {
  id: number;
  tournamentId: number;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  winner: string | null;
}

interface Tournament {
  id: number;
  name: string;
  date: string;
}

interface TournamentStore {
  tournaments: Tournament[];
  teams: Team[];
  matches: Match[];
  setTournaments: (tournaments: Tournament[]) => void;
  addTournament: (tournament: Tournament) => void;
  deleteTournament: (id: number) => void;
  addTeam: (team: Team) => void;
  addMatch: (match: Match) => void;
  updateMatchScore: (matchId: number, score1: number, score2: number) => void;
  markMatchWinner: (matchId: number, winner: string) => void;
  deleteMatch: (matchId: number) => void;
  getLeaderboard: (tournamentId: number) => Team[];
}

const useTournamentStore = create<TournamentStore>((set) => {
  const storedTournaments = JSON.parse(
    localStorage.getItem("tournaments") || "[]"
  );
  const storedTeams = JSON.parse(localStorage.getItem("teams") || "[]");
  const storedMatches = JSON.parse(localStorage.getItem("matches") || "[]");

  return {
    tournaments: storedTournaments,
    teams: storedTeams,
    matches: storedMatches,

    setTournaments: (tournaments) => {
      localStorage.setItem("tournaments", JSON.stringify(tournaments));
      set({ tournaments });
    },

    addTournament: (tournament) => {
      set((state) => {
        const newTournaments = [...state.tournaments, tournament];
        localStorage.setItem("tournaments", JSON.stringify(newTournaments));
        return { tournaments: newTournaments };
      });
    },

    deleteTournament: (id) => {
      set((state) => {
        const filteredTournaments = state.tournaments.filter(
          (tournament) => tournament.id !== id
        );
        localStorage.setItem(
          "tournaments",
          JSON.stringify(filteredTournaments)
        );
        return { tournaments: filteredTournaments };
      });
    },

    addTeam: (team) => {
      set((state) => {
        const newTeams = [...state.teams, team];
        localStorage.setItem("teams", JSON.stringify(newTeams));
        return { teams: newTeams };
      });
    },

    addMatch: (match) => {
      set((state) => {
        const newMatches = [...state.matches, match];
        localStorage.setItem("matches", JSON.stringify(newMatches));
        return { matches: newMatches };
      });
    },

    updateMatchScore: (matchId, score1, score2) => {
      set((state) => {
        const updatedMatches = state.matches.map((match) =>
          match.id === matchId ? { ...match, score1, score2 } : match
        );
        localStorage.setItem("matches", JSON.stringify(updatedMatches));
        return { matches: updatedMatches };
      });
    },

    markMatchWinner: (matchId, winner) => {
      set((state) => {
        const updatedMatches = state.matches.map((match) =>
          match.id === matchId ? { ...match, winner } : match
        );

        const updatedTeams = state.teams.map((team) =>
          team.name === winner ? { ...team, wins: team.wins + 1 } : team
        );

        localStorage.setItem("matches", JSON.stringify(updatedMatches));
        localStorage.setItem("teams", JSON.stringify(updatedTeams));

        return { matches: updatedMatches, teams: updatedTeams };
      });
    },

    deleteMatch: (matchId) => {
      set((state) => {
        const filteredMatches = state.matches.filter(
          (match) => match.id !== matchId
        );
        localStorage.setItem("matches", JSON.stringify(filteredMatches));
        return { matches: filteredMatches };
      });
    },

    getLeaderboard: (tournamentId: number): Team[] => {
      // Filter teams for the current tournament
      const teamsInTournament = useTournamentStore
        .getState()
        .teams.filter((team) => team.tournamentId === tournamentId);

      // Sort teams by their wins in descending order
      return teamsInTournament.sort((a, b) => b.wins - a.wins); // Sort by wins
    },
  };
});

export default useTournamentStore;
