import { useState } from 'react'

function NewUser({ setToggleAddUser, addNewUser }) {
    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')

    const cancelNewUser= () => {
        setToggleAddUser(false)
    }

    const addUser = () => {
        const obj = {
            name: newName,
            email: newEmail
        };

        addNewUser(obj)
    }

    return (
        <div>
            <span className="user-info-label">Name:</span>
            <input type="text" onChange={(e) => setNewName(e.target.value)} /> <br /> <br />

            <span className="user-info-label">Email:</span>
            <input type="email" onChange={(e) => setNewEmail(e.target.value)} /> <br />

            <div className="buttons-new-todo">
                <button className="button cancel" onClick={cancelNewUser}>Cancel</button>
                <button className="button add" onClick={addUser}>Add</button>
            </div>
        </div>
    )
}

export default NewUser
