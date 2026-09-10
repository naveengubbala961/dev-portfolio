import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RevealDirective } from './directives/reveal.directive';
import {
  experience,
  profile,
  projects,
  sections,
  skills,
} from './data/portfolio.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit, OnDestroy {
  // Content (exposed to the template)
  protected readonly profile = profile;
  protected readonly skills = skills;
  protected readonly projects = projects;
  protected readonly experience = experience;
  protected readonly sections = sections;
  protected readonly year = new Date().getFullYear();

  // Reactive UI state
  protected readonly scrolled = signal(false);
  protected readonly activeSection = signal<string>('');

  private readonly doc = inject(DOCUMENT);
  private spy?: IntersectionObserver;

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(this.doc.defaultView!.scrollY > 24);
  }

  ngAfterViewInit(): void {
    // Scrollspy: highlight the nav link for whichever section is in view.
    this.spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    for (const { id } of this.sections) {
      const el = this.doc.getElementById(id);
      if (el) {
        this.spy.observe(el);
      }
    }
  }

  ngOnDestroy(): void {
    this.spy?.disconnect();
  }

  /**
   * "Get in touch" — device-aware:
   *   • On phones/tablets → opens the native dial pad (tel:).
   *   • On desktop        → opens WhatsApp Web with a prefilled message.
   */
  protected getInTouch(event: Event): void {
    event.preventDefault();

    const win = this.doc.defaultView!;
    const ua = win.navigator.userAgent;
    const isMobile =
      /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile/i.test(ua) ||
      win.matchMedia('(pointer: coarse)').matches;

    if (isMobile) {
      win.location.href = `tel:+${this.profile.phone}`;
      return;
    }

    const text = encodeURIComponent(
      `Hi ${this.profile.brandFirst}, I came across your portfolio and would love to connect!`,
    );
    win.open(
      `https://web.whatsapp.com/send?phone=${this.profile.phone}&text=${text}`,
      '_blank',
      'noopener',
    );
  }
}
