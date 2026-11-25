import { cities, navigation, whatsappUrl } from "../../data/data";
import { Arrow } from "../sections/Shared";

export default function FooterSection() {
  return (
    <footer className="site-footer">
      <div className="site-shell">
        <div className="footer-grid">
          <div>
            <a className="brand footer-brand" href="#beranda">
              <span className="brand-mark">D</span>
              <span>Dwi Teknik</span>
            </a>
            <p className="footer-tagline">
              Partner urusan AC rumah, bisnis, dan acara. Layanan rapi, harga
              jelas, nyaman.
            </p>
            <div className="footer-service-line">Servis · Jual · Sewa</div>
          </div>
          <div className="footer-column">
            <h3>Jelajahi</h3>
            {navigation.slice(1).map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </div>
          <div className="footer-column">
            <h3>Wilayah layanan</h3>
            {cities.map((city) => (
              <a key={city} href="#estimasi">
                {city}
              </a>
            ))}
            <p>Di luar area? Tanyakan ketersediaan tim.</p>
          </div>
          <div className="footer-column">
            <h3>Hubungi kami</h3>
            <p>+62 812-1234-5678</p>
            <a href="mailto:halo@dwiteknik.id">halo@dwiteknik.id</a>
            <p>
              Senin–Minggu
              <br />
              07.00–21.00 WIB
            </p>
            <a
              className="pill-button pill-button--lime"
              href={whatsappUrl("Halo Dwi Teknik, saya ingin konsultasi.")}
              target="_blank"
              rel="noreferrer"
            >
              Chat WhatsApp <Arrow />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Dwi Teknik. Hak cipta dilindungi.</span>
          <div className="footer-bottom-links">
            <a href="mailto:halo@dwiteknik.id">Kebijakan privasi</a>
            <a href="#estimasi">Syarat layanan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
