import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"


export function UserRegister(){

    const [error, setError] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate=  useNavigate();
    const formik = useFormik({
        initialValues: {
            UserId: '',
            UserName:'',
            Password:'',
            Email: '',
            Mobile: ''
        },
        onSubmit : (user => {
            axios.post('http://127.0.0.1:3300/register-user', user).then(()=>{
                alert('Registered Successfully..');
                navigate('/login');
            })
        })
    })

    function VerifyUserId(e){
        axios.get('http://127.0.0.1:3300/get-users')
        .then(response=>{
              for(var user of response.data)
              {
                   if(user.UserId===e.target.value){
                       setError('User Id Taken - Try Another');
                       setErrorClass('text-danger');
                       break;
                   } else {
                       setError('User Id Available');
                       setErrorClass('text-success');
                   }
              }
        })
    }

    return(
        <div className="d-flex justify-content-end">
            <form onSubmit={formik.handleSubmit} className="mt-4 pe-4 bg-light  border border-2 p-4">
                <h3>Register User</h3>
                <dl>
                    <dt>UserId</dt>
                    <dd><input type="text" className="form-control" onKeyUp={VerifyUserId} name="UserId" onChange={formik.handleChange} /></dd>
                    <dd className={errorClass}> {error} </dd>
                    <dt>User Name</dt>
                    <dd><input type="text" className="form-control" name="UserName" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control" name="Password" onChange={formik.handleChange}/></dd>
                    <dt>Email</dt>
                    <dd><input type="email" className="form-control" name="Email" onChange={formik.handleChange} /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" className="form-control" name="Mobile" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-dark w-100">Register</button>
                <Link className="mt-2 btn btn-link" to="/login"> Have Account? Login </Link>
            </form>
        </div>
    )
}