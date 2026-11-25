"use client";

import { useEffect, useRef, useState } from "react";

export default function MetricsSection() {
  const [progress, setProgress] = useState(0);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = metricsRef.current;
    if (!element) return;

    let frame = 0;
    const startedAt = performance.now();
    const duration = 1250;
    const animate = (now: number) => {
      const ratio = Math.min((now - startedAt) / duration, 1);
      setProgress(1 - Math.pow(1 - ratio, 3));
      if (ratio < 1) frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          frame = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="metrics" aria-label="Ringkasan layanan Dwi Teknik">
      <div className="site-shell">
        <div className="metrics-grid" ref={metricsRef}>
          <div className="metric">
            <strong className="metric-value tabular-nums">
              {Math.round(progress * 8500).toLocaleString("id-ID")}+
            </strong>
            <span className="metric-label">unit AC ditangani</span>
          </div>
          <div className="metric">
            <strong className="metric-value tabular-nums">
              {(progress * 4.9).toLocaleString("id-ID", {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
              /5
            </strong>
            <span className="metric-label">dari 1.200+ ulasan</span>
          </div>
          <div className="metric">
            <strong className="metric-value tabular-nums">
              {Math.round(progress * 30)} hari
            </strong>
            <span className="metric-label">garansi layanan*</span>
          </div>
          <div className="metric">
            <strong className="metric-value tabular-nums">
              &lt; {Math.round(progress * 90)} mnt
            </strong>
            <span className="metric-label">respons rata-rata</span>
          </div>
        </div>
        <p className="metrics-footnote">
          *Garansi sesuai jenis layanan. Area dan jadwal konfirmasi saat pemesanan.
        </p>
      </div>
    </section>
  );
}
