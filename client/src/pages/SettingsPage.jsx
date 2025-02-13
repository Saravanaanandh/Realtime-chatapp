// import './../App.css'

// const SettingsPage = () => {
//     return (
//       <div className="w-full h-full flex flex-col justify-between bg-gray-900 text-white" id="settings">
//         <h1 className=''>Settings page</h1>
//         <div className="text-[10px] text-center ">
//           <p className='text-blue-400'>copyright&copy;2025</p>
//           <p className="text-[11px] ">created by saravana</p>
//         </div>
//       </div>
//     )
//   }
  
//   export default SettingsPage

import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  // State for theme, font size, and chat bubble style
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState("md");
  const [bubbleStyle, setBubbleStyle] = useState("rounded-lg");
  const [notifications, setNotifications] = useState(true);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-gray-800 dark:text-gray-300">Dark Mode</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      {/* Font Size Selector */}
      <div>
        <label className="block text-gray-800 dark:text-gray-300">Font Size</label>
        <select
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={fontSize}
          onChange={(e) => setFontSize(e.target.value)}
        >
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
        </select>
      </div>

      {/* Chat Bubble Customization */}
      <div>
        <label className="block text-gray-800 dark:text-gray-300">Chat Bubble Style</label>
        <select
          className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-white"
          value={bubbleStyle}
          onChange={(e) => setBubbleStyle(e.target.value)}
        >
          <option value="rounded-lg">Rounded</option>
          <option value="rounded-full">Circular</option>
          <option value="rounded-none">Square</option>
        </select>
      </div>

      {/* Notification Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-gray-800 dark:text-gray-300">Message Notifications</span>
        <input
          type="checkbox"
          className="toggle toggle-primary"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>
    </div>
  );
};

export default SettingsPage;

  