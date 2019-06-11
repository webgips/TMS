import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() taskInfo: object

  constructor() {}

  ngOnInit() {

  }

}
