import BeforeAfterSection from "../../components/features/BeforeAfterSection";
import { ClientReviewsSection } from "../../components/features/ClientReviews";
import { FreeTrialUpload } from "../../components/features/FreeTrial";
import HeroPeel from "../../components/features/HeroPeel";
import EnrollStep from "../../components/features/EnrollStep";

export default function FeaturesPage() {
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
