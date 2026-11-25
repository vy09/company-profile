"use client";

import { motion } from "framer-motion";
import { Arrow } from "./Shared";

type Props = {
  onOpenEstimator: (venueType?: string) => void;
};

const rentalOptions = [
  {
    index: "01 / RUANG TERTUTUP",
    title: "Sejuk untuk setiap tamu.",
    spec: "Standing AC 3–5 PK · ±30–50 m²",
    details:
      "Rapat, gathering, dan resepsi indoor. Unit, instalasi, dan teknisi siap bantu.",
    price: "Rp750.000",
    unit: "per unit / hari",
    tone: "lime",
  },
  {
    index: "02 / KAPASITAS BESAR",
    title: "Ruang besar, tenaga ekstra.",
    spec: "Standing AC 10 PK · ±80–120 m²",
    details:
      "Ballroom, pameran, dan acara perusahaan. Untuk kapasitas besar, instalasi profesional.",
    price: "Rp1.500.000",
    unit: "per unit / hari",
    tone: "green",
  },
  {
    index: "03 / OUTDOOR & SEMI-OUTDOOR",
    title: "Tetap nyaman di area terbuka.",
    spec: "Paket 4 air cooler · titik sejuk lokal",
    details:
      "Tepat untuk bazar, area dengan sirkulasi udara, atau acara outdoor.",
    price: "Rp2.250.000",
    unit: "per paket / hari",
    tone: "sand",
  },
];

const processSteps = [
  "Kirim tanggal & lokasi",
  "Cek venue & kebutuhan daya",
  "Setujui penawaran, tim setup",
];

export default function RentalSection({ onOpenEstimator }: Props) {
  return (
    <section className="rental-section section-pad" id="sewa-acara">
      <div className="site-shell">
        <span className="eyebrow">03 / Sewa acara</span>
        <h2 className="section-heading">Acaranya ramai. Udaranya tetap nyaman.</h2>
        <p className="section-copy">
          Dari ruang tertutup sampai area terbuka, tim bantu pilih kapasitas sesuai
          venue dan kebutuhan daya.
        </p>
        <div className="rental-grid">
          {rentalOptions.map((option, index) => (
            <motion.article
              className={`rental-card rental-card--${option.tone}`}
              key={option.index}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="rental-index">{option.index}</span>
              <h3>{option.title}</h3>
              <p className="rental-spec">{option.spec}</p>
              <p className="rental-details">{option.details}</p>
              <span className="rental-price-label">Estimasi mulai</span>
              <strong className="rental-price">{option.price}</strong>
              <span className="rental-unit">{option.unit}</span>
              <button
                className="pill-button"
                type="button"
                onClick={() =>
                  onOpenEstimator(index === 2 ? "Outdoor / semi-outdoor" : "Dalam ruang")
                }
              >
                Cek tanggal & booking <Arrow />
              </button>
            </motion.article>
          ))}
        </div>
        <p className="rental-fineprint">
          *Harga perkiraan sebelum pengecekan venue, durasi, kebutuhan daya, dan akses
          loading. Transportasi, instalasi tambahan, dan kebutuhan daya khusus
          dikonfirmasi sebelum pemesanan.
        </p>
        <div className="process-strip">
          {processSteps.map((step, index) => (
            <div className="process-step" key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {step}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
