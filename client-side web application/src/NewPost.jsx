import { useState } from 'react'

function NewPost({ toggleHighlight, setAddPostVisible, addNewPost }) {
    const [newTitle, setNewTitle] = useState('')
    const [newBody, setNewBody] = useState('')

    const cancelNewPost = () => {
        setAddPostVisible(false)
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
            <input type="text" onChange={(e) => setNewBody(e.target.value)} /> 

            <div className="buttons-new-todo">
                <button className="button cancel" onClick={cancelNewPost}>Cancel</button>
                <button className="button add" onClick={addPost}>Add</button>
            </div>
        </div>
    )
}

export default NewPost
