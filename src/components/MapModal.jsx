import React, { useEffect, useState } from "react";
import { MapPin, X, ExternalLink, Globe } from "lucide-react";

const MapModal = ({ location, onClose }) => {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY
  const [isLoading, setIsLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  
  // Generate the map URL for the location
  const getMapUrl = () => {
    if (!location) return "";
    
    // Check if location is an object with coordinates
    if (typeof location === 'object' && location.latitude && location.longitude) {
      return `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAPS_API_KEY}&center=${location.latitude},${location.longitude}&zoom=14&maptype=roadmap`;
    }
    
    // For address components like city and state
    if (typeof location === 'object' && (location.city || location.state)) {
      const addressString = [location.city, location.state].filter(Boolean).join(", ");
      return `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(addressString)}&maptype=roadmap`;
    }
    
    // For string locations
    return `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(location)}&key=${GOOGLE_MAPS_API_KEY}&maptype=roadmap`;
  };
  
  // Format location for display
  const formatLocationTitle = () => {
    if (typeof location === 'string') {
      return location;
    }
    
    if (typeof location === 'object') {
      // Format as City, State if available
      if (location.city || location.state) {
        return [location.city, location.state].filter(Boolean).join(", ");
      }
      
      // Format as coordinates if available
      if (location.latitude && location.longitude) {
        return `${location.latitude}, ${location.longitude}`;
      }
      
      // Fallback to JSON representation
      return JSON.stringify(location);
    }
    
    return "Location";
  };
  
  // Handle keyboard events for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  // Focus trap and keyboard handling
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    // Animation effect
    setTimeout(() => {
      setShowMap(true);
    }, 300);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  if (!location) return null;
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatLocationTitle())}`;
  
  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300 ${showMap ? 'opacity-100' : 'opacity-0'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden transition-transform duration-300 transform ${showMap ? 'scale-100' : 'scale-95'} border border-gray-700`}>
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 text-gray-100 flex justify-between items-center border-b border-gray-700">
          <div className="flex items-center">
            <div className="bg-gray-700 p-2 rounded-lg mr-3">
              <MapPin className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h2 className="text-lg font-medium truncate text-teal-50">
                {formatLocationTitle()}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">Interactive Map View</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Map container with enhanced loading state */}
        <div className="relative w-full h-64 md:h-80 bg-gray-800">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="flex flex-col items-center">
                {/* Pulsing map marker animation */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-teal-500 bg-opacity-20 animate-ping absolute inset-0"></div>
                  <div className="w-16 h-16 rounded-full bg-teal-500 bg-opacity-40 animate-pulse absolute inset-0"></div>
                  <div className="relative flex items-center justify-center h-16">
                    <Globe className="w-8 h-8 text-teal-400" />
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-300">Loading map data...</p>
              </div>
            </div>
          )}
          
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            frameBorder="0"
            src={getMapUrl()}
            allowFullScreen
            className="transition-all duration-500"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={() => setIsLoading(false)}
          ></iframe>
          
          {/* View in Google Maps badge */}
          <a 
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 left-3 z-10 bg-gray-900 bg-opacity-90 px-3 py-1.5 rounded-full shadow-lg flex items-center text-sm hover:bg-opacity-100 transition-all duration-200 group border border-gray-700"
          >
            <ExternalLink className="w-3.5 h-3.5 text-teal-400 mr-1.5 group-hover:text-teal-300" />
            <span className="font-medium text-gray-100 group-hover:text-white">View in Google Maps</span>
          </a>
        </div>
        
        {/* Footer with gradient */}
        <div className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-gray-700 flex justify-end items-center">
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 text-sm rounded-lg transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 flex items-center"
          >
            <span>Close Map</span>
            <X className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;