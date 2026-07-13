"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import {
  Upload,
  Image as ImageIcon,
  Wand2,
  Zap,
  Shield,
  Cloud,
  CheckCircle,
  X,
  Loader2,
  Sparkles,
  FileImage,
  MousePointerClick,
  AlertCircle,
  Star,
  Download,
  Share2,
  Copy,
  Eye,
  Sun,
  Home,
  Heart,
  Scissors,
  Camera,
  Briefcase,
  Smartphone,
  GraduationCap
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function FreeTrialUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processedImages, setProcessedImages] = useState<string[]>([]);
  const [selectedService, setSelectedService] = useState("day-to-dusk");
  const [email, setEmail] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const uploadAreaRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: "day-to-dusk",
      name: "Day to Dusk",
      icon: Sun,
      description: "Transform daytime to golden hour",
      estimatedTime: "2-3 minutes",
      color: "from-white-500 to-red-600"
    },
    {
      id: "real-estate",
      name: "Real Estate",
      icon: Home,
      description: "Professional property enhancement",
      estimatedTime: "3-4 minutes",
      color: "from-white-500 to-red-600"
    },
    {
      id: "wedding",
      name: "Wedding Album",
      icon: Heart,
      description: "Magical wedding photo editing",
      estimatedTime: "4-5 minutes",
      color: "from-white-500 to-red-600"
    },
    {
      id: "sky-replacement",
      name: "Sky Replacement",
      icon: Cloud,
      description: "Replace dull skies dramatically",
      estimatedTime: "1-2 minutes",
      color: "from-white-500 to-red-600"
    },
    {
      id: "extraction",
      name: "Extraction",
      icon: Scissors,
      description: "Clean object removal & background change",
      estimatedTime: "3-4 minutes",
      color: "from-white-500 to-red-600"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure Upload",
      description: "Your images are encrypted and never shared"
    },
    {
      icon: Zap,
      title: "Fast Processing",
      description: "AI-powered editing in minutes"
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Access edited photos anywhere for 7 days"
    },
    {
      icon: CheckCircle,
      title: "Quality Guarantee",
      description: "Professional results or your money back"
    }
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    // Limit to 5 files
    const newFiles = files.slice(0, 5 - uploadedFiles.length);
    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Animate upload area
    if (uploadAreaRef.current) {
      gsap.fromTo(uploadAreaRef.current,
        { scale: 0.95, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.3 }
      );
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const simulateProcessing = () => {
    if (uploadedFiles.length === 0) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsProcessing(false);
            // Generate mock processed images
            const mockProcessed = Array(uploadedFiles.length).fill("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop");
            setProcessedImages(mockProcessed);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateProcessing();
  };

  const downloadAllImages = () => {
    alert("In a real app, this would download all processed images as a ZIP file");
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Edited Photos from SnapEdit',
        text: 'Check out these professionally edited photos!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const openPreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setShowPreview(true);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section entrance
      gsap.fromTo(
        ".animate-on-scroll",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate features
      gsap.fromTo(
        ".feature-card",
        {
          scale: 0.9,
          opacity: 0,
          y: 30,
        },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top center",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
       <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#f3f4f6]"
    >
      <div className="absolute inset-0 bg-[#f3f4f6]" />

      <div className="relative max-w-7xl mx-auto py-12">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
            Try <span className="text-[#F44336]">SnappEditt AI</span> Free
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Upload your photos and experience professional AI editing. No sign-up required.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
          <div className="space-y-8">
            <div className="features-grid space-y-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="feature-card">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[#F44336]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-600">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-red-50 rounded-2xl p-6 shadow-sm border border-red-200">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-red-600" /> Free Trial Includes
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F44336]" /><span className="text-slate-600">Up to 5 images</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F44336]" /><span className="text-slate-600">All editing services</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F44336]" /><span className="text-slate-600">7-day access</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F44336]" /><span className="text-slate-600">No watermark</span></li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#F44336]" /><span className="text-slate-600">Full resolution</span></li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  {['Upload', 'Edit', 'Download'].map((step, index) => (
                    <div key={step} className="flex items-center" />
                  ))}
                </div>
              </div>

              <div className="p-6 md:p-8">
                {processedImages.length === 0 ? (
                  <>
                    <div className="mb-8">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Select Editing Service</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {services.map((service) => {
                          const IconComponent = service.icon;
                          return (
                            <button
                              key={service.id}
                              onClick={() => setSelectedService(service.id)}
                              className={`group p-3 rounded-xl border-2 transition-all duration-300 ${selectedService === service.id ? 'border-red-600 bg-red-50' : 'border-slate-300 bg-white hover:border-red-400 hover:bg-red-50'}`}>
                              <div className="mb-2 flex justify-center">
                                <IconComponent className="w-6 h-6 text-[#F44336]" />
                              </div>
                              <div className={`text-sm font-medium ${selectedService === service.id ? 'text-red-700' : 'text-slate-900'}`}>{service.name}</div>
                              <div className="text-xs text-slate-600 mt-1">{service.estimatedTime}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div
                      ref={uploadAreaRef}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative mb-8 rounded-2xl border-3 border-dashed transition-all duration-300 cursor-pointer ${isDragging ? 'border-[#F44336] bg-[#F44336] scale-105' : 'border-slate-300 hover:border-[#F44336] hover:bg-slate-50'} ${uploadedFiles.length > 0 ? 'h-auto' : 'h-64'}`}
                    >
                      <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" />
                      {uploadedFiles.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                          <div className="w-20 h-20 rounded-full bg-[#F44336]/10 flex items-center justify-center mb-4"><Upload className="w-10 h-10 text-[#F44336]" /></div>
                          <h3 className="text-xl font-bold text-slate-900 mb-2">Drag & Drop Your Images</h3>
                          <p className="text-slate-600 text-center mb-4">or click to browse. Supports JPG, PNG, WEBP</p>
                          <div className="flex items-center gap-2 text-sm text-slate-600"><MousePointerClick className="w-4 h-4" /><span>Max 5 images • Up to 10MB each</span></div>
                        </div>
                      ) : (
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-slate-900">Selected Images ({uploadedFiles.length}/5)</h3>
                            <button onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }} className="text-sm text-red-600 hover:text-[#F44336] font-medium">+ Add More</button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100"><div className="w-full h-full flex items-center justify-center"><ImageIcon className="w-12 h-12 text-slate-400" /></div></div>
                                <div className="mt-2 text-xs text-slate-600 truncate">{file.name.length > 15 ? `${file.name.substring(0,12)}...` : file.name}</div>
                                <button onClick={(e)=>{ e.stopPropagation(); removeFile(index); }} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border-2 border-[#F44336] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3 text-[#F44336]" /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email for results (optional)</label>
                      <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 focus:border-[#F44336] focus:ring-2 focus:ring-[#F44336]/20 outline-none transition-all" />
                      <p className="text-sm text-slate-600 mt-2">We'll send your edited photos here. No spam, ever.</p>
                    </div>

                    <button onClick={handleSubmit} disabled={uploadedFiles.length === 0 || isProcessing} className="group relative w-full py-4 bg-[#F44336] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#F44336]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E53935]">
                      {isProcessing ? (<div className="flex items-center justify-center gap-3"><Loader2 className="w-5 h-5 animate-spin" /> <span>Processing {processingProgress}%</span></div>) : (<span className="relative z-10 flex items-center justify-center gap-3"><Sparkles className="w-5 h-5" /> Process {uploadedFiles.length} Image{uploadedFiles.length !== 1 ? 's' : ''} Free</span>)}
                    </button>
                  </>
                ) : (
                  <div className="animate-on-scroll">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F44336] mb-4"><CheckCircle className="w-8 h-8 text-white" /></div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Photos Are Ready!</h3>
                      <p className="text-slate-600">AI has transformed your {uploadedFiles.length} image{uploadedFiles.length !== 1 ? 's' : ''}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                      {processedImages.map((img, index) => (
                        <div key={index} className="group relative">
                          <div onClick={() => openPreview(img)} className="aspect-square rounded-xl overflow-hidden bg-[#F44336]/10 cursor-pointer hover:scale-105 transition-transform duration-300">
                            <div className="w-full h-full flex items-center justify-center"><div className="text-center"><div className="w-12 h-12 rounded-full bg-[#F44336] flex items-center justify-center mx-auto mb-2"><Eye className="w-6 h-6 text-white" /></div><span className="text-sm font-medium text-slate-900">Edited</span></div></div>
                          </div>
                          <div className="mt-2 text-xs text-slate-600 text-center">{uploadedFiles[index]?.name.length > 15 ? `${uploadedFiles[index]?.name.substring(0,12)}...` : uploadedFiles[index]?.name}</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button onClick={downloadAllImages} className="group relative py-3 px-6 bg-[#F44336] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F44336]/30 transition-all hover:bg-[#E53935]"><span className="relative z-10 flex items-center justify-center gap-2"><Download className="w-4 h-4" /> Download All</span></button>
                      <button onClick={shareResults} className="py-3 px-6 bg-white text-slate-900 font-semibold rounded-xl border-2 border-slate-300 hover:border-[#F44336] transition-all"><span className="flex items-center justify-center gap-2"><Share2 className="w-4 h-4" /> Share Results</span></button>
                      <button onClick={() => { setUploadedFiles([]); setProcessedImages([]); setEmail(""); }} className="py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all"><span className="flex items-center justify-center gap-2"><Upload className="w-4 h-4" /> Edit More</span></button>
                    </div>
                  </div>
                )}

                {isProcessing && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-slate-700">AI is processing your images...</span><span className="text-sm font-bold text-[#F44336]">{processingProgress}%</span></div>
                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden"><div className="h-full bg-[#F44336] transition-all duration-300" style={{ width: `${processingProgress}%` }} /></div>
                    <div className="flex items-center gap-2 mt-3 text-sm text-slate-600"><Sparkles className="w-4 h-4" /><span>Applying {services.find(s => s.id === selectedService)?.name} magic</span></div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 bg-[#F44336]/10 rounded-2xl p-6 border border-[#F44336]/30">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-[#F44336] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">How Our Free Trial Works</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Upload up to 5 images (max 10MB each)</li>
                    <li>• Choose any editing service</li>
                    <li>• Get AI-enhanced results in minutes</li>
                    <li>• Download full-resolution images</li>
                    <li>• No credit card or sign-up required</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16 animate-on-scroll">
          <p className="text-slate-700 mb-6">Trusted by professionals worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[{ icon: Camera, label: 'Photographers' },{ icon: Home, label: 'Real Estate Agents' },{ icon: Briefcase, label: 'Businesses' },{ icon: Smartphone, label: 'Social Media Creators' },{ icon: GraduationCap, label: 'Students' }].map((badge) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-2 text-slate-700"><BadgeIcon className="w-4 h-4 text-[#F44336]" /><span>{badge.label}</span></div>
              );
            })}
          </div>
        </div>
      </div>

      {showPreview && previewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button onClick={() => setShowPreview(false)} className="w-10 h-10 rounded-full bg-slate-600 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="h-full flex items-center justify-center p-8">
              <div className="text-center">
                <div className="w-32 h-32 rounded-2xl bg-[#F44336] flex items-center justify-center mx-auto mb-6 hover:bg-[#E53935] hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[#F44336]/50"><FileImage className="w-16 h-16 text-white" /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Edited Image Preview</h3>
                <p className="text-slate-600 mb-6">In the full version, you would see the actual edited image here</p>
                <button onClick={() => setShowPreview(false)} className="px-6 py-3 bg-[#F44336] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#F44336]/30 transition-all hover:bg-[#E53935]">Close Preview</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section> 
  );
}