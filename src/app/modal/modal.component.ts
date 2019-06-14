import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() visible = false;
  @Output() onChangeStatus = new EventEmitter<any>();
  @Output() onNewTaskSubmit = new EventEmitter<any>();
  @Output() onNewStatusSubmit = new EventEmitter<any>();

  private element: any;
  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    this.element.addEventListener('click', (e: any) => {
      if (e.target.className === 'modal__wrap') {
        modal.close();
      }
    });
    document.addEventListener('keyup', (e: any) => {
      if (e.key === 'Escape') {
        modal.close();
      }
    });
    this.modalService.add(this);
  }
  inputChange(e: any) {
    this.onChangeStatus.emit(e);

  }
  submit(e: any) {
    console.log(e.target.id);
    if (e.target.id === 'new-task-form') {
      this.onNewTaskSubmit.emit(e);
      this.close();
    }
    if (e.target.id === 'new-status-form') {
      this.onNewStatusSubmit.emit(e);
      this.close();
    }


  }
  open(): void {
    this.element.style.display = 'block';
    this.visible = true;
    document.querySelector('body').classList.add('show-popup');
  }

  close(): void {
    this.element.style.display = 'none';
    this.visible = false;
    document.querySelector('body').classList.remove('show-popup');
  }
}
