import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './services/flowbite.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly flowbite: FlowbiteService,
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.flowbite.loadFlowbite(() => {
        initFlowbite();
      });
    });
  }
}
