import React, { useContext } from 'react'
import List from '../../components/list/List';
import "./profilePage.scss";
import Chat from '../../components/chat/Chat';
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const ProfilePage = () => {
  const {updateUser, currentUser} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) =>{
    try{
      await apiRequest.post("auth/logout");
      updateUser(null);
      navigate("/");
    }catch(error){
      console.log(error);
    }
  }
    return (
        <div className="profilePage">
          <div className="details">
            <div className="wrapper">
              <div className="title">
                <h1>User Information</h1>
                <Link to="/profile/update" >
                <button>Update Profile</button>
                </Link>
              </div>
              <div className="info">
                <span>
                  Avatar:
                  <img
                    src={currentUser.avatar || "noavatar.png"}
                    alt=""
                  />
                </span>
                <span>
                  Username: <b>{currentUser.username}</b>
                </span>
                <span>
                  E-mail: <b>{currentUser.email}</b>
                </span>
                <button onClick={handleLogout}>Logout</button>
              </div>
              <div className="title">
                <h1>My List</h1>
                <button>Create New Post</button>
              </div>
              <List />
              <div className="title">
                <h1>Saved List</h1>
              </div>
              <List />
            </div>
          </div>
          <div className="chatContainer">
            <div className="wrapper">
              <Chat/>
            </div>
          </div>
        </div>
      ); 
}

export default ProfilePage