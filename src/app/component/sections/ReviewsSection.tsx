import { reviews } from "../../data/data";
import { motion } from "framer-motion";

export default function ReviewsSection() {
  return (
    <section className="reviews-section section-pad" id="ulasan">
      <div className="site-shell">
        <div className="reviews-heading-row">
          <div>
            <span className="eyebrow">05 / Ulasan</span>
            <h2 className="section-heading">Nyaman setelah layanan.</h2>
          </div>
          <div className="review-score">
            <strong>4,9/5</strong>
            <span>dari 1.200+ ulasan</span>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <motion.article
              className="review-card"
              key={review.name}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="review-stars" aria-label="5 dari 5 bintang">
                ★★★★★
              </div>
              <blockquote>“{review.quote}”</blockquote>
              <strong className="review-author">{review.name}</strong>
              <span className="review-place">{review.place}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
