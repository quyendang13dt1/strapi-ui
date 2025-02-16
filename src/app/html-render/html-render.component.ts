import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-html-render',
  imports: [CommonModule],
  templateUrl: './html-render.component.html',
  styleUrl: './html-render.component.scss',
})
export class HtmlRenderComponent implements OnChanges {
  safeHtml: SafeHtml;
  @Input() stringHtml: string = '';
  data = new BehaviorSubject('');

  constructor(private sanitizer: DomSanitizer) {
    this.data.pipe(debounceTime(300)).subscribe((value) => {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.stringHtml);
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    this.data.next('');
  }
}
