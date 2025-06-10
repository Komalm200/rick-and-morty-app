import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  fetchAllCharacters,
  Character,
} from "../api/rickAndMorty";
import { useState } from "react";

const ITEMS_PER_PAGE = 5;

function CharacterList() {
  const navigate = useNavigate();
  const [localPage, setLocalPage] = useState(1);

  const { data, isLoading, isError, refetch } = useQuery<Character[], Error>({
    queryKey: ["allCharacters"],
    queryFn: fetchAllCharacters,
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError || !data)
    return <div className="text-red-500">Error loading characters.</div>;

  const totalLocalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (localPage - 1) * ITEMS_PER_PAGE;
  const visibleCharacters = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleLocalPageChange = (newPage: number) => {
    setLocalPage(newPage);
  };

  const handleRowClick = (id: number) => {
    navigate({ to: "/character/$id", params: { id: String(id) } });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <button
        onClick={() => {
          refetch();
          setLocalPage(1);
        }}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        🔄 Refresh
      </button>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Species</th>
          </tr>
        </thead>
        <tbody>
          {visibleCharacters.map((char: Character) => (
            <tr
              key={char.id}
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => handleRowClick(char.id)}
            >
              <td className="p-2 border text-blue-600 hover:underline">
                {char.name}
              </td>
              <td className="p-2 border">{char.status}</td>
              <td className="p-2 border">{char.species}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <div className="mt-4 flex justify-center items-center gap-4">
        <button
          onClick={() => handleLocalPageChange(localPage - 1)}
          disabled={localPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          ⬅ Prev
        </button>
        <span>
          Page {localPage} of {totalLocalPages}
        </span>
        <button
          onClick={() => handleLocalPageChange(localPage + 1)}
          disabled={localPage === totalLocalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next ➡
        </button>
      </div> */}
      <div className="mt-4 flex justify-center items-center gap-2 flex-wrap">
  <button
    onClick={() => handleLocalPageChange(1)}
    disabled={localPage === 1}
    className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    ⏮
  </button>
  <button
    onClick={() => handleLocalPageChange(localPage - 1)}
    disabled={localPage === 1}
    className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    ⬅ Prev
  </button>
  <span className="px-2">
    Page {localPage} of {totalLocalPages}
  </span>
  <button
    onClick={() => handleLocalPageChange(localPage + 1)}
    disabled={localPage === totalLocalPages}
    className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    Next ➡
  </button>
  <button
    onClick={() => handleLocalPageChange(totalLocalPages)}
    disabled={localPage === totalLocalPages}
    className="px-3 py-2 bg-gray-300 rounded disabled:opacity-50"
  >
    ⏭
  </button>
</div>

    </div>
  );
}

export default CharacterList;
