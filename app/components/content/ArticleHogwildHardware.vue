<template>
  <Expand :width="840">
    <section class="not-prose my-8" aria-label="Hogwild hardware and purchase prices">
      <div class="mb-5 flex items-baseline justify-between gap-4">
        <span class="text-lg text-highlighted">🐷 Hogwild</span>
        <span class="font-mono text-xl text-primary">A$2,773.00</span>
      </div>
      <div class="hardware">
        <figure class="computer">
          <div class="product-image">
            <img src="/blog/hogwild/minisforum-ms02-ultra.png" width="1182" height="1500" loading="lazy" alt="Minisforum MS-02 Ultra mini PC">
          </div>
          <figcaption><span>Minisforum MS-02 Ultra</span><strong>A$1,639.00</strong></figcaption>
        </figure>
        <figure>
          <div class="product-image">
            <img src="/blog/hogwild/kingston-kc3000.png" width="300" height="225" loading="lazy" alt="Kingston KC3000 SSD">
          </div>
          <figcaption><span>Kingston KC3000<small>2 TB · PCIe Gen4 NVMe</small></span><strong>A$535.00</strong></figcaption>
        </figure>
        <figure>
          <div class="product-image">
            <img src="/blog/hogwild/crucial-ddr5.png" width="300" height="225" loading="lazy" alt="Crucial DDR5 memory">
          </div>
          <figcaption><span>Crucial DDR5<small>32 GB · 5600 · CL46</small></span><strong>A$599.00</strong></figcaption>
        </figure>
      </div>
    </section>
  </Expand>
</template>

<style scoped>
.hardware { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; }
figure { min-width: 0; margin: 0; }
.computer { grid-row: span 2; display: flex; flex-direction: column; }
.product-image { display: flex; align-items: center; justify-content: center; overflow: hidden; border-radius: 0.5rem; background: white; }
.product-image img { display: block; width: auto; height: auto; max-width: 100%; max-height: 160px; object-fit: contain; }
.computer .product-image { flex: 1; }
.computer img { max-height: 340px; }
figcaption { display: flex; justify-content: space-between; gap: 1rem; margin-top: 0.75rem; font-size: 0.875rem; color: var(--ui-text-highlighted); }
figcaption strong { flex-shrink: 0; font-family: var(--font-mono); font-weight: 500; color: var(--ui-primary); }
figcaption small { display: block; margin-top: 0.25rem; color: var(--ui-text-muted); }
@media (max-width: 600px) {
  .hardware { grid-template-columns: 1fr; }
  .computer { grid-row: auto; }
  .computer img { max-height: 260px; }
}
</style>
