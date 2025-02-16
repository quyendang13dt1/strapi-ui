import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-iframe',
  imports: [CommonModule],
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements OnInit {
  @Input() src: string;
  @Input() styleObj: string = 'zoom: 0.56';
  iframeSrc: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
  }
}
