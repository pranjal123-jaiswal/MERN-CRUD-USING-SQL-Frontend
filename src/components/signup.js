import React  , {useEffect, useState}from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name , setName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate()

  // useEffect(() => {
  //   const auth = localStorage.getItem('user');
  //   if (auth){
  //     navigate("/")
  //   }

  // } , [])

  const collectData = async() => {
    let result = await fetch("http://localhost:8000/register" , {
      method: 'POST',
      body: JSON.stringify({name , email , password}),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    result = await result.json()
    navigate("/login")
    localStorage.setItem("user" , JSON.stringify(result))
    console.log (result) }

  return (
    <div className='register'>
      <h1>Register</h1>
      <input className='inputBox' type=' text'value={name} onChange={ (e) => setName(e.target.value)} placeholder='Enter name'/>
      <input className='inputBox' type=' text' value={email} onChange={ (e) => setEmail(e.target.value)}  placeholder='Enter Email'/>
      <input  className='inputBox' type='password' value={password} onChange={ (e) => setPassword(e.target.value)} placeholder='Enter Password'/>
      <button type = "button"  onClick= {collectData} className='appButton'> Signup</button>
    </div>
  )
}

export default Signup