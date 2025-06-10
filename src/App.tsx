import { Outlet } from '@tanstack/react-router';

function App() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Rick and Morty Characters</h1>
      <Outlet />
    </div>
  );
}

export default App;
