import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalData = {}
  private modals: any[] = [];
  constructor() { }
  add(modal: any) {
      this.modals.push(modal);
  }
  setModalData(taskInfo: object){
    this.modalData = taskInfo
  }
  getModalData = () => this.modalData

  open(id: string) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.open();
      modal.setData(this.modalData)
  }

  close(id: string) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
  }
}
