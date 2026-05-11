<section class="cta-section">
  <div class="cta-block">
    <h2 class="cta-title">podrži nas</h2>
    <div class="cta-image" aria-hidden="true"></div>
    <p class="cta-body"><!-- content TBD --></p>
  </div>
  <div class="cta-block">
    <h2 class="cta-title">pridruži se</h2>
    <div class="cta-image" aria-hidden="true"></div>
    <p class="cta-body"><!-- content TBD --></p>
  </div>
</section>

<style>
  .cta-section {
    display: grid;
    grid-template-columns: 1fr;
  }

  .cta-block {
    padding: 0 2rem;
    margin: 2rem 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .cta-block + .cta-block {
    border-top: 2px solid var(--color-black);
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: var(--text-display);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 1rem;
    margin-top: 1.5rem;
  }

  .cta-body {
    font-size: var(--text-body);
    color: rgb(0 0 0 / 0.7);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .cta-image {
    margin-top: auto;
    aspect-ratio: 4 / 3;
    background: rgb(0 0 0 / 0.07);
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .cta-title {
      margin-top: 0;
    }

    .cta-section {
      grid-template-columns: 1fr 1fr;
    }

    .cta-block + .cta-block {
      border-top: none;
      border-left: 2px solid var(--color-black);
    }
  }
</style>
