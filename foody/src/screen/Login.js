import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Login = () => {
    let navigate=useNavigate();
  const [cred,setCred]=useState({email:"",password:""});
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await fetch("http://localhost:8000/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email: cred.email, password: cred.password})
        });
        const json=await res.json();
        console.log(json);
        if(!json.success){
            alert("enter valid credentials");
        }
        if(json.success){
            localStorage.setItem("userEmail",cred.email);
            localStorage.setItem("authToken",json.authToken);
            console.log(localStorage.getItem);
            navigate("/");
        }
    }
    const onChange=(e)=>{
        e.preventDefault();
        setCred({...cred,[e.target.name]:e.target.value})
    }
  return (
    <>
      <div className="container">
            <form onSubmit={handleSubmit}>
             
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name='email' value={cred.email} aria-describedby="emailHelp" onChange={onChange}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={cred.password} onChange={onChange}/>
                </div>
                 
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/createuser" className='m-3 btn btn-danger'>New User</Link>
            </form>
            </div>
    </>
  )
}

export default Login
