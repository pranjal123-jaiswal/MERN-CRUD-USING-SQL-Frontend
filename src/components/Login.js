import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth){
      navigate("/")
    }

  } , [])

  const handleLogin = async() => {
    let result = await fetch("http://localhost:8000/login" , {
      method: 'POST',
      body: JSON.stringify({ email , password}),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    result = await result.json()
    if(result.name) {
      localStorage.setItem("user" , JSON.stringify(result))
      navigate("/")
    }else{
      alert("Please enter correct details ")
    }
  }
  return (
    <div className='register'>
        <h1>Login</h1>
        <input type = "text" className='inputBox ' value={email} onChange={ (e) => setEmail(e.target.value)} placeholder='Enter Email'/>
        <input type = "text" className='inputBox ' value={password} onChange={ (e) => setPassword(e.target.value)} placeholder='Enter password'/>
        <button type='button' onClick= {handleLogin} className='appButton'>Login</button>
    </div>
  )
}

export default Login