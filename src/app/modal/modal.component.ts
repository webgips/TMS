import { Component, ElementRef, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from './modal.service'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() visible: boolean = false;
  @Output() onChangeStatus = new EventEmitter<any>();
  @Output() onNewTaskSubmit = new EventEmitter<any>();

  private element: any;
  constructor(private modalService: ModalService,   private el: ElementRef) {
    this.element = el.nativeElement;
  }
  
  ngOnInit(): void {
    let modal = this;
    
    this.element.addEventListener('click', function (e: any) {
        if (e.target.className === 'modal__wrap') {
            modal.close();
        }
    });
    this.modalService.add(this);
  }
  inputChange(e: any) {
    this.onChangeStatus.emit(e);
    
  }
  submit(e: any){
    this.onNewTaskSubmit.emit(e)
    this.close()
  }
  open(): void {
    this.element.style.display = 'block';
    this.visible = true;
  }

  close(): void {
      this.element.style.display = 'none';
      this.visible = false;
  }
}
