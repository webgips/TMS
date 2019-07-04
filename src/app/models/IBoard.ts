import ITask from './ITask';

export default interface IBoard {
    id: string;
    name: string;
    statuses: [
        {
            name: string;
            tasks: ITask[];
        }
    ]
}
