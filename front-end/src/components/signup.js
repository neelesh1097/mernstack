import { useState ,useEffect} from 'react'
import React from 'react'
import { useNavigate } from 'react-router';

function Signup() {

    const [name,setName] =useState("");
    const [email,setEmail] =useState("");
    const [password,setPassword] =useState("");
    const navigate =useNavigate();
     useEffect(() =>{
     const auth = localStorage.getItem('user')
     if(auth){
      navigate('/')
     }

     })

    const collectData = async(e) => {
      e.preventDefault();
       console.warn(name,email,password);

       let result = await fetch("http://localhost:5000/signup" , {
        method:"POST",
        body: JSON.stringify({name,email,password}),
        headers:{
          'Content-Type':'application/json'
        },
       });
       result = await result.json()
       console.log(result)
       localStorage.setItem("user", JSON.stringify(result))
       navigate('/')
      
       
    }
   

    
  return (
    <div className='container'>
        <h1>Register</h1>
         <form className='register-form'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' className='inputbox' value ={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter name' />

        <label htmlFor='email'>Email</label>
        <input type='email' id='email' className='inputbox' value ={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter email' />

        <label htmlFor='password'>Password</label>
        <input type='password' id='password' className='inputbox' value ={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' />

        <button type='submit' onClick={collectData} className='register-button'>Register</button>
      </form>
    </div>
  )
}

export default Signup