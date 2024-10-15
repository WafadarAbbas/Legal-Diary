import React from 'react';
import { Dropdown, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import userimg from '../../../assets/wafa.JPG';
import { FaUserEdit, FaSignOutAlt } from 'react-icons/fa';


function DropdownProfile() {
  const navigate = useNavigate();  

   const handleLogout = () => {
    localStorage.removeItem('authToken');  
    navigate('/user/login-v3');  
  };

  return (
    <Dropdown className="navbar-item navbar-user">
      <Dropdown.Toggle className="navbar-link d-flex align-items-center" as="a">
        <Image src={userimg} alt="" roundedCircle />
      </Dropdown.Toggle>

      <Dropdown.Menu align="end">
        <Dropdown.Item href="#/" style={{ fontSize: '14px', fontWeight: 'bold' }}>
          <FaUserEdit /> Update Profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout} style={{ fontSize: '14px', fontWeight: 'bold' }}>
          <FaSignOutAlt /> Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownProfile;


