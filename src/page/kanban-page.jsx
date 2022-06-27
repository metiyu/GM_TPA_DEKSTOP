import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { useParams } from "react-router-dom";
import Column from "../component/list";
import { db } from "../config/firebaseConfig";

const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: 'Take out the garbage' },
        'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        'task-3': { id: 'task-3', content: 'Charge my phone' },
        'task-4': { id: 'task-4', content: 'Cook dinner' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: []
        }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default function MakeKanban() {
    const [data, setData] = useState(initialData)
    const [lists, setLists] = useState([])
    const [cards, setCards] = useState([])
    const { wID, bID } = useParams()

    useEffect(() => {
        if (bID) {
            const q = query(collection(db, "workspaces", wID, "boards", bID, "lists"));
            onSnapshot(q, (docs) => {
                let array = []
                docs.forEach(doc => {
                    array.push({ ...doc.data(), id: doc.id });
                });
                setLists(array)
            })
        }
    }, [bID])

    function handleOnDragEnd(result) {
        const { destination, source, draggableId } = result
        if (!destination) return
        if (destination.droppableId === source.droppableId && destination.index === source.index) return

        if (destination.droppableId === source.droppableId) {
            const listIndex = lists
        }

        const start = data.columns[source.droppableId]
        const finish = data.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn
                }
            }

            setData(newState)
            return
        }

        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }

        setData(newState)
    }

    return (
        <div>
            <DragDropContext>
                <div className="flex gap-4 px-4">
                    {lists.map((list) => {
                        // const column = lists.columns[listId]
                        // const tasks = column.taskIds.map(
                            // taskId => data.tasks[taskId]
                        // )
                        return (
                            <Column key={list.id} list={list}></Column>
                        )
                    })}
                </div>
            </DragDropContext>
        </div>
    )
}

