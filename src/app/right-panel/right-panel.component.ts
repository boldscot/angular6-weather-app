import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.css']
})
export class RightPanelComponent implements OnInit {
  time: string;
  date: string;

  constructor() {
    this.time = new Date().toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    this.date = new Date().toLocaleDateString('ire', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }

  ngOnInit() {
    setInterval(()=> {
      this.time = new Date().toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })}, 1000);
  }
}
