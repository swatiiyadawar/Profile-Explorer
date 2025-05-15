import React, { useState, useEffect } from "react";
import AddProfileModal from "../components/addprofilemodal";
import ProfileCard from "../components/profilecard";
import { useAdmin } from "../context-api/admincontext";
import Header from "../components/header";

const HomePage = () => {
  const { isAdmin } = useAdmin(); // Get Admin Mode from Context
  const [isModalOpen, setModalOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Load profiles from local storage on mount
  useEffect(() => {
    loadProfiles();
  }, []);

  // Function to load profiles from localStorage
  const loadProfiles = () => {
    const storedProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
    setProfiles(storedProfiles);
  };

  // Function to handle profile addition or update
  const handleProfileAdded = () => {
    // Simply reload from localStorage to ensure we have the latest data
    loadProfiles();
  };

  // Function to handle profile editing
  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setModalOpen(true);
  };

  // Function to handle profile deletion
  const handleDelete = (profileToDelete) => {
    if (window.confirm(`Are you sure you want to delete ${profileToDelete.name}'s profile?`)) {
      const updatedProfiles = profiles.filter(
        (profile) => profile.id !== profileToDelete.id || 
                    (profile.id === undefined && profile.email !== profileToDelete.email)
      );
      localStorage.setItem("profiles", JSON.stringify(updatedProfiles));
      setProfiles(updatedProfiles);
      alert("Profile deleted successfully!");
    }
  };

  // Function to handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter((profile) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name?.toLowerCase().includes(searchLower) ||
      profile.email?.toLowerCase().includes(searchLower) ||
      profile.location?.toLowerCase().includes(searchLower) ||
      profile.description?.toLowerCase().includes(searchLower) ||
      (profile.interests && typeof profile.interests === 'string' && 
       profile.interests.toLowerCase().includes(searchLower))
    );
  });

  // Placeholder handlers for map and details
  const handleMap = (profile) => {
    alert(`Map view for ${profile.name} in ${profile.location}`);
  };

  const handleDetails = (profile) => {
    alert(`Details for ${profile.name}\nInterests: ${profile.interests || 'None'}`);
  };

  // Close modal and reset editing state
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingProfile(null);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100">
      {/* Sticky Header that stretches from left to right border */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
        <Header />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-8 sm:pb-16 max-w-7xl">
        {/* Split layout for header section - stack on mobile, side by side on larger screens */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-10 mt-4 sm:mt-6">
          {/* Left half - Header with icon and description */}
          <div className="w-full md:w-2/3 mb-6 md:mb-0">
            <div className="flex items-center mb-2 sm:mb-3">
              <svg 
                className="h-6 w-6 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-cyan-400" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Profile Directory
              </h1>
            </div>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl pl-1">
              Manage and organize user profiles with this intuitive directory system. Search, view, and update profile information in one place.
            </p>
          </div>
          
          {/* Right half - Profile Count Display (full width on mobile) */}
          <div className="w-full md:w-1/4">
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg p-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg 
                    className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 mr-2" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="text-gray-300 text-sm sm:text-base font-medium">Total Profiles:</span>
                </div>
                <span className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {profiles.length}
                </span>
              </div>
              
              {/* Only show when filtered */}
              {filteredProfiles.length !== profiles.length && (
                <div className="flex justify-between items-center mt-2 text-xs sm:text-sm text-gray-400 border-t border-gray-800 pt-2">
                  <span>Showing in search:</span>
                  <span className="font-medium">{filteredProfiles.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Background design elements */}
        <div className="fixed inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-cyan-600 filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-60 sm:w-80 h-60 sm:h-80 rounded-full bg-blue-700 filter blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 sm:w-40 h-32 sm:h-40 rounded-full bg-teal-800 filter blur-2xl"></div>
        </div>
        
        {/* Improved Search Bar + New Profile Button - stack on small screens */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10 gap-4 relative z-10">
          <div className="relative w-full sm:max-w-md mb-4 sm:mb-0">
            <input
              type="text"
              placeholder="Search profiles..."
              className="w-full p-2 sm:p-3 pl-8 sm:pl-10 bg-gray-900 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-200 transition-all duration-300 text-sm sm:text-base"
              value={searchTerm}
              onChange={handleSearch}
            />
            <svg
              className="absolute left-3 top-2.5 sm:top-3.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          {isAdmin && (
            <button
              onClick={() => {
                setEditingProfile(null);
                setModalOpen(true);
              }}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm sm:text-base font-semibold rounded-full hover:from-cyan-700 hover:to-blue-700 transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-lg"
            >
              + New Profile
            </button>
          )}
        </div>

        {/* Profile Grid with responsive columns */}
        <div className="px-0 sm:px-2 md:px-4">
          {filteredProfiles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 relative z-10">
              {filteredProfiles.map((profile) => (
                <ProfileCard
                  key={profile.id || `profile-${profile.email}-${Math.random().toString(36).substring(7)}`}
                  profile={profile}
                  isAdmin={isAdmin}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onMap={handleMap}
                  onDetails={handleDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-16 bg-gradient-to-b from-gray-900 to-black rounded-xl border border-gray-800 shadow-2xl backdrop-filter backdrop-blur-sm relative z-10">
              <svg
                className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <p className="text-gray-300 text-base sm:text-lg px-4">
                {searchTerm ? "No profiles match your search." : "No profiles found. Add a new profile to get started!"}
              </p>
              {!searchTerm && isAdmin && (
                <button
                  onClick={() => {
                    setEditingProfile(null);
                    setModalOpen(true);
                  }}
                  className="mt-4 px-5 py-2 text-sm sm:text-base bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-full hover:from-cyan-700 hover:to-blue-700 transform transition-all hover:scale-105 focus:outline-none"
                >
                  Create First Profile
                </button>
              )}
            </div>
          )}
        </div>

        {/* Add/Edit Profile Modal */}
        <AddProfileModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onProfileAdded={handleProfileAdded}
          editingProfile={editingProfile}
        />
      </div>
      
      {/* Footer with subtle gradient */}
      <footer className="py-4 sm:py-6 bg-gradient-to-t from-gray-900 to-black border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-500 text-xs sm:text-sm">
          <p>© {new Date().getFullYear()} Profile Manager. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;