"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import FloatContact from "./floatContact";
import CatalogSection from "../sections/CatalogSection";
import ContactSection from "../sections/ContactSection";
import FooterSection from "./FooterSection";
import HeaderSection from "./HeaderSection";
import HeroSection from "../sections/HeroSection";
import MetricsSection from "../sections/MetricsSection";
import QuickDialog from "../sections/QuickDialog";
import RentalSection from "../sections/RentalSection";
import ResultsSection from "../sections/ResultsSection";
import ReviewsSection from "../sections/ReviewsSection";
import ServicesSection from "../sections/ServicesSection";
import {
  estimateServicePrice,
  emptyLead,
  navigation,
  type LeadFields,
  type ModalState,
  type Product,
  type Service,
} from "../../data/data";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [selectedCity, setSelectedCity] = useState("Jabode");
  const [modal, setModal] = useState<ModalState>(null);
  const [installIncluded, setInstallIncluded] = useState(false);
  const [eventType, setEventType] = useState("Dalam ruang");
  const [lead, setLead] = useState<LeadFields>(emptyLead);
  const [submittedLead, setSubmittedLead] = useState<LeadFields | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (current?.target.id) setActiveSection(current.target.id);
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );

    navigation.forEach(([, id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const prefillService = useCallback((service: Service) => {
    const need =
      service.name === "Bongkar & pasang"
        ? "Bongkar Pasang AC"
        : service.name === "Isi freon"
          ? "Isi Freon R22"
          : service.name === "Perbaikan AC"
            ? "Biaya Pengecekan AC"
            : service.name;
    setLead((current) => ({ ...current, need }));
    setSubmittedLead(null);
    setModal(null);
    window.setTimeout(
      () =>
        document
          .getElementById("estimasi")
          ?.scrollIntoView({ behavior: "smooth" }),
      80,
    );
  }, []);

  const selectProduct = (product: Product) => {
    setInstallIncluded(false);
    setModal({ kind: "product", product });
  };

  const openEventEstimator = (venueType?: string) => {
    setEventType(venueType ?? "Dalam ruang");
    setModal({ kind: "event" });
  };

  const updateLead = <K extends keyof LeadFields>(
    key: K,
    value: LeadFields[K],
  ) => {
    setLead((current) => ({ ...current, [key]: value }));
    setSubmittedLead(null);
  };

  const submitLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedLead(lead);
  };

  const estimatedPrice = estimateServicePrice(lead);

  return (
    <>
      <HeaderSection
        activeSection={activeSection}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
      />
      <main>
        <HeroSection selectedCity={selectedCity} />
        <MetricsSection />
        <ServicesSection
          onSelectService={(service) => setModal({ kind: "service", service })}
        />
        <CatalogSection onSelectProduct={selectProduct} />
        <RentalSection onOpenEstimator={openEventEstimator} />
        <ResultsSection />
        <ReviewsSection />
        <ContactSection
          lead={lead}
          submittedLead={submittedLead}
          estimatedPrice={estimatedPrice}
          onUpdate={updateLead}
          onSubmit={submitLead}
        />
      </main>
      <FooterSection />
      <FloatContact />
      <QuickDialog
        modal={modal}
        installIncluded={installIncluded}
        onInstallChange={setInstallIncluded}
        onClose={closeModal}
        onPrefillService={prefillService}
        eventType={eventType}
        onEventTypeChange={setEventType}
      />
    </>
  );
}
