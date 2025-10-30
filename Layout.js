import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Home, MessageCircle, Moon, User } from "lucide-react";

const navItems = [
  { name: "Feed", icon: Home, path: "Home" },
  { name: "Chat", icon: MessageCircle, path: "Chat" },
  { name: "Reflect", icon: Moon, path: "Reflect" },
  { name: "Profile", icon: User, path: "Profile" },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => base44.auth.me(),
  });

  const theme = user?.wellness_theme || "lavender_calm";
  const isDarkMode = user?.is_dark_mode || false;

  const themeGradients = {
    lavender_calm: "from-[#E8E6FF] via-[#FCE6E9] to-[#DAD4F6]",
    ocean_serenity: "from-[#56CFE1] via-[#B8F2E6] to-[#AED9E0]",
    sunset_warmth: "from-[#FFD97D] via-[#FBE8E7] to-[#FFCFD2]",
    forest_peace: "from-[#B5EAD7] via-[#C7CEEA] to-[#E2F0CB]",
    moonlight_dreams: "from-[#8A4FFF] via-[#C8B6FF] to-[#E8E6FF]",
  };

  const darkGradients = {
    lavender_calm: "from-[#2D2842] via-[#3D2845] to-[#1F1B33]",
    ocean_serenity: "from-[#1A4D5C] via-[#2A5D68] to-[#1C3D47]",
    sunset_warmth: "from-[#4D3A1F] via-[#5D4A2F] to-[#3D2A1A]",
    forest_peace: "from-[#2A4A3D] via-[#3A5A4D] to-[#1A3A2D]",
    moonlight_dreams: "from-[#2D1A5C] via-[#3D2A6C] to-[#1D0A4C]",
  };

  const currentGradient = isDarkMode ? darkGradients[theme] : themeGradients[theme];

  return (
    <>
      <style>{`
        :root {
          --glass-bg: ${isDarkMode ? 'rgba(40, 40, 50, 0.5)' : 'rgba(255, 255, 255, 0.15)'};
          --glass-border: ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.2)'};
          --glass-shadow: ${isDarkMode ? '0 8px 32px 0 rgba(0, 0, 0, 0.5)' : '0 8px 32px 0 rgba(31, 38, 135, 0.15)'};
          --text-primary: ${isDarkMode ? '#FFFFFF' : '#2D2D3A'};
          --text-secondary: ${isDarkMode ? '#E5E7EB' : '#6B7280'};
          --text-tertiary: ${isDarkMode ? '#D1D5DB' : '#9CA3AF'};
        }
        
        * {
          scroll-behavior: smooth;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          background: ${isDarkMode ? '#1a1a2e' : '#ffffff'};
          color: var(--text-primary);
          overflow-x: hidden;
        }
        
        .glass-card {
          background: var(--glass-bg);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          transition: all 0.3s ease;
        }
        
        .glass-nav {
          background: ${isDarkMode ? 'rgba(40, 40, 50, 0.6)' : 'rgba(255, 255, 255, 0.25)'};
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-top: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.3)'};
          box-shadow: ${isDarkMode ? '0 -4px 20px 0 rgba(0, 0, 0, 0.4)' : '0 -4px 20px 0 rgba(31, 38, 135, 0.1)'};
        }
        
        .nav-glow {
          box-shadow: 0 0 20px rgba(138, 79, 255, 0.4),
                      0 0 40px rgba(138, 79, 255, 0.2);
        }
        
        /* Smooth scrolling for all scrollable elements */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'};
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
          border-radius: 10px;
          transition: background 0.3s ease;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
        }
        
        /* Page transitions */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .page-content {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        /* Dark mode text improvements */
        .text-gray-900 {
          color: ${isDarkMode ? 'var(--text-primary)' : '#111827'} !important;
        }
        
        .text-gray-800 {
          color: ${isDarkMode ? 'var(--text-primary)' : '#1F2937'} !important;
        }
        
        .text-gray-700 {
          color: ${isDarkMode ? 'var(--text-secondary)' : '#374151'} !important;
        }
        
        .text-gray-600 {
          color: ${isDarkMode ? 'var(--text-tertiary)' : '#4B5563'} !important;
        }
        
        .text-gray-500 {
          color: ${isDarkMode ? 'var(--text-tertiary)' : '#6B7280'} !important;
        }
        
        /* Responsive container */
        @media (max-width: 640px) {
          .max-w-lg {
            max-width: 100%;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
        
        @media (min-width: 641px) and (max-width: 1024px) {
          .max-w-lg {
            max-width: 640px;
          }
        }
        
        @media (min-width: 1025px) {
          .max-w-lg {
            max-width: 672px;
          }
        }
      `}</style>

      <div className={`min-h-screen bg-gradient-to-br ${currentGradient} pb-20 transition-colors duration-300`}>
        <main className="relative page-content">
          {children}
        </main>

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 glass-nav z-50">
          <div className="max-w-lg mx-auto px-2 sm:px-4 py-3">
            <div className="flex justify-around items-center">
              {navItems.map((item) => {
                const isActive = currentPageName === item.path;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    to={createPageUrl(item.path)}
                    className="flex flex-col items-center gap-1 transition-all duration-300"
                  >
                    <div
                      className={`p-2 sm:p-2.5 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? "bg-gradient-to-r from-[#8A4FFF] to-[#56CFE1] nav-glow"
                          : isDarkMode
                            ? "bg-white/10 hover:bg-white/20"
                            : "bg-white/20 hover:bg-white/30"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                          isActive ? "text-white" : isDarkMode ? "text-gray-200" : "text-gray-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-xs font-medium transition-colors ${
                        isActive ? "text-[#8A4FFF]" : isDarkMode ? "text-gray-200" : "text-gray-600"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}