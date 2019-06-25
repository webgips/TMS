import ITask from './ITask';

export default interface IBoard {
    id: number;
    name: string;
    tasks: ITask[];
}