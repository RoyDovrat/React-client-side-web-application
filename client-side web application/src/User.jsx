import { useState } from 'react';
import { updateItem, deleteItem } from './utils';
import './Style.css';
import OtherData from './OtherData';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'


function User({ user, onUpdate, onDelete, setToggleHighlight, toggleHighlight, todos }) {
    const [showOtherData, setShowOtherData] = useState(false);
    const [updatedUserData, setUpdatedUserData] = useState(user);

    const hasIncompleteTasks = () => {
        return todos.some((todo) => todo.userId === user.id && !todo.completed);
    };

    const updateUser = async () => {
        const updatedData = {
            ...updatedUserData,
            address: {
                street: updatedUserData.address?.street || '',
                city: updatedUserData.address?.city || '',
                zipcode: updatedUserData.address?.zipcode || '',
            },
        };
        const { data } = await updateItem(USERS_URL, user.id, updatedData);
        console.log(data)
        onUpdate(user.id, data)
    }

    const deleteUser = async () => {
        const { data } = await deleteItem(USERS_URL, user.id)
        console.log(data)
        onDelete(user.id)
        setToggleHighlight(false)
    }


    return (
        <div
            className={`user-container ${hasIncompleteTasks() ? 'incomplete' : ''} ${(toggleHighlight.id === user.id && toggleHighlight.toggle) ? 'highlighted' : '' }`}
        >
            <p>
                <span className="user-info-label" onClick={() =>
                    setToggleHighlight((prev) => ({
                        id: user.id,
                        toggle: prev.id === user.id ? !prev.toggle : true
                    }))
                }>
                    ID:
                </span>
                <span >{user.id}</span>
            </p>

            <p>
                <span className="user-info-label">Name:</span>
                <input
                    type="text"
                    value={updatedUserData.name}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, name: e.target.value })}
                    className="user-data"
                />
            </p>

            <p>
                <span className="user-info-label">Email:</span>
                <input
                    type="text"
                    value={updatedUserData.email}
                    onChange={(e) => setUpdatedUserData({ ...updatedUserData, email: e.target.value })}
                    className="user-data"
                />
            </p>

            <div className="buttons-container">
                <button
                    className="button other-data"
                    onMouseEnter={() => setShowOtherData(true)}
                    onClick={() => setShowOtherData(false)}
                >
                    Other Data
                </button>

                {showOtherData && (<OtherData key={user.id} user={updatedUserData} setUpdatedUserData={setUpdatedUserData} />)}

                <button className="button update" onClick={updateUser}>Update</button>
                <button className="button delete" onClick={deleteUser}>Delete</button>
            </div>
        </div>
    );
}

export default User;
