import { useState } from "react";

interface AddTeamProps {
    tournamentId: number;
    setTeams: React.Dispatch<React.SetStateAction<any[]>>; // Pass setTeams to update the list of teams
  }
  
  const AddTeam: React.FC<AddTeamProps> = ({ tournamentId, setTeams }) => {
    const [teamName, setTeamName] = useState('');
  
    const handleAddTeam = () => {
      const newTeam = {
        id: Date.now(),
        name: teamName,
        tournamentId,
      };
      
      setTeams((prevTeams) => {
        const updatedTeams = [...prevTeams, newTeam];
        localStorage.setItem('teams', JSON.stringify(updatedTeams)); // Save teams to localStorage
        return updatedTeams;
      });
  
      setTeamName(''); // Clear the input field after adding the team
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
            className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Add Team
          </button>
        </div>
      </div>
    );
  };
  
  export default AddTeam;
  