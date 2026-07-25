import BeforeAfterSection from "../components/features/BeforeAfterSection";
import { ClientReviewsSection } from "../components/features/ClientReviews";
import { FreeTrialUpload } from "../components/features/FreeTrial";
import HeroPeel from "../components/features/HeroPeel";
import EnrollStep from "../components/features/EnrollStep";
// import UnbreakableTrust from "@/components/features/UnbreakableTrust";

export const metadata = {
  title: "Snappeditt - Home",
  description: "Discover the features of Snappeditt, including before-and-after comparisons, client reviews, and more.",
};

export default function Home() {
  return (
    <>
      <HeroPeel />
      <BeforeAfterSection />
      <FreeTrialUpload />
      <EnrollStep />
      <ClientReviewsSection />
    </>
  );
}
