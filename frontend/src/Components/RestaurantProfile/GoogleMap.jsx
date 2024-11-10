import React from 'react';

const GoogleMapComponent = ({ location }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(location)}`}
      ></iframe>
    </div>
  );
};

export default GoogleMapComponent;
