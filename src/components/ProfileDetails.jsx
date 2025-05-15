import React, { useState, useEffect } from "react";
import { X, Mail, Phone, MapPin, Tag, Globe, Clock, Briefcase, Code, User } from "lucide-react";

const ProfileDetailModal = ({ profile, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (profile) {
      setIsVisible(true);
      setTimeout(() => setAnimateIn(true), 50);
    }
  }, [profile]);

  if (!profile) return null;

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${animateIn ? 'bg-black/80 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
      {/* Enhanced neural network background effect */}
      <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-600/30 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent animate-pulse delay-700"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_80%,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent animate-pulse delay-500"></div>
      </div>
      
      <div className={`w-full max-w-4xl rounded-2xl shadow-2xl backdrop-blur-lg overflow-hidden flex flex-col md:flex-row transition-all duration-500 ${
        animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        boxShadow: "0 0 60px rgba(79, 70, 229, 0.2), 0 0 30px rgba(147, 51, 234, 0.15)"
      }}>
        {/* Top colorful border */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-violet-700 to-purple-700"></div>
        
        {/* Left Section - Photo and Basic Info - Darker gradients */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-gray-950 via-indigo-950 to-purple-950 text-white p-6 relative">
          {/* Enhanced decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600 rounded-full opacity-5 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 rounded-full opacity-5 blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-600 rounded-full opacity-5 blur-xl"></div>
          
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,_#000_25%,_transparent_25%,_transparent_50%,_#000_50%,_#000_75%,_transparent_75%,_transparent)] bg-[length:4px_4px]"></div>
          
          <div className="relative flex flex-col items-center md:items-start">
            <div className="mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-all duration-300 scale-110"></div>
              <img
                src={profile.photoUrl || "/api/placeholder/150/150"}
                alt={profile.name}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-gray-900 object-cover shadow-xl relative z-10 group-hover:scale-105 transition-all duration-300"
                onError={(e) => {
                  e.target.src = "/api/placeholder/150/150";
                }}
              />
            </div>
            
            <h2 className="text-2xl font-bold text-center md:text-left text-white bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">{profile.name}</h2>
            
            {profile.title && (
              <p className="text-purple-300 mt-2 text-center md:text-left">{profile.title}</p>
            )}
            
            <div className="flex items-center mt-3 text-blue-300">
              <MapPin size={16} className="mr-2" />
              <span>{profile.location}</span>
            </div>
          </div>
          
          <div className="mt-8 space-y-3 w-full">
            <div className="flex items-center p-3 bg-gray-900/80 rounded-lg hover:bg-gray-800/80 transition-all duration-200 border border-gray-800 hover:border-blue-900 group">
              <div className="p-2 bg-blue-900/30 rounded-md mr-3 group-hover:bg-blue-900/50 transition-all duration-200">
                <Mail size={16} className="text-blue-400" />
              </div>
              <span className="text-gray-100 text-sm md:text-base truncate">{profile.email}</span>
            </div>
            
            <div className="flex items-center p-3 bg-gray-900/80 rounded-lg hover:bg-gray-800/80 transition-all duration-200 border border-gray-800 hover:border-blue-900 group">
              <div className="p-2 bg-blue-900/30 rounded-md mr-3 group-hover:bg-blue-900/50 transition-all duration-200">
                <Phone size={16} className="text-blue-400" />
              </div>
              <span className="text-gray-100 text-sm md:text-base">{profile.phone}</span>
            </div>
            
            {profile.website && (
              <div className="flex items-center p-3 bg-gray-900/80 rounded-lg hover:bg-gray-800/80 transition-all duration-200 border border-gray-800 hover:border-blue-900 group">
                <div className="p-2 bg-blue-900/30 rounded-md mr-3 group-hover:bg-blue-900/50 transition-all duration-200">
                  <Globe size={16} className="text-blue-400" />
                </div>
                <span className="text-gray-100 text-sm md:text-base truncate">{profile.website}</span>
              </div>
            )}

            {profile.experience && (
              <div className="flex items-center p-3 bg-gray-900/80 rounded-lg hover:bg-gray-800/80 transition-all duration-200 border border-gray-800 hover:border-blue-900 group">
                <div className="p-2 bg-blue-900/30 rounded-md mr-3 group-hover:bg-blue-900/50 transition-all duration-200">
                  <Clock size={16} className="text-blue-400" />
                </div>
                <span className="text-gray-100 text-sm md:text-base">
                  {profile.experience} {Number(profile.experience) === 1 ? 'year' : 'years'} experience
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section - Description and Details */}
        <div className="w-full md:w-3/5 p-6 relative bg-gradient-to-br from-gray-900 to-gray-850">
          <button
            className="absolute top-4 right-4 bg-gray-800 text-gray-300 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-200 hover:rotate-90 shadow-md"
            onClick={handleClose}
          >
            <X size={18} />
          </button>
          
          {/* About section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-400 mb-3 pb-2 border-b border-gray-700 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-blue-700 rounded-full mr-3"></span>
              About
            </h3>
            <p className="text-gray-300 leading-relaxed">{profile.description}</p>
          </div>
          
          {/* Skills section */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-3 pb-2 border-b border-gray-700 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full mr-3"></span>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-900/70 hover:border-blue-700 transform transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-900/20"
                  >
                    {typeof skill === 'object' ? skill.name : skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Interests tags */}
          {profile.interests && (
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <Tag size={16} className="mr-2 text-purple-400" />
                <h3 className="text-lg font-semibold text-blue-400 pb-2 border-b border-gray-700 flex-1">Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.interests?.split(',').map((interest, index) => (
                  interest.trim() && (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-gray-700 hover:border-blue-500/50 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-900/10"
                    >
                      {interest.trim()}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
          
          {/* Experience section - Updated to handle both array and number formats */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Clock size={16} className="mr-2 text-blue-400" />
              <h3 className="text-lg font-semibold text-blue-400 pb-2 border-b border-gray-700 flex-1">Experience</h3>
            </div>
            
            {Array.isArray(profile.experience) ? (
              <div className="space-y-3">
                {profile.experience.map((exp, index) => (
                  <div key={index} className="flex items-center p-4 bg-gradient-to-br from-gray-800 to-gray-850 rounded-lg border border-gray-700 hover:border-blue-800 transition-all duration-200 shadow-md">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-200">{exp.role}</h4>
                      <p className="text-blue-300 text-sm">{exp.company}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-indigo-900/70 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-800">
                        {exp.years} {exp.years === 1 ? 'year' : 'years'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              profile.experience ? (
                <div className="flex items-center p-4 bg-gradient-to-br from-gray-800 to-gray-850 rounded-lg border border-gray-700 hover:border-blue-800 transition-all duration-200 shadow-md">
                  <p className="text-gray-300">
                    {profile.experience} {Number(profile.experience) === 1 ? 'year' : 'years'} of professional experience
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 italic">No experience information available</p>
              )
            )}
          </div>
          
          <div className="mt-auto pt-4">
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-700 to-purple-700 text-white rounded-lg hover:from-blue-800 hover:to-purple-800 transition-all duration-200 font-medium shadow-lg hover:shadow-blue-900/30 transform hover:-translate-y-0.5 relative overflow-hidden group"
              onClick={handleClose}
            >
              <span className="relative z-10">Close Profile</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailModal;