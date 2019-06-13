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
  open(id: string) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.open();
  }

  close(id: string) {
      let modal: any = this.modals.filter(x => x.id === id)[0];
      modal.close();
  }
}
