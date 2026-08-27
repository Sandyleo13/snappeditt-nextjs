import BeforeAfterSection from "../components/features/BeforeAfterSection";
import { ClientReviewsSection } from "../components/features/ClientReviews";
import HeroPeel from "../components/features/HeroPeel";
import EnrollStep from "../components/features/EnrollStep";
import FreeTrialPrompt from "../components/features/FreeTrialPrompt";

export const metadata = {
  title: "Snappeditt - Professional Photo Editing Services",
  description:
    "Professional photo editing services for real estate, wedding, ecommerce, product, portrait, and commercial photography. Try Snapedit free.",
};

export default function Home() {
  return (
    <>
      <HeroPeel />

      <BeforeAfterSection />

      <EnrollStep />

      <ClientReviewsSection />

      <FreeTrialPrompt />
    </>
  );
}