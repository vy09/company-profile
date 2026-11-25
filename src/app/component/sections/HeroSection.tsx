import Image from "next/image";
import { Check } from "lucide-react";
import { whatsappUrl } from "../../data/data";
import { Arrow } from "../sections/Shared";

export default function HeroSection({
  selectedCity,
}: {
  selectedCity: string;
}) {
  const serviceArea = selectedCity === "Jabode" ? "Jabodetabek" : selectedCity;
  const consultationLink = whatsappUrl(
    `Halo Dwi Teknik, saya ingin konsultasi layanan di ${selectedCity}.`,
  );

  return (
    <section className="hero site-shell" id="beranda">
      <div className="hero-grid">
        <div>
          <span className="eyebrow">Servis • Jual unit • Sewa acara</span>
          <h1>Urusan AC, beres di satu tempat.</h1>
          <p className="hero-description">
            Servis AC rumah & bisnis, beli unit baru atau second, hingga sewa
            pendingin acara di {serviceArea}. Harga jelas sebelum teknisi mulai
            bekerja.
          </p>
          <div className="hero-buttons">
            <a
              className="pill-button pill-button--green"
              href={consultationLink}
              target="_blank"
              rel="noreferrer"
            >
              Konsultasi via WhatsApp <Arrow />
            </a>
            <a className="outline-button" href="#layanan">
              Lihat layanan <Arrow />
            </a>
          </div>
          <div className="trust-note">
            <span className="trust-check" aria-hidden="true">
              <Check size={12} strokeWidth={2} />
            </span>
            Harga jelas di awal. Pengerjaan setelah Anda setuju.
          </div>
        </div>
        <a
          className="hero-visual"
          href="#hasil-kerja"
          aria-label="Lihat foto dan hasil kerja Dwi Teknik"
        >
          <Image
            src="/hero/img456.jpg"
            alt="Teknisi Dwi Teknik memeriksa unit pendingin udara"
            width={1200}
            height={900}
            sizes="(max-width: 760px) 100vw, 55vw"
            draggable={false}
            priority
          />
          <span className="hero-visual-cta">
            Lihat hasil kerja <Arrow />
          </span>
          <div className="hero-visual-labels">
            <div>
              <span>Standar layanan</span>
              <strong>Teknisi terverifikasi</strong>
            </div>
            <div>
              <span>Setelah pengerjaan</span>
              <strong>Garansi hingga 30 hari</strong>
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}
