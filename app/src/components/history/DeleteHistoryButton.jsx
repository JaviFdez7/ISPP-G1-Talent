import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const DeleteHistoryButton = ({ history, toggleText = false }) => {
    const [errorMessage, setErrorMessage] = useState(null);

    const apiURL = import.meta.env.VITE_BACKEND_URL;

    async function changeFavorites(userId) {
        const uri = `/user/${userId}/history/${history._id}`;
        try {
            const response = await axios.delete(apiURL + uri);
            setErrorMessage(null);
            return response;
        } catch (error) {
            setErrorMessage('Unable to connect to the server. Please try again later.');
            console.error("Error deleting history favorite state:", error);
            throw error;
        }
    }

    const handleDeletion = () => {
        const userId = localStorage.getItem("userId");
        changeFavorites(userId);
    };

    return (
        <button
            onClick={handleDeletion}
            className="flex items-center text-white transition-colors duration-300 hover:text-red-600 bg-transparent border-none rounded-full p-2"
            style={{ width: "40px", height: "40px" }}
        >
            <div className="bg-transparent hover:bg-red-500 hover:bg-opacity-50 rounded-full p-2">
                <FontAwesomeIcon icon={faTrash} style={{ color: "gray" }} />
            </div>
            {toggleText && (
                <span className="ml-2">Delete</span>
            )}
            {errorMessage && (
                <div className="text-center text-red-600">
                    {errorMessage}
                </div>
            )}
        </button>
    );
}

export default DeleteHistoryButton;