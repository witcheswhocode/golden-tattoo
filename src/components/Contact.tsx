import React from 'react';
import LocationSearch from './LocationSearch';

interface ContactProps {
  // Define your prop types here
}

function Contact(props: ContactProps) {
  const locationData = [
    {
      id: 1,
      name: 'Canada',
      children: [
        { id: 2, name: 'Toronto' },
        { id: 3, name: 'Ontario' },
      ],
    },
    {
      id: 4,
      name: 'Spain',
      children: [
        { id: 5, name: 'Barcelona' },
        { id: 6, name: 'Valencia' },
      ],
    },
    {
      id: 2,
      name: 'France',
      children: [
        { id: 5, name: 'Baton Rou' },
        { id: 6, name: 'Valencia' },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Location Search</h1>
      <LocationSearch data={locationData} />
    </div>
  );
}

export default Contact;
