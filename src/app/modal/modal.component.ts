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
  @Output() ChangeStatus = new EventEmitter<any>();
  @Output() NewTaskSubmit = new EventEmitter<any>();
  @Output() NewStatusSubmit = new EventEmitter<any>();
  @Output() updateTaskSubmit = new EventEmitter<any>();

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
    this.ChangeStatus.emit(e);
  }
  submit(e: any) {
    if (e.target.id === 'new-task-form') {
      this.NewTaskSubmit.emit(e);
      this.close();
    }
    if (e.target.id === 'new-status-form') {
      this.NewStatusSubmit.emit(e);
      this.close();
    }
    if (e.target.id === 'edit-task-form') {
      this.updateTaskSubmit.emit(e);
      this.close();
      console.log(e)
    }
  }
  open(): void {
    this.element.style.display = 'block';
    this.visible = true;
    document.querySelector('body').classList.add('show-modal');
  }

  close(): void {
    this.element.style.display = 'none';
    this.visible = false;
    document.querySelector('body').classList.remove('show-modal');
  }
}
