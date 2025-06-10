import { useParams } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

async function fetchCharacter(id: string): Promise<Character> {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error('Failed to fetch character');
  return res.json();
}

function CharacterDetail() {
   //Specify route path
const { id } = useParams({ from: '/character/$id' });
  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
    enabled: !!id,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError || !data) return <div className="text-red-500">Error loading character.</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <img src={data.image} alt={data.name} className="rounded mb-4 mx-auto" />
      <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Species:</strong> {data.species}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Origin:</strong> {data.origin?.name}</p>
      <p><strong>Location:</strong> {data.location?.name}</p>
    </div>
  );
}
export default CharacterDetail;
