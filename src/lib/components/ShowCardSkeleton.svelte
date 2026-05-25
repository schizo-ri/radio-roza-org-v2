<article class="show-card">
  <div class="card-image-link skeleton-image" aria-hidden="true"></div>
  <div class="card-body">
    <div class="skeleton skeleton-date"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-title skeleton-title--short"></div>
    <div class="skeleton skeleton-tag"></div>
  </div>
</article>

<style>
  .show-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg);
    padding: 8px;
  }

  .card-image-link {
    display: block;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: 0.5rem;
    padding: 0.5rem 0 0.75rem;
  }

  .skeleton {
    border-radius: 2px;
    background: linear-gradient(
      90deg,
      rgb(0 0 0 / 0.08) 25%,
      rgb(0 0 0 / 0.14) 50%,
      rgb(0 0 0 / 0.08) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.6s ease-in-out infinite;
  }

  .skeleton-image {
    background: linear-gradient(
      90deg,
      rgb(0 0 0 / 0.08) 25%,
      rgb(0 0 0 / 0.14) 50%,
      rgb(0 0 0 / 0.08) 75%
    );
    background-size: 200% 100%;
    animation: shimmer 1.6s ease-in-out infinite;
  }

  .skeleton-date {
    height: var(--text-meta, 0.75rem);
    width: 5rem;
  }

  .skeleton-title {
    height: var(--text-card, 1rem);
    width: 90%;
  }

  .skeleton-title--short {
    width: 65%;
  }

  .skeleton-tag {
    height: 1.4rem;
    width: 4rem;
    margin-top: auto;
    border-radius: 2px;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
</style>
