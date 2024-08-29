import { FC } from "react";
import { ITask } from "../../../types/task";
import Task from "./Task";

interface TodoListProps {
    tasks: ITask[]
}

const TodoList: FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th>TASK</th>
                    <th>ACTION</th>
                </tr>
                </thead>
                <tbody>
                    {tasks.map(task => (
                        <Task key={task.id} task={task}/>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;