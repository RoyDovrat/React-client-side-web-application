import { useState } from 'react'

function NewTodo({ toggleHighlight, setToggleAddTodo, addNewTodo }) {
    const [newTitle, setNewTitle] = useState('')

    const cancelNewTodo = () => {
        setToggleAddTodo(false)
    }

    const addTodo = () => {
        const obj = {
            title: newTitle,
            userId: toggleHighlight.id,
            completed: false,
        };

        addNewTodo(obj)
    }

    return (
        <div>
            <span className="user-info-label">Title:</span>
            <input type="text" onChange={(e) => setNewTitle(e.target.value)} /> <br />

            <div className="buttons-new-todo">
                <button className="button cancel" onClick={cancelNewTodo}>Cancel</button>
                <button className="button add" onClick={addTodo}>Add</button>
            </div>
        </div>
    )
}

export default NewTodo
