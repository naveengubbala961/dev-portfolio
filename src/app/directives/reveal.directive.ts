import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';

/**
 * Adds a scroll-reveal animation to any element.
 *
 *   <div appReveal>…</div>          // reveals when scrolled into view
 *   <div [appReveal]="120">…</div>  // with a 120ms stagger delay
 *
 * The actual animation lives in styles.css (.reveal / .reveal.is-visible).
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  /** Optional stagger delay in milliseconds. */
  readonly appReveal = input<number | string>(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const el = this.host.nativeElement;
    el.classList.add('reveal');

    const delay = Number(this.appReveal()) || 0;
    if (delay > 0) {
      el.style.transitionDelay = `${delay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            this.observer?.unobserve(el);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
