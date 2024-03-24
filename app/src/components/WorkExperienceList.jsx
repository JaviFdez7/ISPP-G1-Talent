import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import MainButton from './mainButton';
import SecondaryButton from './secondaryButton';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';


const WorkExperienceList = ({ experience }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  let navigate = useNavigate()

  function deleteProffesionalExperience(id) {
    setSelectedId(id);
    setShowModal(true);
  }

  async function handleConfirm() {
    const token = localStorage.getItem('access_token');
    await fetch(
      import.meta.env.VITE_BACKEND_URL + `/professional-experience/${selectedId}/`, {
      method: "DELETE",
      headers: {
        'Authorization': `${token}`
      }
    });
    navigate("/candidate/detail");
    setShowModal(false);
    window.location.reload()

  }

  function handleCancel() {
    navigate("/candidate/detail");
    setShowModal(false);
  }

  //console.log(experience.map((item, index) => ( item._id))+ 'idwdwdd')

  return (
    <div className='w-9/12 self-center mx-auto' style={{ marginBottom: '3rem', marginTop: '3rem' }}>
      {experience.map((item, index) => (
        <div key={index} className='flex justify-between'>
          <div className='p-4 rounded-lg bg-black bg-opacity-70 transition-colors duration-300 hover:bg-gray-700 mb-2 border-b border-t border-gray-900 mx-auto w-full' style={{ borderColor: 'yellow' }}>
            <div className='flex-col relative'>
              <Link className='block text-white' to={`/candidate/professional-experience/detail`}>
                <div className='flex flex-col lg:flex-row justify-start items-center'>
                  <div className='flex items-center'>
                    <h6 className='text-white py-1 px-2 rounded-lg mb-2' style={{ backgroundColor: 'var(--talent-highlight)' }}>
                      {item.companyName}
                    </h6>
                    <h6 className='text-xl text-white ml-8'>{item.professionalArea}</h6>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className='ml-auto flex'>
            {MainButton("Update", "/candidate/professional-experience/edit", "")}
            {SecondaryButton("Delete", "/", () => deleteProffesionalExperience(item._id))}
          </div>
        </div>
      ))}
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
        <h2 style={{ marginBottom: '3%' }}>Are you sure you want to delete this professional experience?</h2>
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
      <div className="mt-4 flex justify-center">
        <Link to="/candidate/professional-experience/create">
          <button className="text-white py-2 px-4 rounded" style={{backgroundColor: 'var(--talent-highlight)'}}>
            Crear nueva experiencia
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WorkExperienceList;