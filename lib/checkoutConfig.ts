// Centralized checkout configuration for all services
export interface ServiceCheckoutConfig {
  serviceName: string;
  serviceTitle: string;
  pageTitle: string;
  pageDescription: string;
  sidebarTitle: string;
  sidebarDescription: string;
  steps: string[];
  addons: Addon[];
  basePrice: number;
}

export interface Addon {
  name: string;
  price: number;
}

export const CHECKOUT_CONFIG: Record<string, ServiceCheckoutConfig> = {
  // Real Estate Services
  'hdr-basic': {
    serviceName: 'hdr-basic',
    serviceTitle: 'HDR Basic',
    pageTitle: 'Checkout – HDR Basic | Snappeditt',
    pageDescription: 'Customize your HDR Basic photo editing order with add-ons.',
    sidebarTitle: 'HDR Basic Checkout',
    sidebarDescription: 'This service is suitable for clients who need perfect and natural color tone. Our professional editors work with modern digital tools to provide the best possible result.',
    steps: ['Color Correction', 'Color Cast Removal – Minimal', 'Lens Correction', 'Perspective Correction', 'Sharpening', 'Output: JPEG, TIFF, PSD'],
    basePrice: 2.5,
    addons: [
      { name: 'Indoor Sky Replacement', price: 0.15 },
      { name: 'Outdoor Sky Replacement', price: 0.25 },
      { name: 'Window Masking', price: 0.40 },
      { name: 'Grass Replacement', price: 0.40 },
      { name: 'Grass Color Enhancement', price: 0.20 },
      { name: 'Reflection Removal', price: 0.50 },
      { name: 'Add TV Images', price: 0.15 },
      { name: 'Add Fire To Fireplace', price: 0.15 },
      { name: 'Color Cast Removal', price: 1.0 },
    ],
  },
  'uav-retouching': {
    serviceName: 'uav-retouching',
    serviceTitle: 'UAV Retouching',
    pageTitle: 'Checkout – UAV Retouching | Snappeditt',
    pageDescription: 'Customize your UAV Retouching photo editing order with add-ons.',
    sidebarTitle: 'UAV Retouching Checkout',
    sidebarDescription: 'Transform raw drone footage into professional aerial masterpieces. Our expert editors enhance clarity, correct distortions, and perfect every aerial shot using advanced AI technology.',
    steps: ['Atmospheric Haze Removal', 'Color Grading', 'Perspective Correction', 'Noise Reduction', 'Detail Enhancement', 'Output: PNG, TIFF, RAW'],
    basePrice: 3.0,
    addons: [
      { name: 'Orthomosaic Processing', price: 0.50 },
      { name: 'Advanced Color Grading', price: 0.75 },
      { name: 'Shadow Recovery', price: 0.30 },
      { name: 'HDR Blending', price: 0.60 },
      { name: 'GIS Export', price: 1.0 },
    ],
  },
  'digital-declutter': {
    serviceName: 'digital-declutter',
    serviceTitle: 'Digital Declutter',
    pageTitle: 'Checkout – Digital Declutter | Snappeditt',
    pageDescription: 'Customize your Digital Declutter photo editing order with add-ons.',
    sidebarTitle: 'Digital Declutter Checkout',
    sidebarDescription: 'Transform digital chaos into organized perfection. Our AI-powered system magically organizes files, removes duplicates, and creates order from digital mess.',
    steps: ['File Organization', 'Duplicate Detection', 'Metadata Cleaning', 'Backup Creation', 'Archive Optimization', 'Output: Organized Structure'],
    basePrice: 5.0,
    addons: [
      { name: 'Cloud Backup Integration', price: 0.50 },
      { name: 'Face Recognition Organization', price: 0.75 },
      { name: 'Advanced Deduplication', price: 0.40 },
      { name: 'Metadata Recovery', price: 0.30 },
      { name: 'Custom Tagging', price: 0.60 },
    ],
  },
  'hdr-preminum': {
    serviceName: 'hdr-preminum',
    serviceTitle: 'HDR Premium',
    pageTitle: 'Checkout – HDR Premium | Snappeditt',
    pageDescription: 'Customize your HDR Premium photo editing order with add-ons.',
    sidebarTitle: 'HDR Premium Checkout',
    sidebarDescription: 'Premium HDR processing for professional photographers. Includes advanced tone mapping, color science, and creative enhancements for stunning results.',
    steps: ['Advanced Color Correction', 'Tone Mapping', 'Saturation Enhancement', 'Shadow/Highlight Balancing', 'Detail Sharpening', 'Output: JPEG, TIFF, PSD'],
    basePrice: 4.0,
    addons: [
      { name: 'Surreal HDR Effect', price: 0.50 },
      { name: 'Custom Color Grading', price: 0.75 },
      { name: 'Extreme Detail Enhancement', price: 0.60 },
      { name: 'Artistic Style Transfer', price: 1.0 },
    ],
  },
  // Commercial Services
  'ghost-mannequin': {
    serviceName: 'ghost-mannequin',
    serviceTitle: 'Ghost Mannequin',
    pageTitle: 'Checkout – Ghost Mannequin | Snappeditt',
    pageDescription: 'Customize your Ghost Mannequin photo editing order with add-ons.',
    sidebarTitle: 'Ghost Mannequin Checkout',
    sidebarDescription: 'Professional ghost mannequin removal. Create perfect product photos with hollow body effect for apparel and fashion photography.',
    steps: ['Mannequin Removal', 'Seamless Body Assembly', 'Background Cleanup', 'Color Correction', 'Shadow Placement', 'Output: PNG with Transparent Background'],
    basePrice: 3.5,
    addons: [
      { name: 'Background Removal', price: 0.25 },
      { name: 'Color Enhancement', price: 0.40 },
      { name: 'Shadow Creation', price: 0.30 },
      { name: 'Advanced Retouching', price: 0.60 },
    ],
  },
  // 3D Services
  '3d-floor-plan': {
    serviceName: '3d-floor-plan',
    serviceTitle: '3D Floor Plan',
    pageTitle: 'Checkout – 3D Floor Plan | Snappeditt',
    pageDescription: 'Customize your 3D Floor Plan rendering order with add-ons.',
    sidebarTitle: '3D Floor Plan Checkout',
    sidebarDescription: 'Professional 3D floor plan creation from your photos. Perfect for real estate listings and property marketing.',
    steps: ['Photo Analysis', 'Measurement Extraction', '3D Modeling', 'Texture Mapping', 'Lighting Setup', 'Output: High-Resolution 3D Model'],
    basePrice: 8.0,
    addons: [
      { name: 'Virtual Staging', price: 2.0 },
      { name: 'Interactive 3D Tour', price: 3.0 },
      { name: 'Multiple Angle Views', price: 1.0 },
      { name: 'Animation Rendering', price: 2.5 },
    ],
  },
  // Add more services as needed...
};

export const getCheckoutConfig = (serviceId: string): ServiceCheckoutConfig | null => {
  return CHECKOUT_CONFIG[serviceId] || null;
};

export const getAllServices = (): string[] => {
  return Object.keys(CHECKOUT_CONFIG);
};
