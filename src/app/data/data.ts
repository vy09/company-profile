export const WHATSAPP_NUMBER = "6281212345678";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const navigation = [
  ["Beranda", "beranda"],
  ["Layanan", "layanan"],
  ["Jual AC", "jual-ac"],
  ["Sewa Acara", "sewa-acara"],
  ["Hasil Kerja", "hasil-kerja"],
  ["Ulasan", "ulasan"],
] as const;

export const cities = ["Jakarta", "Bogor", "Depok"];

export type Service = {
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  note: string;
  tone: string;
  checklist: string[];
  parts: string;
};

export const services: Service[] = [
  {
    name: "Cuci AC",
    description: "Pembersihan indoor, outdoor, filter, dan pengecekan performa.",
    price: 90000,
    priceLabel: "Mulai Rp90.000",
    note: "Split 0,5–2 PK",
    tone: "soft",
    checklist: [
      "Cuci filter dan cover unit indoor",
      "Pembersihan evaporator dan blower",
      "Cek saluran pembuangan air",
      "Pengecekan suhu dan fungsi unit",
    ],
    parts: "Split inverter Rp130.000. Cassette, standing, split duct, dan VRV Rp75.000/PK.",
  },
  {
    name: "Perbaikan AC",
    description: "Pengecekan, diagnosa, dan perbaikan kerusakan yang jelas.",
    price: 175000,
    priceLabel: "Mulai Rp175.000",
    note: "Biaya pengecekan AC",
    tone: "featured",
    checklist: [
      "Pemeriksaan keluhan dan kondisi unit",
      "Diagnosa kerusakan sebelum pengerjaan",
      "Estimasi biaya disetujui terlebih dahulu",
      "Uji fungsi setelah perbaikan",
    ],
    parts: "Biaya pengecekan Rp175.000. Kapasitor (part dan jasa) Rp275.000–Rp330.000. Perbaikan kebocoran pipa + isi freon Rp550.000.",
  },
  {
    name: "Bongkar & pasang",
    description: "Instalasi presisi, jalur pipa rapi, dan tes kebocoran.",
    price: 450000,
    priceLabel: "Mulai Rp450.000",
    note: "Bongkar pasang 0,5–1 PK",
    tone: "sage",
    checklist: [
      "Pemeriksaan titik pemasangan",
      "Pemasangan indoor dan outdoor",
      "Vakum dan pengecekan kebocoran",
      "Tes fungsi serta penjelasan pemakaian",
    ],
    parts: "Bongkar AC Rp125.000. Pasang Rp225.000–Rp325.000. Bongkar pasang Rp450.000–Rp500.000.",
  },
  {
    name: "Isi freon",
    description: "Cek tekanan, kebocoran, lalu pengisian sesuai kebutuhan unit.",
    price: 275000,
    priceLabel: "Mulai Rp275.000",
    note: "Isi freon R22 0,5–1 PK",
    tone: "soft",
    checklist: [
      "Pengecekan tekanan dan kondisi unit",
      "Pemeriksaan indikasi kebocoran",
      "Pengisian sesuai tipe refrigeran",
      "Tes suhu dan tekanan setelah pengisian",
    ],
    parts: "Isi freon R22 Rp275.000–Rp325.000. Isi freon R32/R410 Rp350.000–Rp450.000. Tambah freon mulai Rp175.000.",
  },
  {
    name: "Perawatan berkala",
    description: "Jadwal rutin dan catatan kondisi unit di setiap kunjungan.",
    price: 90000,
    priceLabel: "Mulai Rp90.000",
    note: "Cuci AC split 0,5–2 PK",
    tone: "sand",
    checklist: [
      "Jadwal kunjungan rutin sesuai kebutuhan",
      "Pembersihan ringan dan cek performa",
      "Catatan kondisi untuk setiap unit",
      "Pengingat untuk jadwal berikutnya",
    ],
    parts: "Paket disesuaikan jumlah unit dan frekuensi kunjungan. Suku cadang diinformasikan dan ditagihkan terpisah.",
  },
  {
    name: "AC komersial",
    description: "Layanan gedung, kafe, kantor, dan unit kapasitas besar.",
    price: 75000,
    priceLabel: "Mulai Rp75.000/PK",
    note: "Cassette, standing, duct, VRV",
    tone: "sky",
    checklist: [
      "Pengecekan unit dan kebutuhan operasional",
      "Rencana pengerjaan sesuai jam operasional",
      "Dokumentasi kondisi sebelum dan sesudah",
      "Koordinasi jadwal dan SLA layanan",
    ],
    parts: "Cuci cassette, standing, split duct, dan VRV Rp75.000/PK. Vacuum & flushing Rp350.000.",
  },
];

export const acTypes = [
  "AC Split",
  "AC Split Duct",
  "AC VRV",
  "AC Cassette",
  "AC Standing",
];

export const serviceNeeds = [
  "Cuci AC",
  "Cuci AC Split Inverter",
  "Perbaikan AC",
  "Biaya Pengecekan AC",
  "Tambah Freon R22",
  "Tambah Freon R32/R410",
  "Isi Freon R22",
  "Isi Freon R32/R410",
  "Bongkar AC",
  "Pasang AC",
  "Bongkar Pasang AC",
  "Penggantian Kapasitor AC",
  "Bobok Tembok per Meter",
  "Las Sambungan Pipa Freon per Titik",
  "Las Perbaikan Kebocoran Pipa + Isi Freon",
  "Vacuum & Flushing AC",
  "Flushing Evaporator",
  "Vacuum AC Pipa di atas 10 m",
  "Perawatan berkala",
  "AC komersial",
  "Beli unit AC",
  "Sewa AC acara",
];

function priceForCapacity(
  capacity: number,
  upToOnePk: number,
  upToTwoPk: number,
) {
  if (capacity >= 0.5 && capacity <= 1) return upToOnePk;
  if (capacity >= 1.5 && capacity <= 2) return upToTwoPk;
  return null;
}

export function estimateServicePrice({
  need,
  acType,
  capacity,
  units,
}: {
  need: string;
  acType: string;
  capacity: number;
  units: number;
}) {
  const count = Math.max(1, Number(units) || 1);
  const isSplit = acType === "AC Split";
  const isCommercialUnit = acType !== "AC Split";
  let unitPrice: number | null;

  switch (need) {
    case "Cuci AC":
    case "Perawatan berkala":
      if (isSplit) {
        unitPrice = capacity >= 0.5 && capacity <= 2 ? 90000 : null;
      } else {
        unitPrice = 75000 * capacity;
      }
      break;
    case "Cuci AC Split Inverter":
      unitPrice =
        isSplit && capacity >= 0.5 && capacity <= 2 ? 130000 : null;
      break;
    case "AC komersial":
      unitPrice = isCommercialUnit ? 75000 * capacity : null;
      break;
    case "Biaya Pengecekan AC":
      unitPrice = 175000;
      break;
    case "Perbaikan AC":
      return null;
    case "Tambah Freon R22":
      unitPrice =
        capacity > 2.5
          ? 120000 * capacity
          : priceForCapacity(capacity, 175000, 225000);
      break;
    case "Tambah Freon R32/R410":
      unitPrice =
        capacity > 2.5
          ? 145000 * capacity
          : priceForCapacity(capacity, 225000, 275000);
      break;
    case "Isi Freon R22":
      unitPrice = priceForCapacity(capacity, 275000, 325000);
      break;
    case "Isi Freon R32/R410":
      unitPrice = priceForCapacity(capacity, 350000, 450000);
      break;
    case "Bongkar AC":
      unitPrice = 125000;
      break;
    case "Pasang AC":
      unitPrice = priceForCapacity(capacity, 225000, 325000);
      break;
    case "Bongkar Pasang AC":
      unitPrice = priceForCapacity(capacity, 450000, 500000);
      break;
    case "Penggantian Kapasitor AC":
      unitPrice = priceForCapacity(capacity, 275000, 330000);
      break;
    case "Bobok Tembok per Meter":
      unitPrice = 50000;
      break;
    case "Las Sambungan Pipa Freon per Titik":
      unitPrice = 75000;
      break;
    case "Las Perbaikan Kebocoran Pipa + Isi Freon":
      unitPrice = 550000;
      break;
    case "Vacuum & Flushing AC":
      unitPrice = 350000;
      break;
    case "Flushing Evaporator":
      unitPrice = 200000;
      break;
    case "Vacuum AC Pipa di atas 10 m":
      unitPrice = 150000;
      break;
    case "Sewa AC acara":
      unitPrice = 750000;
      break;
    case "Beli unit AC":
    default:
      return null;
  }

  return unitPrice === null ? null : unitPrice * count;
}

export type Product = {
  brand: string;
  name: string;
  model: string;
  condition: "Baru" | "Second";
  capacity: string;
  pk: number;
  price: number;
  energy: string;
  warranty: string;
  tone: string;
};

export const products: Product[] = [
  {
    brand: "Daikin",
    name: "Daikin FTC25NV14",
    model: "FTC25NV14",
    condition: "Baru",
    capacity: "1 PK",
    pk: 1,
    price: 3890000,
    energy: "Hemat energi • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "white",
  },
  {
    brand: "Panasonic",
    name: "Panasonic CS-PN5",
    model: "CS-PN5",
    condition: "Baru",
    capacity: "0,5 PK",
    pk: 0.5,
    price: 2850000,
    energy: "Efisien • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "soft",
  },
  {
    brand: "LG",
    name: "LG T10EV5 Second Grade A",
    model: "T10EV5",
    condition: "Second",
    capacity: "1 PK",
    pk: 1,
    price: 1650000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "blue",
  },
  {
    brand: "Sharp",
    name: "Sharp AH-A5ZCY",
    model: "AH-A5ZCY",
    condition: "Baru",
    capacity: "1,5 PK",
    pk: 1.5,
    price: 3750000,
    energy: "Low watt • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "white",
  },
  {
    brand: "Midea",
    name: "Midea MSFC-05 Second Grade A",
    model: "MSFC-05",
    condition: "Second",
    capacity: "0,5 PK",
    pk: 0.5,
    price: 1450000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "soft",
  },
  {
    brand: "Gree",
    name: "Gree GWC-18",
    model: "GWC-18",
    condition: "Second",
    capacity: "2 PK",
    pk: 2,
    price: 3850000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "blue",
  },
  {
    brand: "Gree",
    name: "Gree GWC-05MOO5",
    model: "GWC-05MOO5",
    condition: "Baru",
    capacity: "0,5 PK",
    pk: 0.5,
    price: 2650000,
    energy: "Hemat energi • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "soft",
  },
  {
    brand: "Midea",
    name: "Midea MSIAF-05CRDN2",
    model: "MSIAF-05CRDN2",
    condition: "Baru",
    capacity: "0,5 PK",
    pk: 0.5,
    price: 2790000,
    energy: "Inverter • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "white",
  },
  {
    brand: "LG",
    name: "LG T06EV5",
    model: "T06EV5",
    condition: "Baru",
    capacity: "0,5 PK",
    pk: 0.5,
    price: 3150000,
    energy: "Hemat energi • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "blue",
  },
  {
    brand: "Samsung",
    name: "Samsung AR05TGHQ",
    model: "AR05TGHQ",
    condition: "Baru",
    capacity: "0,5 PK",
    pk: 0.5,
    price: 3050000,
    energy: "Fast cooling • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "soft",
  },
  {
    brand: "Mitsubishi Heavy",
    name: "Mitsubishi Heavy SRK10CRS-S6",
    model: "SRK10CRS-S6",
    condition: "Baru",
    capacity: "1 PK",
    pk: 1,
    price: 4250000,
    energy: "Low watt • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "white",
  },
  {
    brand: "Daikin",
    name: "Daikin FTC35NV14",
    model: "FTC35NV14",
    condition: "Baru",
    capacity: "1,5 PK",
    pk: 1.5,
    price: 4650000,
    energy: "Hemat energi • R32",
    warranty: "Garansi resmi 1 tahun",
    tone: "blue",
  },
  {
    brand: "Daikin",
    name: "Daikin FTKC25 Second Grade A",
    model: "FTKC25-SECOND",
    condition: "Second",
    capacity: "1 PK",
    pk: 1,
    price: 2450000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "white",
  },
  {
    brand: "Panasonic",
    name: "Panasonic CS-PN12 Second Grade A",
    model: "CS-PN12-SECOND",
    condition: "Second",
    capacity: "1,5 PK",
    pk: 1.5,
    price: 2300000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "soft",
  },
  {
    brand: "Sharp",
    name: "Sharp AH-A9UCY Second Grade A",
    model: "AH-A9UCY-SECOND",
    condition: "Second",
    capacity: "1 PK",
    pk: 1,
    price: 1900000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "blue",
  },
  {
    brand: "Samsung",
    name: "Samsung AR09TGHQ Second Grade A",
    model: "AR09TGHQ-SECOND",
    condition: "Second",
    capacity: "1 PK",
    pk: 1,
    price: 1950000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "white",
  },
  {
    brand: "Mitsubishi Heavy",
    name: "Mitsubishi Heavy SRK10CRS-S6 Second Grade A",
    model: "SRK10CRS-S6-SECOND",
    condition: "Second",
    capacity: "1 PK",
    pk: 1,
    price: 2300000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "soft",
  },
  {
    brand: "Midea",
    name: "Midea MSFC-09 Second Grade A",
    model: "MSFC-09-SECOND",
    condition: "Second",
    capacity: "1 PK",
    pk: 1,
    price: 1750000,
    energy: "Sudah diuji teknisi",
    warranty: "Garansi toko 30 hari",
    tone: "blue",
  },
];

