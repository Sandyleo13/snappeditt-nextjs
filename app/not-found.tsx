// app/not-found.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Search, AlertCircle, ArrowLeft,
  Compass, WifiOff, Ghost, Zap,
  Sparkles, Globe, Layers, Target,
  Navigation, RefreshCw, Clock, Users
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [particleCount, setParticleCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Suggested pages to navigate to
  const suggestedPages = [
    { name: 'Home', path: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'School Retouching', path: '/school-retouching', icon: <Users className="w-4 h-4" /> },
    { name: 'Sports Retouching', path: '/sports', icon: <Target className="w-4 h-4" /> },
    { name: 'Fashion Retouching', path: '/fashion-retouching', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Clipping Path', path: '/clipping-path', icon: <Layers className="w-4 h-4" /> },
    { name: 'Image Extraction', path: '/extraction', icon: <Zap className="w-4 h-4" /> },
  ];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      // Simulate search delay
      setTimeout(() => {
        setIsSearching(false);
        // Here you could implement actual search functionality
        alert(`Searching for: ${searchQuery}`);
      }, 1500);
    }
  };

  // Animated 404 Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create particles for the 404 animation
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      type: 'number' | 'glitch' | 'error';
      value: string;
    }> = [];

    // Initialize particles
    const initParticles = () => {
      particles.length = 0;
      
      // Create number particles (4, 0, 4)
      for (let i = 0; i < 3; i++) {
        const value = i === 0 ? '4' : i === 1 ? '0' : '4';
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 40 + 20,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: i === 1 ? 'rgba(59, 130, 246, 0.9)' : 'rgba(96, 165, 250, 0.9)',
          alpha: 0.8,
          type: 'number',
          value
        });
      }
      
      // Create glitch particles
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 3,
          speedY: (Math.random() - 0.5) * 3,
          color: 'rgba(255, 255, 255, 0.8)',
          alpha: Math.random() * 0.5 + 0.3,
          type: 'glitch',
          value: Math.random() > 0.5 ? '1' : '0'
        });
      }
      
      // Create error particles
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: 'rgba(239, 68, 68, 0.8)',
          alpha: Math.random() * 0.5 + 0.3,
          type: 'error',
          value: 'ERR'
        });
      }
      
      setParticleCount(particles.length);
    };

    initParticles();

    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a'); // Dark blue
      gradient.addColorStop(0.3, '#1e293b'); // Blue gray
      gradient.addColorStop(0.5, '#1e40af'); // Deep blue
      gradient.addColorStop(0.7, '#3b82f6'); // Bright blue
      gradient.addColorStop(0.9, '#60a5fa'); // Light blue
      gradient.addColorStop(1, '#93c5fd'); // Sky blue
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid pattern
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 0.5;
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw broken connection lines
      for (let i = 0; i < 10; i++) {
        const startX = Math.random() * canvas.width;
        const startY = Math.random() * canvas.height;
        const length = 100 + Math.random() * 100;
        const breaks = 3 + Math.floor(Math.random() * 3);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        
        for (let j = 0; j < breaks; j++) {
          const segmentLength = length / breaks;
          const endX = startX + Math.cos(Math.PI/4) * segmentLength * (j + 1);
          const endY = startY + Math.sin(Math.PI/4) * segmentLength * (j + 1);
          
          // Draw segment with gap
          ctx.lineTo(endX - 10, endY - 10);
          ctx.strokeStyle = 'rgba(96, 165, 250, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Draw gap
          ctx.beginPath();
          ctx.arc(endX, endY, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
          ctx.fill();
          
          // Start new segment
          ctx.beginPath();
          ctx.moveTo(endX + 10, endY + 10);
        }
      }
      
      // Draw and update particles
      const time = Date.now() * 0.001;
      
      particles.forEach(particle => {
        if (particle.type === 'number') {
          // Large number particles
          const pulse = Math.sin(time * 2 + particle.x * 0.01) * 0.2 + 0.8;
          
          ctx.save();
          ctx.translate(particle.x, particle.y);
          
          // Number glow
          ctx.beginPath();
          ctx.arc(0, 0, particle.size * 1.5, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 1.5);
          glowGradient.addColorStop(0, particle.color.replace('0.9', (particle.alpha * 0.5 * pulse).toString()));
          glowGradient.addColorStop(1, particle.color.replace('0.9', '0'));
          ctx.fillStyle = glowGradient;
          ctx.fill();
          
          // Number
          ctx.fillStyle = particle.color.replace('0.9', particle.alpha.toString());
          ctx.font = `bold ${particle.size}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.value, 0, 0);
          
          // Number outline
          ctx.strokeStyle = `rgba(255, 255, 255, ${particle.alpha * 0.8})`;
          ctx.lineWidth = 2;
          ctx.strokeText(particle.value, 0, 0);
          
          ctx.restore();
          
        } else if (particle.type === 'glitch') {
          // Binary glitch particles
          const glitch = Math.sin(time * 5 + particle.x * 0.01) > 0;
          
          if (glitch) {
            ctx.save();
            ctx.translate(particle.x, particle.y);
            
            // Glitch effect
            ctx.fillStyle = particle.color.replace('0.8', particle.alpha.toString());
            ctx.font = `${particle.size}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(particle.value, 0, 0);
            
            // Glitch trail
            for (let i = 0; i < 2; i++) {
              ctx.fillStyle = particle.color.replace('0.8', (particle.alpha * (0.3 - i * 0.1)).toString());
              ctx.fillText(particle.value, i * 2, i * 2);
            }
            
            ctx.restore();
          }
          
        } else {
          // Error particles
          const errorPulse = Math.sin(time * 3 + particle.x * 0.01) * 0.5 + 0.5;
          
          ctx.save();
          ctx.translate(particle.x, particle.y);
          
          // Error text
          ctx.fillStyle = particle.color.replace('0.8', (particle.alpha * errorPulse).toString());
          ctx.font = `${particle.size}px monospace`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(particle.value, 0, 0);
          
          // Error cross
          ctx.beginPath();
          ctx.moveTo(-particle.size, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.moveTo(particle.size, -particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.strokeStyle = particle.color.replace('0.8', (particle.alpha * 0.5).toString());
          ctx.lineWidth = 1;
          ctx.stroke();
          
          ctx.restore();
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
          // Add some glitch effect on bounce
          if (particle.type === 'number') {
            particle.x = Math.max(0, Math.min(canvas.width, particle.x));
          }
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
          if (particle.type === 'number') {
            particle.y = Math.max(0, Math.min(canvas.height, particle.y));
          }
        }
      });
      
      // Draw "404" in center with glitch effect
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 3;
      
      // Main 404 text with glitch
      const glitchOffset = Math.sin(time * 10) * 3;
      
      // Red glitch layer
      ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
      ctx.font = 'bold 120px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('404', centerX + glitchOffset, centerY + glitchOffset);
      
      // Blue glitch layer
      ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.fillText('404', centerX - glitchOffset, centerY - glitchOffset);
      
      // Main text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('404', centerX, centerY);
      
      // Outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
      ctx.lineWidth = 3;
      ctx.strokeText('404', centerX, centerY);
      
      // Draw "PAGE NOT FOUND" text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = 'bold 36px system-ui';
      ctx.fillText('PAGE NOT FOUND', centerX, centerY + 80);
      
      // Draw broken link symbol
      const linkX = centerX;
      const linkY = centerY + 140;
      
      ctx.beginPath();
      ctx.arc(linkX, linkY, 30, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Chain links
      ctx.beginPath();
      ctx.arc(linkX - 20, linkY, 8, 0, Math.PI * 2);
      ctx.arc(linkX + 20, linkY, 8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(96, 165, 250, 0.8)';
      ctx.fill();
      
      // Broken chain
      ctx.beginPath();
      ctx.moveTo(linkX - 10, linkY);
      ctx.lineTo(linkX + 10, linkY);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle back button
  const handleGoBack = () => {
    router.back();
  };

  // Handle reload
  const handleReload = () => {
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated Background */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: 'screen' }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-black/40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-black shadow-2xl shadow-blue-500/50 flex items-center justify-center">
            <Ghost className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="absolute bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-black shadow-2xl shadow-blue-500/50 flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Error Content */}
            <div className="text-center mb-16">
              {/* Animated 404 Display */}
              <div className="relative mb-8">
                <div className="text-9xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-blue-400 via-white to-blue-600 bg-clip-text text-transparent animate-pulse">
                    404
                  </span>
                </div>
                
                {/* Glitch Effect Overlay */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-9xl font-bold opacity-20 animate-glitch">
                  <span className="text-red-400">404</span>
                </div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-9xl font-bold opacity-20 animate-glitch-reverse" style={{ animationDelay: '0.5s' }}>
                  <span className="text-blue-400">404</span>
                </div>
                
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                  <AlertCircle className="w-8 h-8 text-red-400 animate-pulse" />
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Page <span className="bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent">Not Found</span>
              </h1>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                The page you're looking for seems to have wandered off into the digital void. 
                Don't worry, we'll help you find your way back.
              </p>
              
              {/* Particle Counter */}
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">
                  {particleCount} Error Particles Detected
                </span>
              </div>
            </div>

            {/* Search Box */}
            <div className="bg-gradient-to-br from-blue-600/10 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 mb-12 shadow-2xl">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white text-center mb-6 flex items-center justify-center gap-3">
                  <Search className="w-6 h-6 text-blue-400" />
                  Search Our Website
                </h3>
                
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-black text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSearching ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          Search
                        </>
                      )}
                    </button>
                  </div>
                </form>
                
                <p className="text-gray-400 text-sm text-center mt-4">
                  Try searching for services like "school retouching" or "clipping path"
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleGoBack}
                className="group bg-gradient-to-r from-blue-600 to-black text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-gray-900 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>
              
              <Link
                href="/"
                className="group bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10"
              >
                <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Go Home
              </Link>
              
              <button
                onClick={handleReload}
                className="group bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-blue-800 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/30"
              >
                <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                Reload Page
              </button>
            </div>

            {/* Suggested Pages */}
            <div className="bg-gradient-to-br from-blue-600/10 to-black/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white text-center mb-8 flex items-center justify-center gap-3">
                <Navigation className="w-6 h-6 text-blue-400" />
                Suggested Pages
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {suggestedPages.map((page, index) => (
                  <Link
                    key={index}
                    href={page.path}
                    className="group bg-white/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-black/20 flex items-center justify-center group-hover:from-blue-600/30 group-hover:to-black/30 transition-colors">
                        <div className="text-blue-400 group-hover:text-blue-300 transition-colors">
                          {page.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {page.name}
                        </h4>
                        <p className="text-gray-400 text-sm">Click to navigate</p>
                      </div>
                      <ArrowLeft className="w-5 h-5 text-blue-400 ml-auto transform rotate-180 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-2 mb-4">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 text-sm">Need Immediate Help?</span>
              </div>
              
              <p className="text-gray-300 mb-6">
                If you continue to experience issues, please contact our support team
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@example.com"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-black text-white rounded-lg font-semibold hover:from-blue-700 hover:to-gray-900 transition-all inline-flex items-center justify-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  Email Support
                </a>
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                >
                  Contact Form
                </a>
              </div>
            </div>

            {/* Debug Info (Fun element) */}
            <div className="mt-16 p-6 bg-black/20 backdrop-blur-sm rounded-2xl border border-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center gap-2">
                  <WifiOff className="w-5 h-5 text-red-400" />
                  Debug Information
                </h4>
                <span className="text-xs text-gray-400 px-3 py-1 bg-red-500/20 rounded-full">
                  DEBUG MODE
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="text-sm text-gray-400">Status Code</div>
                  <div className="text-xl font-bold text-red-400">404</div>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="text-sm text-gray-400">Particles</div>
                  <div className="text-xl font-bold text-blue-400">{particleCount}</div>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="text-sm text-gray-400">Connection</div>
                  <div className="text-xl font-bold text-yellow-400">Lost</div>
                </div>
                <div className="p-4 bg-black/30 rounded-lg">
                  <div className="text-sm text-gray-400">Recovery</div>
                  <div className="text-xl font-bold text-green-400">Ready</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-black/40 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Error Message:</div>
                <div className="font-mono text-sm text-gray-300">
                  <span className="text-red-400">GET</span> /{typeof window !== 'undefined' ? window.location.pathname.substring(1) : 'unknown'} 
                  <span className="text-yellow-400"> 404 Not Found</span> - Resource does not exist
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Photo Retouching Services. All rights reserved.
              <span className="mx-2">•</span>
              Error 404 - Page Not Found
            </p>
          </div>
        </div>
      </section>

      {/* Custom Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes glitch {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(-3px, 3px);
          }
          40% {
            transform: translate(-3px, -3px);
          }
          60% {
            transform: translate(3px, 3px);
          }
          80% {
            transform: translate(3px, -3px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .animate-glitch {
          animation: glitch 0.3s linear infinite;
        }
        
        @keyframes glitch-reverse {
          0% {
            transform: translate(0);
          }
          20% {
            transform: translate(3px, -3px);
          }
          40% {
            transform: translate(3px, 3px);
          }
          60% {
            transform: translate(-3px, -3px);
          }
          80% {
            transform: translate(-3px, 3px);
          }
          100% {
            transform: translate(0);
          }
        }
        
        .animate-glitch-reverse {
          animation: glitch-reverse 0.3s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}