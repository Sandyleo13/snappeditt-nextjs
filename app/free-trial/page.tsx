import type { Metadata } from "next";
import FreeTrialForm from "@/components/features/FreeTrialForm";

export const metadata: Metadata = {
  title: "Free Trial | Snappeditt",
  description:
    "Fill out the free trial request form to start your AI photo editing experience.",
};

export default function FreeTrialPage() {
  return <FreeTrialForm />;
}
