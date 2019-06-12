import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ModalService } from './modal.service'
import { TaskListService } from '../task-list.service'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() id: string;
  @Input() visible: boolean = false;
  @Input() taskInfo: object
  private element: any;
  private statuses: any[] = [];
  constructor(private modalService: ModalService, private taskListService: TaskListService,  private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    let modal = this;
    
    this.element.addEventListener('click', function (e: any) {
        if (e.target.className === 'modal__wrap') {
            modal.close();
        }
    });
    this.modalService.add(this);
    this.statuses = this.taskListService.getStatuses()
  }
  setData(modalData): void{
    this.taskInfo = modalData
    console.log(this.taskInfo)
  }
  open(): void {
    this.element.style.display = 'block';
    this.visible = true;
  }

  close(): void {
      this.element.style.display = 'none';
      this.visible = false;
  }
  onChange(e: any){
    console.log(e.target.value)
    this.taskListService.moveTask(this.taskInfo,e.target.value)
  }
}
