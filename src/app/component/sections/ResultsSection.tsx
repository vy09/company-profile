"use client";

import Image from "next/image";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, type PointerEvent } from "react";

const casePhotos = [
  {
    src: "/hero/imgdwiteknik1.jpeg",
    alt: "Teknisi Dwi Teknik memeriksa unit AC",
  },
  {
    src: "/hero/imgdwiteknik2.jpeg",
    alt: "Teknisi Dwi Teknik melakukan pekerjaan servis",
  },
  {
    src: "/hero/imgdwiteknik3.jpeg",
    alt: "Dokumentasi pekerjaan teknisi Dwi Teknik",
  },
  {
    src: "/hero/imgdwiteknik4.jpeg",
    alt: "Hasil pekerjaan layanan Dwi Teknik",
  },
] as const;

const serviceCategories = [
  {
    id: "split",
    label: "AC Split",
    description:
      "Perawatan AC split ditangani sesuai kondisi unit. Estimasi biaya dijelaskan sebelum pengerjaan.",
    services: [
      "Cuci AC",
      "Perbaikan AC",
      "Bongkar pasang AC",
      "Penggantian komponen",
      "Pengadaan AC",
    ],
  },
  {
    id: "standing",
    label: "Standing",
    description:
      "Layanan untuk AC standing mencakup pemeriksaan, perawatan, dan kebutuhan penggantian unit.",
    services: [
      "Cuci AC standing",
      "Perbaikan AC standing",
      "Bongkar pasang dan relokasi",
      "Penggantian komponen",
      "Pengadaan AC standing",
    ],
  },
  {
    id: "cassette",
    label: "Cassette",
    description:
      "Pekerjaan AC cassette disesuaikan dengan kebutuhan ruang dan kondisi pemasangan.",
    services: [
      "Cuci AC cassette",
      "Perbaikan AC cassette",
      "Bongkar pasang AC",
      "Penggantian komponen",
      "Pengadaan AC cassette",
    ],
  },
  {
    id: "lainnya",
    label: "AC lainnya",
    description:
      "Konsultasikan jenis unit lain untuk menentukan pemeriksaan dan penanganan yang sesuai.",
    services: [
      "AC split duct",
      "AC VRV",
      "AC inverter",
      "Perawatan berkala",
      "Pengadaan unit AC",
    ],
  },
] as const;

export default function ResultsSection() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const dragStartX = useRef<number | null>(null);

  const showPhoto = (direction: number) => {
    setActivePhoto(
      (current) => (current + direction + casePhotos.length) % casePhotos.length,
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.target instanceof Element && event.target.closest("button")) return;
    dragStartX.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const distance = event.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(distance) > 48) showPhoto(distance < 0 ? 1 : -1);
  };

  return (
    <section className="results-section section-pad" id="hasil-kerja">
      <div className="site-shell">
        <div className="results-grid">
          <div className="results-service-panel">
            <span className="eyebrow">04 / Hasil kerja</span>
            <h2 className="section-heading">Bukan sekadar janji dingin.</h2>
            <p className="section-copy">
              Pemeriksaan menyeluruh, biaya disepakati, dan hasil kerja bisa dirasakan.
            </p>
            <div className="results-service-tabs" role="group" aria-label="Jenis AC">
              {serviceCategories.map((category, index) => (
                <button
                  className={`results-service-tab ${activeCategory === index ? "is-active" : ""}`}
                  type="button"
                  key={category.id}
                  aria-pressed={activeCategory === index}
                  onClick={() => setActiveCategory(index)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            <div className="results-service-content" aria-live="polite">
              <p>{serviceCategories[activeCategory].description}</p>
              <ul className="results-service-list">
                {serviceCategories[activeCategory].services.map((service) => (
                  <li key={service}>
                    <Check size={17} strokeWidth={2} aria-hidden="true" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="case-visual"
            role="region"
            aria-label="Galeri foto hasil kerja"
            aria-roledescription="carousel"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragStartX.current = null;
            }}
          >
            <div
              className="case-carousel-track"
              style={{ transform: `translateX(-${activePhoto * 100}%)` }}
            >
              {casePhotos.map((photo, index) => (
                <div
                  className="case-carousel-slide"
                  key={photo.src}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} dari ${casePhotos.length}`}
                  aria-hidden={activePhoto !== index}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 440px"
                    draggable={false}
                  />
                </div>
              ))}
            </div>
            <span className="case-photo-count" aria-live="polite">
              {String(activePhoto + 1).padStart(2, "0")} /{" "}
              {String(casePhotos.length).padStart(2, "0")}
            </span>
            <button
              className="case-photo-arrow case-photo-arrow--previous"
              type="button"
              aria-label="Foto sebelumnya"
              onClick={() => showPhoto(-1)}
            >
              <ChevronLeft size={20} strokeWidth={1.75} />
            </button>
            <button
              className="case-photo-arrow case-photo-arrow--next"
              type="button"
              aria-label="Foto berikutnya"
              onClick={() => showPhoto(1)}
            >
              <ChevronRight size={20} strokeWidth={1.75} />
            </button>
            <div className="case-photo-dots" role="group" aria-label="Pilih foto">
              {casePhotos.map((photo, index) => (
                <button
                  className={`case-photo-dot ${activePhoto === index ? "is-active" : ""}`}
                  key={photo.src}
                  type="button"
                  aria-label={`Tampilkan foto ${index + 1}`}
                  aria-pressed={activePhoto === index}
                  onClick={() => setActivePhoto(index)}
                />
              ))}
            </div>
            <div className="case-caption">
              <strong>Inspeksi sebelum eksekusi.</strong>
              <span>Temuan dijelaskan, pengerjaan setelah persetujuan.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
