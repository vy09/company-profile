"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Menu, X } from "lucide-react";
import { cities, navigation } from "../../data/data";

type Props = {
  activeSection: string;
  selectedCity: string;
  onCityChange: (city: string) => void;
};

export default function HeaderSection({
  activeSection,
  selectedCity,
  onCityChange,
}: Props) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".location-wrap")) {
        setLocationOpen(false);
      }
      if (!event.target.closest(".navbar")) setMobileMenuOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLocationOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const renderLocationPicker = () => (
    <div className="location-wrap">
      <button
        className="location-trigger"
        type="button"
        aria-expanded={locationOpen}
        aria-haspopup="listbox"
        aria-controls="location-options"
        onClick={() => setLocationOpen((open) => !open)}
      >
        {selectedCity} <ArrowDown aria-hidden="true" size={12} />
      </button>
      {locationOpen && (
        <div
          className="location-menu"
          id="location-options"
          role="listbox"
          aria-label="Pilih wilayah"
        >
          {cities.map((city) => (
            <button
              className={`location-option ${selectedCity === city ? "is-selected" : ""}`}
              key={city}
              type="button"
              role="option"
              aria-selected={selectedCity === city}
              onClick={() => {
                onCityChange(city);
                setLocationOpen(false);
                setMobileMenuOpen(false);
              }}
            >
              {city}
              {selectedCity === city && <span aria-hidden="true">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a className="brand" href="#beranda" aria-label="Dwi Teknik, ke beranda">
          <span className="brand-mark">D</span>
          <span>Dwi Teknik</span>
        </a>
        <nav
          className={`nav-menu ${mobileMenuOpen ? "is-open" : ""}`}
          id="primary-navigation"
          aria-label="Navigasi utama"
        >
          <div className="nav-links">
            {navigation.map(([label, id]) => (
              <a
                className={`nav-link ${activeSection === id ? "is-active" : ""}`}
                href={`#${id}`}
                key={id}
                aria-current={activeSection === id ? "location" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
        <div className="nav-actions">
          {renderLocationPicker()}
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-navigation"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setLocationOpen(false);
            }}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
}
