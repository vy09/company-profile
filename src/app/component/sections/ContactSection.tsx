"use client";

import type { FormEventHandler } from "react";
import {
  acTypes,
  estimateServicePrice,
  serviceNeeds,
  type LeadFields,
  whatsappUrl,
  formatRupiah,
} from "../../data/data";
import { Arrow } from "../sections/Shared";

type Props = {
  lead: LeadFields;
  submittedLead: LeadFields | null;
  estimatedPrice: number | null;
  onUpdate: <K extends keyof LeadFields>(key: K, value: LeadFields[K]) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

function createLeadMessage(lead: LeadFields) {
  const estimate = estimateServicePrice(lead);
  const estimateText =
    estimate === null ? getUnpricedReason(lead) : formatRupiah(estimate);
  const quantityUnit = getQuantityUnit(lead.need);

  return [
    "Halo Dwi Teknik, saya ingin minta estimasi dan jadwal.",
    "",
    `Nama: ${lead.name}`,
    `WhatsApp: ${lead.phone}`,
    `Kebutuhan: ${lead.need}`,
    `Jenis AC: ${lead.acType}`,
    `Kapasitas AC: ${lead.capacity} PK`,
    `Jumlah: ${lead.units} ${quantityUnit}`,
    `Tanggal kebutuhan: ${lead.date}`,
    `Area / kecamatan: ${lead.area}`,
    `Catatan: ${lead.notes || "-"}`,
    `Estimasi awal: ${estimateText}`,
  ].join("\n");
}

function getQuantityUnit(need: string) {
  if (need === "Bobok Tembok per Meter") return "meter";
  if (need === "Las Sambungan Pipa Freon per Titik") return "titik";
  return "unit";
}

function getUnpricedReason(lead: LeadFields) {
  if (lead.need === "Beli unit AC") return "Tanya stok dan harga unit";
  if (lead.need === "Perbaikan AC") {
    return "Harga perbaikan dikonfirmasi setelah diagnosa";
  }
  return "Perlu konfirmasi spesifikasi";
}

export default function ContactSection({
  lead,
  submittedLead,
  estimatedPrice,
  onUpdate,
  onSubmit,
}: Props) {
  const quantityLabel =
    lead.need === "Bobok Tembok per Meter"
      ? "Panjang (meter)"
      : lead.need === "Las Sambungan Pipa Freon per Titik"
        ? "Jumlah titik"
        : "Jumlah unit";

  return (
    <section className="contact-section section-pad" id="estimasi">
      <div className="site-shell contact-grid">
        <aside className="contact-card">
          <span className="eyebrow">06 / Hubungi kami</span>
          <h2>Mau servis, beli, atau sewa AC?</h2>
          <p>
            Ceritakan kebutuhan Anda. Tim kami membantu cek pilihan unit,
            estimasi biaya, dan jadwal yang tersedia.
          </p>
          <a
            className="pill-button"
            href={whatsappUrl("Halo Dwi Teknik, saya ingin konsultasi.")}
            target="_blank"
            rel="noreferrer"
          >
            Konsultasi via WhatsApp <Arrow />
          </a>
          <div className="contact-details">
            <div className="contact-detail">
              <strong>+62 812-1234-5678</strong>
              <span>WhatsApp / telepon</span>
            </div>
            <div className="contact-detail">
              <strong>Senin–Minggu, 07.00–21.00</strong>
              <span>
                Kami konfirmasi area dan jadwal sebelum menerima pesanan.
              </span>
            </div>
          </div>
        </aside>

        <div className="lead-form-wrap">
          <h2>Minta estimasi & jadwal</h2>
          <p className="form-intro">
            Isi detail singkat. Estimasi awal langsung muncul; permintaan
            dikirim melalui WhatsApp Anda.
          </p>
          <form className="lead-form" onSubmit={onSubmit}>
            <div className="form-field">
              <label htmlFor="lead-name">Nama lengkap</label>
              <input
                id="lead-name"
                name="name"
                autoComplete="name"
                placeholder="Nama Anda"
                required
                value={lead.name}
                onChange={(event) => onUpdate("name", event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="lead-phone">Nomor WhatsApp</label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                pattern="[+]?[0-9 ]{8,20}"
                title="Masukkan nomor telepon yang valid"
                placeholder="08xxxxxxxxxx"
                required
                value={lead.phone}
                onChange={(event) => onUpdate("phone", event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="lead-need">Kebutuhan</label>
              <select
                id="lead-need"
                value={lead.need}
                onChange={(event) => onUpdate("need", event.target.value)}
              >
                {serviceNeeds.map((need) => (
                  <option key={need}>{need}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="lead-ac-type">Jenis AC</label>
              <select
                id="lead-ac-type"
                value={lead.acType}
                onChange={(event) => onUpdate("acType", event.target.value)}
              >
                {acTypes.map((acType) => (
                  <option key={acType}>{acType}</option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="lead-capacity">Kapasitas AC (PK)</label>
              <input
                id="lead-capacity"
                type="number"
                min="0.5"
                max="50"
                step="0.5"
                required
                value={lead.capacity}
                onChange={(event) =>
                  onUpdate("capacity", Number(event.target.value) || 0.5)
                }
              />
            </div>
            <div className="form-field">
              <label htmlFor="lead-units">{quantityLabel}</label>
              <input
                id="lead-units"
                type="number"
                min="1"
                max="100"
                required
                value={lead.units}
                onChange={(event) =>
                  onUpdate("units", Number(event.target.value))
                }
              />
            </div>
            <div className="form-field">
              <label htmlFor="lead-date">Tanggal kebutuhan</label>
              <input
                id="lead-date"
                type="date"
                required
                value={lead.date}
                onChange={(event) => onUpdate("date", event.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="lead-area">Area / kecamatan</label>
              <input
                id="lead-area"
                placeholder="Contoh: Kemang, Jakarta Selatan"
                autoComplete="address-level2"
                required
                value={lead.area}
                onChange={(event) => onUpdate("area", event.target.value)}
              />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="lead-notes">Catatan tambahan (opsional)</label>
              <textarea
                id="lead-notes"
                placeholder="Ceritakan keluhan atau kebutuhan Anda"
                value={lead.notes}
                onChange={(event) => onUpdate("notes", event.target.value)}
              />
            </div>
            <div className="price-preview" aria-live="polite">
              <span>
                Estimasi sesuai jenis, kapasitas, dan jumlah
              </span>
              <strong>
                {estimatedPrice !== null
                  ? formatRupiah(estimatedPrice)
                  : getUnpricedReason(lead)}
              </strong>
            </div>
            <button
              className="pill-button pill-button--green lead-submit"
              type="submit"
            >
              Kirim permintaan estimasi <Arrow />
            </button>
            <p className="form-disclaimer">
              Estimasi dapat berubah setelah pengecekan kebutuhan dan lokasi.
              Tim mengonfirmasi harga sebelum pengerjaan.
            </p>
          </form>

          {submittedLead && (
            <div className="confirmation-card" role="status">
              <h3>Permintaan siap dikirim</h3>
              <p>
                Periksa ringkasan berikut. WhatsApp akan terbuka dengan pesan
                yang sudah disiapkan untuk tim Dwi Teknik.
              </p>
              <div className="confirmation-summary">
                {`${submittedLead.name} · ${submittedLead.need}\n${submittedLead.acType} ${submittedLead.capacity} PK · ${submittedLead.units} ${getQuantityUnit(submittedLead.need)}\n${submittedLead.date} · ${submittedLead.area}`}
              </div>
              <a
                className="pill-button pill-button--green"
                href={whatsappUrl(createLeadMessage(submittedLead))}
                target="_blank"
                rel="noreferrer"
              >
                Buka & Kirim via WhatsApp Sekarang <Arrow />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
