<script lang="ts">
  // TODO: pravi IBAN udruge — dok je prazan string, prikazuje se mailto fallback
  const DONATION_IBAN: string = '';
  // TODO: potvrditi točan naziv primatelja za uplatnicu
  const DONATION_RECIPIENT = 'Udruga Radio Roža';

  const JOIN_MAILTO = `mailto:radio.rozari@gmail.com?subject=${encodeURIComponent('Pridružujem se')}`;
  const MIX_MAILTO = `mailto:glazba.radioroza@gmail.com?subject=${encodeURIComponent(
    'Šalji mjuzu — moj miks'
  )}`;
  const DONATE_MAILTO = `mailto:radio.rozari@gmail.com?subject=${encodeURIComponent('Donacija')}`;

  let copied = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout> | undefined;

  async function copyIban() {
    try {
      await navigator.clipboard.writeText(DONATION_IBAN);
      copied = true;
      clearTimeout(copyTimeout);
      copyTimeout = setTimeout(() => (copied = false), 2000);
    } catch {
      // Clipboard API nedostupan — IBAN ostaje vidljiv pa se može ručno kopirati
    }
  }

  $effect(() => () => clearTimeout(copyTimeout));
</script>

<section class="cta-section">
  <div class="cta-block">
    <h2 class="cta-title">pridruži nam se</h2>
    <svg
      class="cta-art"
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="miter"
    >
      <rect x="45" y="12" width="30" height="52" rx="15" vector-effect="non-scaling-stroke" />
      <line x1="45" y1="28" x2="75" y2="28" vector-effect="non-scaling-stroke" />
      <line x1="45" y1="38" x2="75" y2="38" vector-effect="non-scaling-stroke" />
      <line x1="45" y1="48" x2="75" y2="48" vector-effect="non-scaling-stroke" />
      <path d="M35 48 V56 A25 25 0 0 0 85 56 V48" vector-effect="non-scaling-stroke" />
      <line x1="60" y1="81" x2="60" y2="102" vector-effect="non-scaling-stroke" />
      <line x1="42" y1="102" x2="78" y2="102" vector-effect="non-scaling-stroke" />
    </svg>
    <p class="cta-body">
      Community radio ne radi se sam — radi ga zajednica, a to uključuje i tebe. Imaš ideju za
      emisiju? Odlično. Nemaš, ali znaš spojiti dva kabela, birati mjuzu za dnevnu rotaciju ili
      pisati o sceni? Još bolje. Iskustvo nije potrebno — dobra volja i malo slobodnog vremena
      sasvim su dovoljni.
    </p>
    <div class="cta-action-row">
      <a class="cta-action" href={JOIN_MAILTO}>javi nam se →</a>
    </div>
  </div>

  <div class="cta-block">
    <h2 class="cta-title">šalji mjuzu</h2>
    <svg
      class="cta-art"
      aria-hidden="true"
      viewBox="0 20 120 80"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="miter"
    >
      <rect x="10" y="30" width="100" height="60" vector-effect="non-scaling-stroke" />
      <rect x="34" y="44" width="52" height="24" vector-effect="non-scaling-stroke" />
      <circle cx="46" cy="56" r="8" vector-effect="non-scaling-stroke" />
      <circle cx="74" cy="56" r="8" vector-effect="non-scaling-stroke" />
      <circle cx="46" cy="56" r="2.5" vector-effect="non-scaling-stroke" />
      <circle cx="74" cy="56" r="2.5" vector-effect="non-scaling-stroke" />
      <path d="M32 90 L38 78 H82 L88 90" vector-effect="non-scaling-stroke" />
      <circle cx="16" cy="36" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="104" cy="36" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="16" cy="84" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="104" cy="84" r="1.5" fill="currentColor" stroke="none" />
    </svg>
    <p class="cta-body">
      Snimi vlastiti miks glazbe koja se ne čuje na komercijalnim stanicama i pošalji nam ga. Ako
      prođe naš strogi stručni žiri (dvoje ljudi i pas), vrtimo ga u eteru — program biraš ti, a ne
      algoritam.
    </p>
    <p class="cta-meta">u eteru utorkom i četvrtkom</p>
    <div class="cta-action-row">
      <a class="cta-action" href={MIX_MAILTO}>pošalji miks →</a>
    </div>
  </div>

  <div class="cta-block">
    <h2 class="cta-title">podrži nas</h2>
    <svg
      class="cta-art"
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="square"
      stroke-linejoin="miter"
    >
      <ellipse cx="58" cy="70" rx="38" ry="28" vector-effect="non-scaling-stroke" />
      <circle cx="61" cy="24" r="8" vector-effect="non-scaling-stroke" />
      <path d="M52 46 H70" vector-effect="non-scaling-stroke" />
      <path d="M38 46 L44 33 L52 42" vector-effect="non-scaling-stroke" />
      <ellipse cx="18" cy="66" rx="6" ry="10" vector-effect="non-scaling-stroke" />
      <circle cx="33" cy="60" r="2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="62" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="17" cy="70" r="1.3" fill="currentColor" stroke="none" />
      <line x1="36" y1="93" x2="36" y2="106" vector-effect="non-scaling-stroke" />
      <line x1="48" y1="97" x2="48" y2="106" vector-effect="non-scaling-stroke" />
      <line x1="70" y1="96" x2="70" y2="106" vector-effect="non-scaling-stroke" />
      <line x1="82" y1="92" x2="82" y2="106" vector-effect="non-scaling-stroke" />
      <path d="M96 66 C103 64 104 57 98 57" vector-effect="non-scaling-stroke" />
    </svg>
    <p class="cta-body">
      Radio djeluje iz ljubavi i čistog inata, i tako će ostati — s donacijom ili bez nje. Ali
      struja, server i pokoji novi kabel nažalost ne plaćaju se entuzijazmom. Ako ti se sviđa što
      radimo, počasti nas kavom; obećavamo da ćemo je potrošiti na radio.
    </p>
    {#if DONATION_IBAN}
      <div class="cta-action-row cta-iban-row">
        <div class="cta-iban-info">
          <span class="cta-iban">{DONATION_IBAN}</span>
          <span class="cta-meta">primatelj: {DONATION_RECIPIENT}</span>
        </div>
        <button type="button" class="cta-action" onclick={copyIban} aria-live="polite">
          {copied ? 'kopirano' : 'kopiraj'}
        </button>
      </div>
    {:else}
      <div class="cta-action-row">
        <a class="cta-action" href={DONATE_MAILTO}>počasti nas kavom →</a>
      </div>
    {/if}
  </div>
</section>

<style>
  .cta-section {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 2px solid var(--color-black);
  }

  .cta-block {
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
  }

  .cta-block + .cta-block {
    border-top: 2px solid var(--color-black);
  }

  .cta-title {
    font-family: var(--font-display);
    font-size: clamp(2.25rem, 3.5vw, 3rem);
    font-weight: 400;
    line-height: 1;
    margin-bottom: 1.25rem;
  }

  .cta-art {
    height: 7rem;
    width: auto;
    color: var(--color-black);
    margin-bottom: 1.25rem;
  }

  .cta-body {
    font-size: var(--text-body);
    color: rgb(0 0 0 / 0.7);
    line-height: 1.6;
  }

  .cta-meta {
    font-family: var(--font-mono);
    font-size: var(--text-meta);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 0.75rem;
  }

  .cta-action-row {
    margin-top: auto;
    padding-top: 1.5rem;
  }

  .cta-action {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    border: 2px solid var(--color-black);
    background: none;
    color: var(--color-black);
    font-size: var(--text-body);
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.15s ease;
  }

  .cta-action:hover {
    background: var(--color-brand);
    color: var(--color-white);
  }

  .cta-action:focus-visible {
    outline: 3px solid var(--color-brand);
    outline-offset: 2px;
  }

  .cta-iban-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.75rem 1rem;
  }

  .cta-iban-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .cta-iban {
    font-family: var(--font-mono);
    font-size: var(--text-body);
    letter-spacing: 0.05em;
    user-select: all;
  }

  .cta-iban-info .cta-meta {
    margin-top: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .cta-action {
      transition: none;
    }
  }

  /* ── Tablet (640px+) ── */
  @media (min-width: 640px) {
    .cta-block {
      padding: 2rem 1.5rem;
    }
  }

  /* ── Desktop (1024px+) ── */
  @media (min-width: 1024px) {
    .cta-section {
      grid-template-columns: repeat(3, 1fr);
    }

    .cta-block {
      padding: 2rem;
    }

    .cta-block + .cta-block {
      border-top: none;
      border-left: 2px solid var(--color-black);
    }
  }
</style>
