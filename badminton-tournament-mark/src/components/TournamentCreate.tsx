import { useState } from 'react';
import useTournamentStore from '../store';

interface AddTournamentProps {
  setTournamentId: (id: number) => void; 
}

const AddTournament: React.FC<AddTournamentProps> = ({ setTournamentId }) => {
  const { addTournament } = useTournamentStore();
  
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    const newTournament = {
      id: Date.now(),
      name,
      date,
    };
    addTournament(newTournament);
    setTournamentId(newTournament.id);  
    setName('');
    setDate('');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Tournament</h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
          placeholder="Tournament Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-3 border rounded-lg text-gray-700 shadow-md focus:ring-2 focus:ring-blue-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-full p-3 bg-black text-white rounded-lg shadow-md hover:bg-yellow-500 focus:ring-2 focus:ring-black"
        >
          Create Tournament
        </button>
      </div>
    </div>
  );
};

export default AddTournament;
