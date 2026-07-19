<article class="article-card" aria-hidden="true">
  <div class="card-image"></div>
  <div class="card-body">
    <div class="skeleton skeleton-date"></div>
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-title skeleton-title--short"></div>
    <div class="skeleton skeleton-excerpt"></div>
    <div class="skeleton skeleton-excerpt skeleton-excerpt--short"></div>
    <div class="skeleton skeleton-tag"></div>
  </div>
</article>

<style>
  /* Dimenzije prate ArticleCard da zamjena skeletona sadržajem ne pomiče grid. */
  .article-card {
    display: flex;
    flex-direction: column;
    background-color: var(--color-bg);
    padding: 4px 12px;
  }

  .card-image {
    aspect-ratio: 4 / 3;
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    padding: 0.5rem 0 1rem;
    flex: 1;
  }

  .skeleton {
    border-radius: 2px;
  }

  .skeleton,
  .card-image {
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
    height: var(--text-title, 1.25rem);
    width: 90%;
  }

  .skeleton-title--short {
    width: 60%;
  }

  .skeleton-excerpt {
    height: var(--text-body, 1rem);
    width: 100%;
  }

  .skeleton-excerpt--short {
    width: 75%;
  }

  .skeleton-tag {
    height: 1.4rem;
    width: 4.5rem;
    margin-top: auto;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
