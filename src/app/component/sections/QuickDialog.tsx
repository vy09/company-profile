"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import {
  formatRupiah,
  type ModalState,
  type Product,
  type Service,
  whatsappUrl,
} from "../../data/data";
import { Arrow } from "./Shared";

type Props = {
  modal: ModalState;
  installIncluded: boolean;
  onInstallChange: (included: boolean) => void;
  onClose: () => void;
  onPrefillService: (service: Service) => void;
  eventType: string;
  onEventTypeChange: (type: string) => void;
};

export default function QuickDialog({
  modal,
  installIncluded,
  onInstallChange,
  onClose,
  onPrefillService,
  eventType,
  onEventTypeChange,
}: Props) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const [eventDate, setEventDate] = useState("");
  const [eventArea, setEventArea] = useState(100);

  useEffect(() => {
    if (!modal) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, [modal, onClose]);

  const recommendedUnits =
    eventType === "Dalam ruang"
      ? Math.max(1, Math.ceil(eventArea / 45))
      : Math.max(1, Math.ceil(eventArea / 30));
  const eventMessage = [
    "Halo Dwi Teknik, saya ingin cek sewa AC acara.",
    "",
    `Tanggal: ${eventDate || "-"}`,
    `Luas venue: ${eventArea} m²`,
    `Jenis: ${eventType}`,
    `Rekomendasi awal: ${recommendedUnits} unit.`,
  ].join("\n");

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            className="modal-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-heading"
            ref={panelRef}
            initial={{ opacity: 0, y: 12, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Tutup"
              ref={closeRef}
              onClick={onClose}
            >
              <X size={18} strokeWidth={1.75} />
            </button>

            {modal.kind === "service" && (
              <ServiceDialog
                service={modal.service}
                onPrefill={onPrefillService}
              />
            )}
            {modal.kind === "product" && (
              <ProductDialog
                product={modal.product}
                installIncluded={installIncluded}
                onInstallChange={onInstallChange}
              />
            )}
            {modal.kind === "event" && (
              <EventDialog
                date={eventDate}
                area={eventArea}
                type={eventType}
                recommendedUnits={recommendedUnits}
                message={eventMessage}
                onDateChange={setEventDate}
                onAreaChange={setEventArea}
                onTypeChange={onEventTypeChange}
              />
            )}
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ServiceDialog({
  service,
  onPrefill,
}: {
  service: Service;
  onPrefill: (service: Service) => void;
}) {
  return (
    <>
      <span className="eyebrow">Detail layanan</span>
      <h2 id="modal-heading">{service.name}</h2>
      <p className="modal-copy">{service.description}</p>
      <div className="modal-price">
        {service.priceLabel} <small>· {service.note.toLowerCase()}</small>
      </div>
      <ul className="checklist">
        {service.checklist.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="parts-estimate">
        <strong>Harga terkait layanan</strong>
        <span>{service.parts}</span>
      </div>
      <div className="modal-actions">
        <button
          className="pill-button pill-button--green"
          type="button"
          onClick={() => onPrefill(service)}
        >
          Pilih & minta estimasi <Arrow />
        </button>
        <a
          className="outline-button"
          href={whatsappUrl(`Halo Dwi Teknik, saya ingin tanya ${service.name}.`)}
          target="_blank"
          rel="noreferrer"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </>
  );
}

function ProductDialog({
  product,
  installIncluded,
  onInstallChange,
}: {
  product: Product;
  installIncluded: boolean;
  onInstallChange: (included: boolean) => void;
}) {
  const installationPrice = product.pk <= 1 ? 225000 : 325000;
  const total = product.price + (installIncluded ? installationPrice : 0);

  return (
    <>
      <span className="eyebrow">
        {product.condition === "Second" ? "Second • teruji" : "Unit baru"}
      </span>
      <h2 id="modal-heading">{product.name}</h2>
      <p className="modal-copy">
        {product.capacity} · {product.energy} · {product.warranty}. Harga unit
        saja, belum termasuk pengiriman.
      </p>
      <label className="install-toggle">
        <input
          type="checkbox"
          checked={installIncluded}
          onChange={(event) => onInstallChange(event.target.checked)}
        />
        <span>
          <strong>
            Tambah jasa pasang AC ({formatRupiah(installationPrice)})
          </strong>
          <span>
            Tarif sesuai kapasitas unit {product.capacity}; material dan ongkir
            dihitung terpisah.
          </span>
        </span>
      </label>
      <div className="modal-price">
        {formatRupiah(total)}
        <small>
          {installIncluded ? " · unit + paket pasang" : " · harga unit saja"}
        </small>
      </div>
      <div className="parts-estimate">
        <strong>Pastikan stok dan area pengiriman</strong>
        <span>
          Biaya bracket, tambahan pipa, dan ongkir disesuaikan dengan kondisi
          serta alamat pemasangan.
        </span>
      </div>
      <div className="modal-actions">
        <a
          className="pill-button pill-button--green"
          href={whatsappUrl(
            `Halo Dwi Teknik, saya ingin cek stok ${product.name} (${product.capacity}).${installIncluded ? ` Saya juga ingin jasa pasang (${formatRupiah(installationPrice)}).` : ""} Total indikatif: ${formatRupiah(total)}. Mohon info ongkir ke area saya.`,
          )}
          target="_blank"
          rel="noreferrer"
        >
          Tanya stok & lanjut WhatsApp <Arrow />
        </a>
      </div>
    </>
  );
}

function EventDialog({
  date,
  area,
  type,
  recommendedUnits,
  message,
  onDateChange,
  onAreaChange,
  onTypeChange,
}: {
  date: string;
  area: number;
  type: string;
  recommendedUnits: number;
  message: string;
  onDateChange: (date: string) => void;
  onAreaChange: (area: number) => void;
  onTypeChange: (type: string) => void;
}) {
  return (
    <>
      <span className="eyebrow">Estimator sewa acara</span>
      <h2 id="modal-heading">Rencanakan udara yang nyaman.</h2>
      <p className="modal-copy">
        Masukkan detail acara untuk rekomendasi kapasitas awal. Kebutuhan final
        dikonfirmasi setelah pengecekan venue.
      </p>
      <div className="estimator-fields">
        <div className="estimator-field">
          <label htmlFor="event-date">Tanggal acara</label>
          <input
            id="event-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </div>
        <div className="estimator-field">
          <label htmlFor="event-area">Luas area (m²)</label>
          <input
            id="event-area"
            type="number"
            min="10"
            max="5000"
            value={area}
            onChange={(event) =>
              onAreaChange(Math.max(10, Number(event.target.value) || 10))
            }
          />
        </div>
        <div className="estimator-field estimator-field--full">
          <label htmlFor="event-type">Jenis venue</label>
          <select
            value={type}
            id="event-type"
            onChange={(event) => onTypeChange(event.target.value)}
          >
            <option>Dalam ruang</option>
            <option>Outdoor / semi-outdoor</option>
          </select>
        </div>
      </div>
      <div className="estimator-result" aria-live="polite">
        <strong>
          Rekomendasi awal: {recommendedUnits}{" "}
          {type === "Dalam ruang" ? "unit standing AC" : "paket air cooler"}
        </strong>
        <p>
          Untuk area sekitar {area} m². Hasil dapat berubah sesuai tinggi
          plafon, kapasitas listrik, sirkulasi udara, dan jumlah tamu.
        </p>
      </div>
      <a
        className="pill-button pill-button--green estimator-wa"
        href={whatsappUrl(message)}
        aria-disabled={!date}
        title={!date ? "Pilih tanggal acara terlebih dahulu" : undefined}
        onClick={(event) => {
          if (!date) event.preventDefault();
        }}
      >
        Kirim detail & cek tanggal <Arrow />
      </a>
    </>
  );
}
