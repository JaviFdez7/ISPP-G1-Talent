import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Modal from 'react-modal';
import { handleNetworkError } from "../../components/TokenExpired";
import { useNavigate } from "react-router-dom";

const DeleteHistoryButton = ({ history, toggleText = false, setErrorMessage }) => {
    const [showModal, setShowModal] = useState(false);
    const apiURL = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate();

    async function deleteHistoryEntry() {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("access_token");
        const uri = `/user/${userId}/history/${history._id}`;
        if (history.favorite) {
            const favUri = `/user/${userId}/history/${history._id}/favorite`;
            try {
                await axios.patch(apiURL + favUri, {}, {
                    headers: {
                        'Authorization': `${token}`
                    }
                });
            } catch (error) {
                handleNetworkError(error, navigate);
                return;
            }
        }
        try {
            const response = await axios.delete(apiURL + uri, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            if (response.status === 200) {
                setErrorMessage(null);
                setShowModal(false);
                window.location.reload()
            } else {
                setErrorMessage('Deletion failed. Please try again.');
            }
        } catch (error) {
            handleNetworkError(error, navigate)
        }
    }

    const handleCancel = () => {
        setShowModal(false);
    }

    const handleConfirm = () => {
        deleteHistoryEntry();
    }

    return (
        <>
            <button
                onClick={() => setShowModal(true)}
                className="flex items-center text-white transition-colors duration-300 hover:text-red-600 bg-transparent border-none rounded-full p-2"
                style={{ width: "40px", height: "40px" }}
            >
                <div className="bg-transparent hover:bg-red-500 hover:bg-opacity-50 rounded-lg duration-300 p-2">
                    <FontAwesomeIcon icon={faTrash} style={{ color: "gray" }} />
                </div>
                {toggleText && (
                    <span className="ml-2">Delete</span>
                )}
            </button>

            <Modal
                isOpen={showModal}
                onRequestClose={handleCancel}
                contentLabel="Delete Confirmation"
                style={{
                    content: {
                        width: '40%',
                        height: '20%',
                        margin: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'var(--talent-secondary)',
                        borderRadius: '10px',
                        color: 'white',
                    },
                }}
            >
                <h2 style={{ marginBottom: '3%' }}>Are you sure you want to delete this analysis history entry?</h2>
                <div>
                    <button
                        onClick={handleConfirm}
                        style={{
                            marginRight: '10px',
                            padding: '10px',
                            backgroundColor: 'var(--talent-highlight)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    >
                        Yes
                    </button>
                    <button
                        onClick={handleCancel}
                        style={{
                            padding: '10px',
                            backgroundColor: 'var(--talent-black)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px'
                        }}
                    >
                        No
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default DeleteHistoryButton;