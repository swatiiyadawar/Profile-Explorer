import React, { useState, useEffect, useRef } from "react";
import { X, Mail, Phone, MapPin, Tag, User, Briefcase, Code, Clock } from "lucide-react";

const AddProfileModal = ({ isOpen, onClose, onProfileAdded, editingProfile }) => {
  const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
  
  const skillOptions = [
    "JavaScript", "Python", "Java", "C", "C++", "C#", "Ruby", "PHP", "Swift",
    "Go", "Rust", "TypeScript", "React", "Angular", "Vue", "Node.js", "Django",
    "Flask", "Spring", "ASP.NET", "SQL", "MongoDB", "Firebase", "AWS", "Azure",
    "Docker", "Kubernetes", "TensorFlow", "PyTorch", "Git"
  ];
  
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    photoUrl: "",
    location: "",
    phone: "",
    description: "",
    interests: "",
    title: "",
    skills: [],
    experience: "",
  });
  
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const [skillSearch, setSkillSearch] = useState("");
  const skillsRef = useRef(null);
  
  const autocompleteRef = useRef(null);
  const locationInputRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setAnimateIn(true), 50);
    } else {
      setAnimateIn(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (editingProfile) {
      setProfileData({
        ...editingProfile,
        title: editingProfile.title || "",
        skills: editingProfile.skills || [],
        experience: editingProfile.experience || "",
      });
    } else {
      // Reset form when opening for a new profile
      setProfileData({
        name: "",
        email: "",
        photoUrl: "",
        location: "",
        phone: "",
        description: "",
        interests: "",
        title: "",
        skills: [],
        experience: "",
      });
    }
  }, [editingProfile, isOpen]);

  // Close skills dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (skillsRef.current && !skillsRef.current.contains(event.target)) {
        setSkillsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Initialize Google Maps Places API
  useEffect(() => {
    if (!isOpen) return;

    // Load Google Maps Script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeAutocomplete;
      document.head.appendChild(script);
    };

    const initializeAutocomplete = () => {
      if (!locationInputRef.current) return;
      
      autocompleteRef.current = new window.google.maps.places.Autocomplete(locationInputRef.current);
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place && place.formatted_address) {
          setProfileData((prev) => ({ ...prev, location: place.formatted_address }));
        }
      });
    };

    loadGoogleMapsScript();

    // Cleanup function
    return () => {
      if (autocompleteRef.current) {
        window.google?.maps?.event?.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSkill = (skill) => {
    setProfileData((prev) => {
      if (prev.skills.includes(skill)) {
        return {
          ...prev,
          skills: prev.skills.filter(s => s !== skill)
        };
      } else {
        return {
          ...prev,
          skills: [...prev.skills, skill]
        };
      }
    });
  };

  const filteredSkills = skillOptions.filter(
    skill => skill.toLowerCase().includes(skillSearch.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Get existing profiles from localStorage
      let existingProfiles = JSON.parse(localStorage.getItem("profiles")) || [];
      
      // Generate a unique ID for new profiles
      if (!editingProfile) {
        profileData.id = Date.now().toString();
      }

      // Update or add the profile
      if (editingProfile) {
        existingProfiles = existingProfiles.map((profile) =>
          profile.email === editingProfile.email ? profileData : profile
        );
      } else {
        existingProfiles.push(profileData);
      }

      // Save to localStorage
      localStorage.setItem("profiles", JSON.stringify(existingProfiles));
      
      // Call the callback function
      onProfileAdded(profileData);
      
      // Close the modal
      handleClose();
      
      // Show success alert
      alert(
        `Profile ${editingProfile ? "updated" : "added"} successfully!\n\n` +
        `Name: ${profileData.name}\n` +
        `Email: ${profileData.email}\n` +
        `Location: ${profileData.location}\n` +
        `Phone: ${profileData.phone}`
      );
    } catch (error) {
      alert(`Error: ${error.message}. Please try again.`);
    }
  };

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${animateIn ? 'bg-black/70 backdrop-blur-md' : 'bg-black/0 backdrop-blur-none'}`}>
      {/* Neural network background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/30 via-transparent to-transparent animate-pulse"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_20%,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent animate-pulse delay-700"></div>
      </div>
      
      <div 
        className={`w-full max-w-3xl bg-gray-900/90 rounded-2xl shadow-2xl backdrop-blur-lg border border-gray-800 transition-all duration-500 overflow-hidden ${
          animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{
          boxShadow: "0 0 40px rgba(92, 92, 255, 0.15), 0 0 20px rgba(147, 51, 234, 0.1)",
          background: "linear-gradient(145deg, rgba(17, 24, 39, 0.95), rgba(11, 15, 25, 0.8))"
        }}
      >
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
        
        {/* Top colorful border */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600"></div>
        
        {/* Close button */}
        <button
          className="absolute right-4 top-4 p-2 rounded-full bg-gray-800/80 text-gray-400 hover:text-white hover:bg-red-500/80 transition-all duration-300 backdrop-blur-md hover:rotate-90 transform z-50"
          onClick={handleClose}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
            {editingProfile ? "Edit Profile" : "Add New Profile"}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-5">
                <div className="group">
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={profileData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>

                <div className="group">
                  <div className="relative">
                    <Briefcase size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="text"
                      name="title"
                      placeholder="Job Title"
                      value={profileData.title}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>

                <div className="group">
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={profileData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 disabled:bg-gray-700/30 disabled:cursor-not-allowed shadow-inner hover:shadow-blue-900/5"
                      disabled={editingProfile}
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={profileData.phone}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>

                <div className="group">
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="number"
                      name="experience"
                      placeholder="Years of Experience"
                      value={profileData.experience}
                      onChange={handleChange}
                      min="0"
                      step="0.5"
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-5">
                <div className="group">
                  <input
                    type="url"
                    name="photoUrl"
                    placeholder="Photo URL (http://...)"
                    value={profileData.photoUrl}
                    onChange={handleChange}
                    className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                  />
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                </div>

                <div className="group">
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      ref={locationInputRef}
                      type="text"
                      name="location"
                      placeholder="Search for location..."
                      value={profileData.location}
                      onChange={handleChange}
                      required
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative" ref={skillsRef}>
                    <Code size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="text"
                      placeholder="Select Skills"
                      value={skillSearch}
                      onChange={(e) => setSkillSearch(e.target.value)}
                      onFocus={() => setSkillsDropdownOpen(true)}
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                    
                    {skillsDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full bg-gray-800 border border-gray-700 rounded-xl shadow-lg max-h-48 overflow-y-auto overflow-x-hidden">
                        {filteredSkills.length > 0 ? (
                          filteredSkills.map((skill) => (
                            <div
                              key={skill}
                              className={`p-2 flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-colors duration-200 ${
                                profileData.skills.includes(skill) ? "bg-blue-900/30" : ""
                              }`}
                              onClick={() => toggleSkill(skill)}
                            >
                              <span className="text-white">{skill}</span>
                              {profileData.skills.includes(skill) && (
                                <span className="text-blue-400 text-sm">Selected</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-gray-400 text-center">No skills match your search</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="group">
                  <div className="relative">
                    <Tag size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 opacity-70 group-hover:opacity-100 transition-all duration-300" />
                    <input
                      type="text"
                      name="interests"
                      placeholder="Interests (comma separated)"
                      value={profileData.interests}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 shadow-inner hover:shadow-blue-900/5"
                    />
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-4">
              {profileData.photoUrl && (
                <div className="relative flex-shrink-0 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-all duration-300 scale-110"></div>
                  <img 
                    src={profileData.photoUrl} 
                    alt="Profile Preview" 
                    className="h-20 w-20 object-cover rounded-full border-2 border-gray-800 relative z-10 shadow-lg group-hover:scale-105 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150?text=Invalid+URL";
                    }}
                  />
                </div>
              )}
              
              <textarea
                name="description"
                placeholder="Short Description"
                value={profileData.description}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 focus:outline-none transition-all duration-200 hover:border-gray-600 h-20 resize-none shadow-inner hover:shadow-blue-900/5"
              />
            </div>

            {/* Skills tags display */}
            {profileData.skills.length > 0 && (
              <div className="mt-4">
                <h3 className="text-gray-400 text-sm mb-2">Selected Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="group relative bg-gradient-to-r from-blue-800/50 to-purple-800/50 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-blue-800/70 hover:border-blue-500 transition-all duration-200 cursor-pointer"
                      onClick={() => toggleSkill(skill)}
                    >
                      {skill}
                      <span className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-200 flex items-center justify-center">
                        <X size={10} className="text-red-400" />
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Interests tags display */}
            {profileData.interests && (
              <div className="flex flex-wrap gap-2 mt-4">
                {profileData.interests.split(',').map((interest, index) => (
                  interest.trim() && (
                    <span 
                      key={index} 
                      className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 text-blue-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-700 hover:border-blue-500/50 hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-900/10"
                    >
                      {interest.trim()}
                    </span>
                  )
                ))}
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-200 font-medium text-sm border border-gray-700 hover:shadow-inner"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-0.5 font-medium text-sm"
              >
                {editingProfile ? "Save Changes" : "Add Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProfileModal;