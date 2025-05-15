import React, { useState } from "react";
import { MapPin, Mail, Phone, Pencil, Trash, User, ChevronRight, Heart } from "lucide-react";
import MapModal from "./MapModal";
import locations from "../data/locations";
import ProfileDetailModal from "./ProfileDetails";

const ProfileCard = ({ profile, isAdmin, onEdit, onDelete, onDetails }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const defaultImage = "https://via.placeholder.com/150?text=Profile";
  
  // Function to find location object based on the location string
  const findLocationCoordinates = (locationName) => {
    if (!locationName) return null;
    
    // Extract city name (assuming format like "City, State" or just "City")
    const cityPart = locationName.split(',')[0].trim();
    
    // Find the matching location from our locations array
    const matchedLocation = locations.find(loc => 
      loc.city.toLowerCase() === cityPart.toLowerCase()
    );
    
    return matchedLocation || { city: locationName }; // Return the found location or fallback
  };
  
  return (
    <div 
      className="w-full max-w-xs h-full relative rounded-xl perspective-1000 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Enhanced animated border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-60 blur-sm group-hover:opacity-80 group-hover:blur transition duration-1000 animate-gradient-x"></div>
      
      {/* Card with gradient background */}
      <div className="relative h-full w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl shadow-lg transform transition-all duration-500 group-hover:scale-[1.02] z-10">
        
        {/* Decorative elements - enhanced with animation */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-700/20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-600/25 transition-all duration-700"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-700/20 rounded-full blur-2xl -ml-10 -mb-10 group-hover:bg-purple-600/25 transition-all duration-700"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl"></div>
        
        {/* Subtle particle effect dots */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-indigo-400 rounded-full opacity-40"></div>
          <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-purple-400 rounded-full opacity-40"></div>
          <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-pink-400 rounded-full opacity-40"></div>
          <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-blue-400 rounded-full opacity-40"></div>
        </div>
        
        {/* Main content wrapper */}
        <div className="relative p-5 h-full flex flex-col">
          {/* Enhanced profile header with gradient background */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-indigo-900/50 to-transparent rounded-t-xl"></div>
          
          {/* Profile image section with enhanced glow */}
          <div className="flex justify-center relative z-10 mb-3">
            <div className="relative">
              {/* Improved glowing effect around profile image */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-full blur ${isHovered ? 'opacity-80 animate-pulse-slow' : 'opacity-60'} transition-all duration-300`}></div>
              <div className="absolute -inset-0.5 bg-gray-900 rounded-full"></div>
              <img
                src={profile.photoUrl || profile.image || defaultImage}
                alt={profile.name}
                className="w-20 h-20 rounded-full border-2 border-gray-800 shadow-lg object-cover relative z-10"
                onError={(e) => {
                  e.target.src = defaultImage;
                }}
              />
            </div>
          </div>
          
          {/* Name with enhanced text glow */}
          <div className="text-center mb-3 relative z-10">
            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-white drop-shadow-lg">{profile.name}</h2>
            {profile.location && (
              <p className="text-indigo-300 flex items-center justify-center text-xs mt-1">
                <MapPin size={12} className="mr-1 text-indigo-400" strokeWidth={2} />
                {profile.location}
              </p>
            )}
          </div>
          
          {/* Enhanced styled divider */}
          <div className="flex items-center my-2">
            <div className="h-px flex-grow bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent group-hover:via-indigo-400/50 transition-all duration-500"></div>
          </div>
          
          {/* Contact info with enhanced background */}
          <div className="bg-gray-800/80 backdrop-blur-md rounded-lg p-3 border border-gray-700/80 shadow-md mb-3 group-hover:border-indigo-900/50 transition-all duration-500">
            <div className="flex items-center space-x-2 text-white mb-2">
              <div className="p-1.5 rounded-md bg-indigo-900/70 text-indigo-300 shadow-inner shadow-indigo-800/50">
                <Mail size={14} />
              </div>
              <span className="text-xs truncate flex-1">{profile.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <div className="p-1.5 rounded-md bg-indigo-900/70 text-indigo-300 shadow-inner shadow-indigo-800/50">
                <Phone size={14} />
              </div>
              <span className="text-xs flex-1">{profile.phone}</span>
            </div>
          </div>
          
          {/* Interests with enhanced tags */}
          {profile.interests && typeof profile.interests === 'string' && profile.interests.trim() !== '' && (
            <div className="mb-3">
              <div className="flex items-center mb-3">
                <Heart size={14} className="text-pink-500 mr-1.5" />
                <p className="text-s text-white font-medium">Interests</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.split(',').map((interest, index) => (
                  <span 
                    key={`interest-${index}`} 
                    className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-800/80 to-purple-800/80 text-white border border-indigo-600/40 hover:border-indigo-500/60 shadow-sm hover:shadow transition-all duration-300"
                  >
                    {interest.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Enhanced action buttons with subtle hover effects */}
          <div className="mt-auto space-y-2">
            <div className="flex gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-gray-800 to-indigo-900 hover:from-gray-700 hover:to-indigo-800 border border-gray-700/80 hover:border-indigo-700/80 shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsMapOpen(true)}
              >
                <MapPin size={12} />
                Map
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-indigo-900 to-purple-900 hover:from-indigo-800 hover:to-purple-800 border border-indigo-700/80 hover:border-purple-700/80 shadow-md hover:shadow-lg transition-all"
                onClick={() => setIsDetailOpen(true)}
              >
                <User size={12} />
                Details
                <ChevronRight size={12} className="ml-0.5" />
              </button>
            </div>

            {isAdmin && (
              <div className="flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-gray-800 to-blue-900 hover:from-gray-700 hover:to-blue-800 border border-gray-700/80 hover:border-blue-700/80 shadow-md hover:shadow-lg transition-all"
                  onClick={() => onEdit && onEdit(profile)}
                >
                  <Pencil size={12} />
                  Edit
                </button>
                <button
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg font-medium text-xs text-white bg-gradient-to-r from-gray-800 to-red-900 hover:from-gray-700 hover:to-red-800 border border-gray-700/80 hover:border-red-700/80 shadow-md hover:shadow-lg transition-all"
                  onClick={() => onDelete && onDelete(profile)}
                >
                  <Trash size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
          
          {/* Subtle corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-indigo-500/30 rounded-tl-xl"></div>
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-purple-500/30 rounded-tr-xl"></div>
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-indigo-500/30 rounded-bl-xl"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-purple-500/30 rounded-br-xl"></div>
        </div>
      </div>

      {/* Modals */}
      {isMapOpen && (
        <MapModal 
          location={findLocationCoordinates(profile.location)} 
          onClose={() => setIsMapOpen(false)} 
        />
      )}

      {isDetailOpen && (
        <ProfileDetailModal 
          profile={profile} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProfileCard;