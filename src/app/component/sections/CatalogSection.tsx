"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useMemo,
  useRef,
  useState,
  type UIEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatRupiah, products, type Product } from "../../data/data";
import {
  Arrow,
  ProductIllustration,
  type ProductIllustrationView,
} from "../sections/Shared";

type Props = {
  onSelectProduct: (product: Product) => void;
};

const conditionOptions = ["Semua", "Baru", "Second"];
const capacityOptions = ["Semua PK", "0,5 PK", "1 PK", "1,5–2 PK"];
const pageSize = 6;
const productViews: { id: ProductIllustrationView; label: string }[] = [
  { id: "front", label: "Tampak depan" },
  { id: "angle", label: "Sisi unit" },
  { id: "detail", label: "Detail kisi" },
];

export default function CatalogSection({ onSelectProduct }: Props) {
  const [condition, setCondition] = useState("Semua");
  const [capacity, setCapacity] = useState("Semua PK");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCondition =
          condition === "Semua" || product.condition === condition;
        const matchesCapacity =
          capacity === "Semua PK" ||
          (capacity === "1,5–2 PK"
            ? product.pk >= 1.5 && product.pk <= 2
            : product.capacity === capacity);
        return matchesCondition && matchesCapacity;
      }),
    [condition, capacity],
  );
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize));
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const firstProduct = filteredProducts.length
    ? (currentPage - 1) * pageSize + 1
    : 0;
  const lastProduct = Math.min(currentPage * pageSize, filteredProducts.length);

  return (
    <section className="catalog-section section-pad" id="jual-ac">
      <div className="site-shell">
        <span className="eyebrow">02 / Jual AC</span>
        <h2 className="section-heading">Baru atau second, pilih yang pas.</h2>
        <p className="section-copy">
          Satu katalog untuk semua kebutuhan. Unit second sudah diperiksa
          teknisi.
        </p>
        <div className="catalog-toolbar" aria-label="Filter katalog AC">
          <div className="catalog-filter-row">
            <div className="filter-group" aria-label="Kondisi unit">
              {conditionOptions.map((option) => (
                <button
                  className={`filter-pill ${condition === option ? "is-selected" : ""}`}
                  type="button"
                  key={option}
                  aria-pressed={condition === option}
                  onClick={() => {
                    setCondition(option);
                    setCurrentPage(1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="filter-group" aria-label="Kapasitas AC">
              {capacityOptions.map((option) => (
                <button
                  className={`filter-pill ${capacity === option ? "is-selected" : ""}`}
                  type="button"
                  key={option}
                  aria-pressed={capacity === option}
                  onClick={() => {
                    setCapacity(option);
                    setCurrentPage(1);
                  }}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="price-notice">
          <strong>HARGA UNIT SAJA —</strong>
          Belum termasuk jasa pemasangan, pipa, bracket, dan ongkir. Biaya
          tambahan dihitung terpisah.
        </div>
        <div className="product-grid" aria-live="polite">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProducts.length ? (
              visibleProducts.map((product) => (
                <motion.article
                  className="product-card"
                  key={product.model}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  whileHover={{ y: -3, scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductGallery product={product} />
                  <div className="product-info">
                    <span className="product-specs">
                      {product.brand} · {product.capacity} · {product.energy}
                    </span>
                    <h3>{product.name}</h3>
                    <p>{product.warranty}</p>
                    <strong className="product-price">
                      {formatRupiah(product.price)}
                    </strong>
                    <button
                      className="product-action"
                      type="button"
                      onClick={() => onSelectProduct(product)}
                    >
                      Tanya stok & detail <Arrow />
                    </button>
                  </div>
                </motion.article>
              ))
            ) : (
              <motion.p
                className="catalog-empty"
                key="empty-catalog"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Belum ada unit pada pilihan ini. Coba filter lainnya.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <p className="catalog-results-count" aria-live="polite">
          Menampilkan {firstProduct}–{lastProduct} dari {filteredProducts.length}{" "}
          unit
        </p>
        {pageCount > 1 && (
          <nav className="catalog-pagination" aria-label="Halaman katalog AC">
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page - 1)}
              disabled={currentPage === 1}
            >
              Sebelumnya
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (page) => (
                <button
                  className={currentPage === page ? "is-current" : ""}
                  type="button"
                  key={page}
                  aria-current={currentPage === page ? "page" : undefined}
                  aria-label={`Halaman ${page}`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() => setCurrentPage((page) => page + 1)}
              disabled={currentPage === pageCount}
            >
              Berikutnya
            </button>
          </nav>
        )}
        <p className="section-footnote">
          Harga belum termasuk pemasangan. Tanyakan kondisi, ketersediaan stok,
          dan ongkir untuk alamat Anda.
        </p>
      </div>
    </section>
  );
}

function ProductGallery({ product }: { product: Product }) {
  const [activeView, setActiveView] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const showView = (index: number) => {
    const nextView = (index + productViews.length) % productViews.length;
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({
      left: nextView * track.clientWidth,
      behavior: "smooth",
    });
    setActiveView(nextView);
  };

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const track = event.currentTarget;
    if (!track.clientWidth) return;
    setActiveView(
      Math.min(
        productViews.length - 1,
        Math.round(track.scrollLeft / track.clientWidth),
      ),
    );
  };

  return (
    <div
      className="product-stage product-gallery"
      role="region"
      aria-label={`Ilustrasi ${product.name}`}
      aria-roledescription="carousel"
    >
      <span
        className={`condition-badge ${product.condition === "Second" ? "condition-badge--used" : ""}`}
      >
        {product.condition === "Second" ? "SECOND • TERUJI" : "BARU"}
      </span>
      <div
        className="product-gallery-track"
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label="Geser untuk melihat tampilan unit"
      >
        {productViews.map((view, index) => (
          <div
            className="product-gallery-slide"
            key={view.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${view.label}, ${index + 1} dari ${productViews.length}`}
            aria-hidden={activeView !== index}
          >
            <ProductIllustration tone={product.tone} view={view.id} />
          </div>
        ))}
      </div>
      <span className="product-gallery-label" aria-live="polite">
        {productViews[activeView].label}
      </span>
      <button
        className="product-gallery-arrow product-gallery-arrow--previous"
        type="button"
        aria-label={`Tampilan sebelumnya untuk ${product.name}`}
        onClick={() => showView(activeView - 1)}
      >
        <ChevronLeft size={17} strokeWidth={1.75} />
      </button>
      <button
        className="product-gallery-arrow product-gallery-arrow--next"
        type="button"
        aria-label={`Tampilan berikutnya untuk ${product.name}`}
        onClick={() => showView(activeView + 1)}
      >
        <ChevronRight size={17} strokeWidth={1.75} />
      </button>
      <div className="product-gallery-dots" role="group" aria-label="Pilih tampilan AC">
        {productViews.map((view, index) => (
          <button
            className={`product-gallery-dot ${activeView === index ? "is-active" : ""}`}
            key={view.id}
            type="button"
            aria-label={`${view.label} untuk ${product.name}`}
            aria-pressed={activeView === index}
            onClick={() => showView(index)}
          />
        ))}
      </div>
    </div>
  );
}
