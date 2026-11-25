import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappUrl } from "../../data/data";

export default function FloatContact() {
  return (
    <a
      className="float-contact"
      href={whatsappUrl("Halo Dwi Teknik, saya ingin konsultasi.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat dengan Dwi Teknik melalui WhatsApp"
    >
      <span className="float-contact-icon" aria-hidden="true">
        <FaWhatsapp size={19} />
      </span>
      <span>Chat WhatsApp</span>
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />
    </a>
  );
}