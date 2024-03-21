import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const DeleteHistoryButton = ({ history, toggleText = false , triggerUpdate, setErrorMessage}) => {

    const apiURL = import.meta.env.VITE_BACKEND_URL;

    async function deleteHistoryEntry() {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("access_token");
        const uri = `/user/${userId}/history/${history._id}`;
        try {
            const response = await axios.delete(apiURL + uri, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            setErrorMessage(null);
            triggerUpdate();
            return response;
        } catch (error) {
            setErrorMessage('Deletion failed. Maybe you should log in again and try then.');
            console.error("Error deleting history entry:", error);
            throw error;
        }
    }

    return (
        <button
            onClick={deleteHistoryEntry}
            className="flex items-center text-white transition-colors duration-300 hover:text-red-600 bg-transparent border-none rounded-full p-2"
            style={{ width: "40px", height: "40px" }}
        >
            <div className="bg-transparent hover:bg-red-500 hover:bg-opacity-50 rounded-full p-2">
                <FontAwesomeIcon icon={faTrash} style={{ color: "gray" }} />
            </div>
            {toggleText && (
                <span className="ml-2">Delete</span>
            )}
        </button>
    );
}

export default DeleteHistoryButton;