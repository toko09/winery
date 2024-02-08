// line-translate.pipe.ts
import { Pipe, PipeTransform, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Pipe({
  name: 'lineTranslate',
  pure: false
})
export class LineTranslatePipe implements PipeTransform, OnDestroy {
  private translatedAromaSubject = new BehaviorSubject<string>('');
  translatedAroma$: Observable<string> = this.translatedAromaSubject.asObservable();
  private subscription: Subscription | undefined;

  constructor(private translocoService: TranslocoService, private cdr: ChangeDetectorRef) {}

  transform(aroma: string): string {
    this.updateTranslation(aroma);
    return this.translatedAromaSubject.value;
  }

  private updateTranslation(aroma: string): void {
    if (!aroma) {
      this.translatedAromaSubject.next('');
      return;
    }
    const aromaWords = aroma.split(', ');
    const translatedWords = aromaWords.map(word => this.translocoService.translate(word));
    const translatedAroma = translatedWords.join(', ');

    this.translatedAromaSubject.next(translatedAroma);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
