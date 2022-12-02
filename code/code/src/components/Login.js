import React, { useState } from "react";
import { Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'



const Login = (props) => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validateEmail, setvalidateEmail] = useState("")
  const [validatePassword, setvalidatePassword] = useState("")

  const [loginStatus, setLoginStatus] = useState('')

  const navigate = useNavigate()


  const data = {
    "username": email,
    "password": password
  }
  const validate = () => {
    console.log("Inside Validate")
    const reg = /.+@.+\.[A-Za-z]+$/.test(data.username)
    if (!data.username) {
      setvalidateEmail("Enter email");
      return false
    }
    if (!reg) { setvalidateEmail("Enter valid email"); return false };

    if (!data.password) { setvalidatePassword("Enter Password"); return false }
    if (data.password.length < 4 && data.password.length > 10) {
      setvalidatePassword("Password length must be more than 3 and less than 10")
      return false
    }

    return true
  }


  const onLogin = async () => {

    if (validate()) {

      try {
        await fetch("http://localhost:5001/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((response) => {
          response.json().then((resp) => {
            console.log("EEREREREEEE",resp)
            if (response.ok) {
             
              props.handleLogin(resp.username,true)
              setLoginStatus('')
              navigate('/')
            }

            else if (resp.loginstatus == "Account doesn't exist") {
              setLoginStatus("Please Signup account doesn't exist")
            }
            else {
              setLoginStatus("Login failed")
            }
          }
          );
        })
      }

      catch (err) {
        alert("email not found")
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="login">
        <h3>Log in</h3>
        <label style={{
          fontFamily: 'Alegreya',
          fontSize: '24px'
        }}>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <p style={{ color: "red" }}>{validateEmail}</p>
        <label style={{
          fontFamily: 'Alegreya',
          fontSize: '24px'
        }}>Password:</label>
        <input

          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <p style={{ color: "red" }}>{validatePassword}</p>
        <Button style={{
          borderRadius: 35,
          backgroundColor: '#FF2625',
          padding: "18px 36px",
          marginBottom: "15px",
          fontSize: "18px"
        }} variant="contained"
          onClick={onLogin}>
          Log in
        </Button>
        {loginStatus.length > 0 && <div>
          <p style={{ color: "red" }} >{loginStatus}</p>
        </div>}


        <p><Button variant="text" onClick={()=>{navigate("/signup")}} >Signup/Register</Button></p>

      </form>
    </div>
  );
}

export default Login;
