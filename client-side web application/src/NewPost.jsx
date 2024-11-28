import { useState } from 'react'

function NewPost({ toggleHighlight, setToggleAddPost, addNewPost }) {
    const [newTitle, setNewTitle] = useState('')
    const [newBody, setNewBody] = useState('')

    const cancelNewPost = () => {
        setToggleAddPost(false)
    }

    const addPost = () => {
        const obj = {
            title: newTitle,
            userId: toggleHighlight.id,
            body: newBody,
        };

        addNewPost(obj)
    }

    return (
        <div>
            <span className="user-info-label">Title:</span>
            <input type="text" onChange={(e) => setNewTitle(e.target.value)} /> <br /> <br />

            <span className="user-info-label">Body:</span>
            <input type="text" onChange={(e) => setNewBody(e.target.value)} /> <br />

            <div className="buttons-new-todo">
                <button className="button cancel" onClick={cancelNewPost}>Cancel</button>
                <button className="button add" onClick={addPost}>Add</button>
            </div>
        </div>
    )
}

export default NewPost
