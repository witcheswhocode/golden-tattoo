import React from 'react';
import AlphabetInputs from './AlphabetInputs';

interface HomeProps {
  // Define your prop types here
}

function Home(props: HomeProps) {
  return (
    <main className="p-4">
      <h2 className="text-2xl mb-2">Welcome to My Website</h2>
      <p>This is the home page of our website.</p>
      <AlphabetInputs />
    </main>
  );
}

export default Home;
