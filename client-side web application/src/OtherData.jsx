
function OtherData({ user, setUpdatedUserData }) {
    return (
        <div className="OtherData-container">
            <p>
                <span className="user-info-label">Street:</span>
                <input
                    type="text"
                    value={user.address.street}
                    onChange={(e) =>
                        setUpdatedUserData((prev) => ({
                            ...prev,
                            address: {
                                ...prev.address,
                                street: e.target.value,
                            },
                        }))
                    }
                    className="user-data"
                />
            </p>

            <p>
                <span className="user-info-label">City:</span>
                <input
                    type="text"
                    value={user.address.city}
                    onChange={(e) =>
                        setUpdatedUserData((prev) => ({
                            ...prev,
                            address: {
                                ...prev.address,
                                city: e.target.value,
                            },
                        }))
                    }
                    className="user-data"
                />
            </p>

            <p>
                <span className="user-info-label">Zip Code:</span>
                <input
                    type="text"
                    value={user.address.zipcode}
                    onChange={(e) =>
                        setUpdatedUserData((prev) => ({
                            ...prev,
                            address: {
                                ...prev.address,
                                zipcode: e.target.value,
                            },
                        }))
                    }
                    className="user-data"
                />
            </p>
        </div>
    );
}

export default OtherData;
