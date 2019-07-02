import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = [];
  constructor() { }
  add(modal: any) {
    this.modals.push(modal);
  }
  clearAll() {
    // const newboardmodal = this.modals.filter(x => x.id ===  'new-board-modal')[0];
    this.modals = [];
    // this.modals.push(newboardmodal);
  }
  open(id: string) {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open();
  }
  close(id: string) {
    const modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
  closeAll() {
    this.modals.forEach(modal => modal.close(modal.id));
  }
}
