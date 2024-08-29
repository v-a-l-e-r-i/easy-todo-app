'use client'

import { FC, FormEventHandler, useState } from "react";
import { ITask } from "../../../types/task";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "../../../api";

interface TaskProps {
    task: ITask
}


const Task: FC<TaskProps> = ({ task }) => {
    const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
    const [modalOpenDelete, setModalOpenDelete] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
    const router = useRouter();
    
    const handlerSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        await editTodo({
            id: task.id,
            text: taskToEdit
        });
        setModalOpenEdit(false);
        router.refresh();
    }

    const handlerDeleteTodo = async (id: string) => {
        await deleteTodo(id);
        setModalOpenDelete(false);
        router.refresh();
    }

    return (
        <tr key={task.id}>
            <td>{task.text}</td>
            <td className="flex gap-5">
                <FiEdit onClick={ () => setModalOpenEdit(true)} cursor="pointer" className="text-blue-500" size={25}/>
                <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
                    <form onSubmit={handlerSubmitEditTodo}>
                        <h3 className="font-bold text-lg">Edit task</h3>
                        <div className="modal-action">
                            <input 
                                value={taskToEdit}
                                type="text" 
                                placeholder="Type here" 
                                onChange={e => setTaskToEdit(e.target.value)}
                                className="input input-bordered w-full max-w-xs" 
                            />
                            <button type="submit" className="btn btn-submit">Submit</button>
                        </div>
                    </form>
                </Modal>
                <FiTrash2 onClick={() => setModalOpenDelete(true)} cursor="pointer" className="text-red-500" size={25}/>
                <Modal modalOpen={modalOpenDelete} setModalOpen={setModalOpenDelete}>
                    <h3 className="text-lg">
                        Are you sure you want to delete this task?
                    </h3>
                    <div className="modal-action">
                        <button onClick={() => handlerDeleteTodo(task.id)} className="btn">
                            Yes
                        </button>
                    </div>
                </Modal>
            </td>
        </tr>
    )
}

export default Task;