export const caseStudies = [
  {
    tag: "HUNIAN",
    title: "Perawatan 4 unit di rumah keluarga",
    result: "Suhu turun 6°C dalam 20 menit",
    detail:
      "Setelah filter dan evaporator dibersihkan, aliran udara kembali normal. Kami juga menunjukkan kondisi drainase dan memberi saran interval cuci berikutnya.",
  },
  {
    tag: "KAFE",
    title: "Perbaikan AC cassette area pelanggan",
    result: "Operasional kembali di hari yang sama",
    detail:
      "Tim mengidentifikasi kapasitor fan yang melemah, menyampaikan estimasi komponen lebih dahulu, lalu menguji pendinginan sebelum area dibuka kembali.",
  },
  {
    tag: "KANTOR",
    title: "Kontrak maintenance 18 unit",
    result: "Keluhan unit turun 72% dalam 3 bulan",
    detail:
      "Jadwal perawatan bergilir dan laporan kondisi per unit membantu tim fasilitas mendeteksi filter kotor dan aliran kondensat sebelum mengganggu pekerjaan.",
  },
];

export const reviews = [
  {
    quote:
      "Teknisinya datang tepat waktu, menjelaskan penyebab AC bocor, dan ngerjainnya dengan bersih. Harganya sama dengan estimasi.",
    name: "Dina Prameswari",
    place: "Pelanggan rumah • Depok",
  },
  {
    quote:
      "Kami butuh penanganan cepat sebelum jam operasional. Tim Dwi Teknik kasih solusi masuk akal dan AC kantor normal kembali.",
    name: "Rizky Ananda",
    place: "Pemilik usaha • Jakarta Selatan",
  },
  {
    quote:
      "Laporan perawatannya jelas dan jadwal rutin sangat membantu. Sejak pakai Dwi Teknik, komplain dari tim hampir tidak ada.",
    name: "Maya Kusuma",
    place: "Office manager • Tangerang",
  },
];

export type LeadFields = {
  name: string;
  phone: string;
  need: string;
  acType: string;
  capacity: number;
  units: number;
  date: string;
  area: string;
  notes: string;
};

export const emptyLead: LeadFields = {
  name: "",
  phone: "",
  need: "Cuci AC",
  acType: "AC Split",
  capacity: 1,
  units: 1,
  date: "",
  area: "",
  notes: "",
};

export type ModalState =
  | { kind: "service"; service: Service }
  | { kind: "product"; product: Product }
  | { kind: "event" }
  | null;
