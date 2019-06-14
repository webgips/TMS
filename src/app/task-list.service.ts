export class TaskListService {
  private statusList: string[] = [];
  modalData: any = {};
  private taskList: { id: number, title: string, author: string, desc: string, status: string }[] = [
    {
      id: 0,
      title: 'task 1',
      author: 'Petya',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'To do'
    },
    {
      id: 1,
      title: 'task 2',
      author: 'Alex',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'To do'
    },
    {
      id: 2,
      title: 'task 3',
      author: 'Alex',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Doing'
    },
    {
      id: 3,
      title: 'task 4',
      author: 'Vasya',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Doing'
    },
    {
      id: 4,
      title: 'task 5',
      author: 'Petya',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Done'
    },
    {
      id: 5,
      title: 'task 6',
      author: 'Alex',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Done'
    },
    {
      id: 6,
      title: 'task 7 new',
      author: 'masha',
      desc: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
      status: 'Done'
    }
  ];
  getTasks = (): { title: string, author: string, desc: string }[] => this.taskList;
  getStatuses = (): string[] => {
    this.taskList.forEach(task => !this.statusList.includes(task.status) ? this.statusList.push(task.status) : false );
    return this.statusList;
  }
  setModalData(taskInfo: any) {
    this.modalData = taskInfo;
  }
  getModalData = () => this.modalData;
  moveTask(task: any, val: string) {
    this.taskList.filter(item => item.id === task.id)[0].status = val;
  }
  deleteTask(task: any) {
    this.taskList.splice(this.taskList.map(item => item.id).indexOf(task.id), 1);
  }
  createNewTask(task: any) {
    this.taskList.push(task);
  }
  createNewStatus(status: any) {
    this.statusList.push(status);
  }
}
