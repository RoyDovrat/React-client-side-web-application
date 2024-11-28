import { useState } from 'react'


function Todo({ todo, markCompleted }) {

    const handleMarkAsCompleted = () => {
        markCompleted(todo.id);
    };


    return (
        <div className="todo-container">
            <p>
                <span className="user-info-label">Title:</span>
                {todo.title}
            </p>

            <p>
                <span className="user-info-label">Completed:</span>
                {todo.completed.toString()}
                {!todo.completed && (
                    <button className="button update" onClick={handleMarkAsCompleted} style={{ marginLeft: '100px' }}>
                        Mark Completed
                    </button>
                )}
            </p>



        </div>
    )
}

export default Todo
