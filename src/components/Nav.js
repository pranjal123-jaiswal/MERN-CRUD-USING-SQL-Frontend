import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';

const Nav = () => {
  const auth = localStorage.getItem('user');
  const navigate = useNavigate()
  
  const logout = () => {
    localStorage.clear()
    navigate("/signup")
  }

  return (
    <div>
       <nav>
  <ul className='nav-ul'>

    { auth ? 
    <>
    <li><NavLink to="/">Products</NavLink></li>
    <li><NavLink to="/add">Add Products</NavLink></li>
    <li><NavLink to="/update">Update Products</NavLink></li>
    <li><NavLink to="/addMaterial">ADD Material</NavLink></li>
    <li><NavLink to="/addCategory">ADD Category Products</NavLink></li>
    <li><NavLink to="/addMedia">ADD Media</NavLink></li>
    <li><NavLink to="/profile">Profile</NavLink></li>
    <li><NavLink onClick={logout} >Logout </NavLink></li>
    </>
    :
<>
<ul className='nav-right'>
    <li><NavLink  to="/signup">Sign Up</NavLink></li>
    <li><NavLink  to="/login">Login</NavLink></li>
    </ul>
    </>
}
{/* 
    {auth ? <li><NavLink onClick={logout} to="/signup">Logout</NavLink></li> :
    <>
    <li><NavLink  to="/signup">Sign Up</NavLink></li>
    <li><NavLink  to="/signup">Login</NavLink></li>
    </>
    } */}
  </ul>
</nav>

    </div>
  )
}

export default Nav