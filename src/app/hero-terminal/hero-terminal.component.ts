import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';

/** A single syntax-highlighted chunk of the typed-out code. */
interface Token {
  t: string;
  c?: 'kw' | 'var' | 'key' | 'str' | 'bool';
}

/** The snippet the terminal types out — a tiny "profile object". */
const CODE: Token[] = [
  { t: 'const ', c: 'kw' },
  { t: 'naveen', c: 'var' },
  { t: ' = {\n' },
  { t: '  role', c: 'key' },
  { t: ': ' },
  { t: "'Frontend Engineer'", c: 'str' },
  { t: ',\n' },
  { t: '  stack', c: 'key' },
  { t: ': [' },
  { t: "'Angular'", c: 'str' },
  { t: ', ' },
  { t: "'React'", c: 'str' },
  { t: ', ' },
  { t: "'TypeScript'", c: 'str' },
  { t: '],\n' },
  { t: '  available', c: 'key' },
  { t: ': ' },
  { t: 'true', c: 'bool' },
  { t: ',\n' },
  { t: '};' },
];

const TOTAL = CODE.reduce((n, tok) => n + tok.t.length, 0);

@Component({
  selector: 'app-hero-terminal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="term"
      role="img"
      aria-label="Naveen Gubbala — a Frontend Engineer working with Angular, React and TypeScript, available for work."
    >
      <div class="term__bar" aria-hidden="true">
        <span></span><span></span><span></span>
        <em class="term__file">naveen.ts</em>
      </div>
      <pre
        class="term__code"
        aria-hidden="true"
      >@for (p of visible(); track $index) {<span class="tk {{ p.c }}">{{ p.t }}</span>}<span class="cursor"></span></pre>
    </div>
  `,
  styles: `
    :host {
      display: block;
      max-width: 440px;
      margin-bottom: clamp(1.75rem, 5vw, 2.75rem);
    }
    .term {
      border: 1px solid var(--line);
      border-radius: 14px;
      background: var(--ink-2);
      overflow: hidden;
      box-shadow: 0 24px 60px -34px rgba(0, 0, 0, 0.85);
    }
    .term__bar {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 10px 14px;
      border-bottom: 1px solid var(--line);
    }
    .term__bar span {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      display: block;
    }
    .term__bar span:nth-child(1) { background: #e0625b; }
    .term__bar span:nth-child(2) { background: #e0b23f; }
    .term__bar span:nth-child(3) { background: #5fd28a; }
    .term__file {
      margin-left: 8px;
      font-style: normal;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      letter-spacing: 0.02em;
      color: var(--faint);
    }
    .term__code {
      margin: 0;
      padding: 16px 18px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      line-height: 1.75;
      color: var(--muted);
      white-space: pre-wrap;
      word-break: break-word;
      /* Reserve the final height so the hero layout doesn't jump while typing. */
      min-height: 9.5em;
    }
    .tk.kw { color: var(--muted); }
    .tk.var,
    .tk.key { color: var(--accent); }
    .tk.str { color: var(--accent-soft); }
    .tk.bool { color: #5fd28a; }
    .cursor {
      display: inline-block;
      width: 7px;
      height: 1.05em;
      margin-left: 2px;
      vertical-align: -2px;
      background: var(--accent);
      animation: term-blink 1s steps(1) infinite;
    }
    @keyframes term-blink {
      50% { opacity: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .cursor { animation: none; }
    }
  `,
})
export class HeroTerminalComponent {
  private readonly count = signal(0);

  /** Tokens sliced to however many characters have been "typed" so far. */
  protected readonly visible = computed<Token[]>(() => {
    let remaining = this.count();
    const parts: Token[] = [];
    for (const tok of CODE) {
      if (remaining <= 0) break;
      parts.push({ t: tok.t.slice(0, remaining), c: tok.c });
      remaining -= tok.t.length;
    }
    return parts;
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Runs in the browser only (skipped during any server render).
    afterNextRender(() => {
      const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        this.count.set(TOTAL); // Show the whole snippet at once — no typing.
        return;
      }

      const id = setInterval(() => {
        this.count.update((n) => Math.min(n + 1, TOTAL));
        if (this.count() >= TOTAL) {
          clearInterval(id);
        }
      }, 26);

      destroyRef.onDestroy(() => clearInterval(id));
    });
  }
}
