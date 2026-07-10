'use client';

import BeforeAfterSlider from '@/components/features/BeforeAfterSlider';

export default function BeforeAfterSliderExample() {
  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* ── Real Estate HDR ── */}
      <BeforeAfterSlider
        images={[
          {
            beforeImage: '/images/real-estate-raw.jpg',
            afterImage: '/images/real-estate-corrected.jpg',
            description: 'HDR editing for real estate interior.',
          },
          {
            beforeImage: '/images/Real-Estate-Single_Exposure-S-Raw-2.webp',
            afterImage: '/images/Real-Estate-Single_Exposure-S-Corrected-2.webp',
            description: 'Single exposure correction for property photo.',
          },
        ]}
        beforeLabel="Raw"
        afterLabel="HDR"
        sectionTitle="Watch"
        sectionTitleHighlight="HDR Transform"
        sectionSubtitle="See raw property photos transform into stunning HDR masterpieces."
        serviceName="HDR Basic"
        serviceDescription="Professional HDR photo editing for real estate — balanced exposure and vibrant detail."
        price="0.14"
        features={[
          'HDR Merging & Tone Mapping',
          'Exposure Correction',
          'Color Enhancement',
          'Shadow & Highlight Recovery',
          'White Balance Adjustment',
          'Natural HDR Look',
        ]}
        onAddToCart={() => alert('Added to cart!')}
        onViewMore={() => alert('View More')}
      />

      {/* ── Day to Dusk ── */}
      <BeforeAfterSlider
        images={[
          {
            beforeImage: '/images/Day-to-Dusk-SHP-Raw-1.webp',
            afterImage: '/images/Day-to-Dusk-SHP-Corrected-1.webp',
            description: 'Day to dusk conversion for luxury property.',
          },
        ]}
        beforeLabel="Day"
        afterLabel="Dusk"
        sectionTitle="Watch"
        sectionTitleHighlight="Time Transform"
        sectionSubtitle="See daytime property shots magically transform into beautiful dusk and twilight scenes."
        serviceName="Day to Dusk"
        serviceDescription="Professional day-to-dusk conversion for real estate property photography."
        price="0.16"
        features={[
          'Day to Dusk / Twilight',
          'Golden Hour Conversion',
          'Blue Hour Creation',
          'Window Glow Effect',
          'Sky Replacement',
          'Cinematic Lighting',
        ]}
        onAddToCart={() => alert('Added to cart!')}
        onViewMore={() => alert('View More')}
      />

      {/* ── Ghost Mannequin ── */}
      <BeforeAfterSlider
        images={[
          {
            beforeImage: '/images/Clipping-Path-HP-RAW-1.webp',
            afterImage: '/images/Clipping-Path-HP-Corrected-1.webp',
            description: 'Ghost mannequin removal for garment photography.',
          },
        ]}
        beforeLabel="With Mannequin"
        afterLabel="Ghost Effect"
        sectionTitle="See the"
        sectionTitleHighlight="Ghost Effect"
        sectionSubtitle="Real garment photos before and after the invisible mannequin technique."
        serviceName="Ghost Mannequin"
        serviceDescription="Professional invisible mannequin effect for all garment types."
        price="0.18"
        features={[
          'Mannequin & Hanger Removal',
          'Neck & Sleeve Joint Fix',
          '3D Hollow Body Shape',
          'White / Custom Background',
          'Color & Tone Correction',
          '24-Hour Delivery',
        ]}
        onAddToCart={() => alert('Added to cart!')}
        onViewMore={() => alert('View More')}
      />
    </div>
  );
}
