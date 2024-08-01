import React from 'react'
import { Link ,useNavigate} from 'react-router-dom'


function Nav() {
  const auth =localStorage.getItem('user');
  const navigate =useNavigate()
  const logout =()=>{
    console.log("click")
    localStorage.clear('user')
     navigate('/signup')
  }
  return (
    <div>
      {auth ?
        <ul className='nav-ul'>
        
            <li><Link to ='/'>Products</Link></li>
            <li><Link to ='/add'>Add Products</Link></li>
            <li><Link to ='/update/:id'>Update Products</Link></li>
            
            <li><Link to ='/profile'>Profile</Link></li>
            <li><Link to ='/signup' onClick={logout}>Logout</Link></li>
            
           
            
            
        </ul>
        :
        <ul className='nav-ul nav-right'>
        <li><Link to ='/login'>Login</Link></li>
        <li><Link to ='/signup'>SignUp</Link></li>

        </ul>
        }
        </div>
  )
}

export default Nav