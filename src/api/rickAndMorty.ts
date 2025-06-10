export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
}

export interface CharactersResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

// export async function fetchCharacters(page: number): Promise<CharactersResponse> {
//   const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
//   if (!res.ok) throw new Error('Failed to fetch characters');
//   return res.json();
// }
export async function fetchAllCharacters(): Promise<Character[]> {
  const firstPageRes = await fetch(`https://rickandmortyapi.com/api/character`);
  if (!firstPageRes.ok) throw new Error('Failed to fetch characters');
  const firstPageData: CharactersResponse = await firstPageRes.json();

  const totalPages = firstPageData.info.pages;
  const allResults = [...firstPageData.results];

  const fetches = [];
  for (let i = 2; i <= totalPages; i++) {
    fetches.push(fetch(`https://rickandmortyapi.com/api/character?page=${i}`));
  }

  const responses = await Promise.all(fetches);
  for (const res of responses) {
    if (!res.ok) throw new Error('Failed to fetch characters');
    const data: CharactersResponse = await res.json();
    allResults.push(...data.results);
  }
  return allResults;
}


