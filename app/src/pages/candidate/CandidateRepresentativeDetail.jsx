import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input'
import profile from '../../images/profile.jpg'
import mainBackground from '../../images/main-background2.jpg'
import LatestHistory from '../../components/history/LatestHistory'
import MainButton from '../../components/mainButton'
import SecondaryButton from '../../components/secondaryButton'
import axios from 'axios'
import { useAuthContext } from '../../context/authContext'
import Logout from '../../components/swat/logout'
import { useParams } from "react-router-dom";

export default function RepresentativeDetail() {
	const { isAuthenticated, logout } = useAuthContext()
	const [userData, setUserData] = useState(null)
  const { representativeId } = useParams();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				if (isAuthenticated) {
					const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user`)
					const user = response.data.data.find((user) => user._id === representativeId)
					setUserData(user)
				}
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [isAuthenticated])

  return (
    <div
      className="flex flex-col"
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="flex flex-row justify-center items-center profile-header w-10/12 mt-20">
        <div className="flex flex-col items-center">
          <img
            src={userData && userData.profilePicture ? userData.profilePicture : profile} //[candidate.profilePicture}
            className='rounded-full border border-gray-300 profile-img'
            style={{ objectFit: 'cover', objectPosition: 'center', width: '300px', height: '300px' }}
          />
        </div>
        <div className="flex flex-col mt-10 w-fit">
          <div className="profile-name-text text-center">
            <h2>
              {userData && userData.username ? userData.username : " - "}
            </h2>
          </div>
            <div className="flex flex-col w-full profile-info-text">
              {Input({name:"Company name", value:userData ? userData.companyName : " - ", editable:false})}
              <br></br>
              {Input({name:"Phone number", value:userData ? userData.phone : " - ", editable:false})}
              <br></br>
              {Input({name:"Corporative Email", value:userData ? userData.email : " - ", editable:false})}
              <br></br>
              {Input({name:"Project Society Name", value:userData ? userData.projectSocietyName : " - ", editable:false})}

            </div>

        </div>
      </div>
    </div>
  );
}
