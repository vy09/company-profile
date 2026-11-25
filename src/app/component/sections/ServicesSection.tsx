"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, type Service } from "../../data/data";

type Props = {
  onSelectService: (service: Service) => void;
};

export default function ServicesSection({ onSelectService }: Props) {
  return (
    <section className="services-section section-pad" id="layanan">
      <div className="site-shell">
        <span className="eyebrow">01 / Layanan</span>
        <h2 className="section-heading">Dari cuci rutin sampai dingin lagi.</h2>
        <p className="section-copy">
          Satu tim untuk perawatan rumah, kantor, dan bisnis. Estimasi disetujui sebelum
          pengerjaan.
        </p>
        <div className="service-grid">
          {services.map((service, index) => (
            <motion.button
              className={`service-card service-card--${service.tone}`}
              key={service.name}
              type="button"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => onSelectService(service)}
              aria-label={`Detail ${service.name}`}
            >
              <span className="service-number">{String(index + 1).padStart(2, "0")}</span>
              <span className="service-arrow" aria-hidden="true">
                <ArrowUpRight size={15} strokeWidth={1.75} />
              </span>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
              <strong className="service-price">{service.priceLabel}</strong>
              <span className="service-note">{service.note}</span>
            </motion.button>
          ))}
        </div>
        <p className="section-footnote">
          Detail biaya mengikuti kapasitas dan jenis AC. Estimasi tersedia di form
          konsultasi; pengerjaan dimulai setelah biaya disetujui.
        </p>
      </div>
    </section>
  );
}
