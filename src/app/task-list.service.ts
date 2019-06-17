interface ITask {
  id: number;
  title: string;
  author: string;
  desc: string;
  status: string;
}
export class TaskListService {
  private statusList: string[] = [];
  modalData: any = {};
  private taskList: ITask[] = [
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
  getTasks = (): ITask[] => this.taskList;
  getStatuses = (): string[] => {
    this.taskList.forEach(task => !this.statusList.includes(task.status) ? this.statusList.push(task.status) : false );
    return this.statusList;
  }
  setModalData(taskInfo: ITask) {
    this.modalData = taskInfo;
  }
  moveTask(task: ITask, val: string) {
    this.taskList.filter(item => item.id === task.id)[0].status = val;
  }
  deleteTask(task: ITask) {
    this.taskList.splice(this.taskList.map(item => item.id).indexOf(task.id), 1);
  }
  createNewTask(task: ITask) {
    this.taskList.push(task);
  }
  createNewStatus(status: any) {
    this.statusList.push(status);
  }
  updateTask(task: ITask) {
    console.log(task)
  }
}
