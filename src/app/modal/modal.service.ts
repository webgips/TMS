import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalData = {}
  constructor() { }
  setModalData(taskInfo: object){
    this.modalData = taskInfo
    console.log(this.modalData)
  }
  getModalData = () => this.modalData
}
