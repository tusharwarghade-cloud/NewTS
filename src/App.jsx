import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import ScrollHero from "./components/ScrollHero";
import IndustrySolutions from "./components/IndustrySolutions";
import BankingSolution from "./pages/BankingSolution";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FinTechSolution from "./pages/FinTechSolution";
import FinTechDetailPage from "./pages/FinTechDetailPage";
import RealEstateSolution from "./pages/RealEstateSolution";
import TSAISolution from "./pages/TSAISolution";
import ServicesPage from "./pages/ServicesPage";
import LabsPage from "./pages/LabsPage";
import CareerPage from "./pages/CareerPage";
import JobDetailPage from "./pages/JobDetailPage";

function useHash() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const handler = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  return hash;
}

function navigate(to) {
  window.location.hash = to;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function App() {
  const hash = useHash();

  // Fintech detail pages
  const fintechDetails = {
    "#fintech-digital-lending":   "digital-lending",
    "#fintech-wealth-management": "wealth-management",
    "#fintech-payments":          "payments",
    "#fintech-investment-trading":"investment-trading",
    "#fintech-neo-banking":       "neo-banking",
    "#fintech-embedded-finance":  "embedded-finance",
  };
  if (fintechDetails[hash]) {
    return (
      <>
        <Navbar />
        <FinTechDetailPage solutionKey={fintechDetails[hash]} />
      </>
    );
  }

  // Job detail page
  if (hash.startsWith("#career-job-")) {
    const slug = hash.replace("#career-job-", "");
    return (
      <>
        <Navbar />
        <JobDetailPage slug={slug} />
      </>
    );
  }

  // Careers page
  if (hash === "#careers") {
    return (
      <>
        <Navbar />
        <CareerPage />
      </>
    );
  }

  // Labs page
  if (hash === "#stalwarts-lab") {
    return (
      <>
        <Navbar />
        <LabsPage />
      </>
    );
  }

  // Services page
  if (hash === "#services") {
    return (
      <>
        <Navbar />
        <ServicesPage />
      </>
    );
  }

  // TS AI page
  if (hash === "#ts-ai") {
    return (
      <>
        <Navbar />
        <TSAISolution />
      </>
    );
  }

  // Real Estate solution page
  if (hash === "#solution-real-estate") {
    return (
      <>
        <Navbar />
        <RealEstateSolution />
      </>
    );
  }

  // Fintech main page
  if (hash === "#solution-fintech") {
    return (
      <>
        <Navbar />
        <FinTechSolution onNavigate={navigate} />
      </>
    );
  }

  // Banking solution detail page
  if (hash === "#solution-detail-banking-nbfc") {
    return (
      <>
        <Navbar />
        <BankingSolution onBack={() => navigate("")} />
      </>
    );
  }

  // Contact page
  if (hash === "#contact") {
    return (
      <>
        <Navbar />
        <ContactPage />
      </>
    );
  }

  // About page
  if (hash === "#about") {
    return (
      <>
        <Navbar />
        <AboutPage />
      </>
    );
  }

  // Industry Solutions page
  if (hash === "#solutions") {
    return (
      <>
        <Navbar />
        <ScrollHero />
        <IndustrySolutions />
      </>
    );
  }

  // Default: Homepage
  return (
    <>
      <Navbar />
      <HomePage onNavigate={navigate} />
    </>
  );
}
