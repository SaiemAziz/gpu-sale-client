import React, { useContext, useState } from 'react';
import {Link, useNavigate} from "react-router-dom"
import { useTitle } from '../../hooks/useTitle';
import {toast} from "react-toastify"
import { Loading } from '../../shared/components/Loading';
import { AuthContext } from '../../context/Auth';
import roleSet from '../../hooks/roleSet';
import {FcGoogle} from 'react-icons/fc'
import {FiGithub} from 'react-icons/fi'
import tokenSet from '../../hooks/tokenSet';

const Register = () => {
    useTitle("Register")
    let [show, setShow] = useState(false)
    let [regloading, setRegLoading] = useState(false)
    let {user, setUser, createUser, updateUser, googleLogin, redirect, setRedirect, githubLogin, setLoading} = useContext(AuthContext)
    let url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB}`
    let navigate = useNavigate()
    let form = redirect || '/'

    // registration data
    let formSubmit = async e => {
        e.preventDefault()
        setRegLoading(true)
        let image = e.target.image.files[0]
        let formData = new FormData()
        formData.append("image", image)
        let res = await fetch(url, {
            method: "POST",
            body: formData
        })
        let data = await res.json()
        let newUser = {
            email : e.target.email.value,
            displayName : e.target.name.value,
            password : e.target.password.value,
            confirm : e.target.confirm.value,
            photoURL : data.data.url,
            role: e.target.role.value
        }
        if(newUser.confirm !== newUser.password)
        {
            toast.error("Password & Confirm did not match")
            e.target.reset()
            setRegLoading(false)
            return;
        }
        createUser(newUser.email, newUser.password)
            .then(res => {
                setUser(newUser)
                roleSet(newUser.email, newUser.role, newUser.photoURL, newUser?.displayName)
                updateUser({
                    displayName: newUser.displayName,
                    photoURL: newUser.photoURL
                })
                    .then().catch()
                toast.success('Successfully Registered')
                setRegLoading(false)
                e.target.reset()
                navigate(form)
                tokenSet(newUser.email)
            })
            .catch(err => {
                toast.error(err.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
                setRegLoading(false)
                setLoading(false)
            })
    }


    // google login
    let googleClicked = () => {
        setRegLoading(true)
        googleLogin()
            .then(res => {
                setUser(res.user)
                roleSet(res.user.email)
                setRegLoading(false)
                navigate(form)
                tokenSet(res.user.email)
            })
            .catch(err => {
                toast.error(err.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
                setRegLoading(false)
                setLoading(false)
            })
    }

    // git hub log in
    let githubClicked = () => {
        setRegLoading(true)
        githubLogin()
            .then(res => {
                setUser(res.user)
                roleSet(res.user?.email)
                setRegLoading(false)
                setRedirect(null)
                navigate(form)
                tokenSet(res.user?.email)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
                setRegLoading(false)
                setLoading(false)
            })
    }

    return (
        <div className='my-10 mx-5 text-left'>
            <h1 className='text-4xl font-bold mb-10 text-center'>Please Register</h1>
            <form onSubmit={formSubmit} className="grid sm:grid-cols-2 grid-cols-1 mx-auto max-w-2xl w-full gap-3 p-5 bg-base-200 rounded-xl">
                <h1 className='my-auto text-xl'>Name</h1>
                <input  className='input input-info' required name='name' placeholder='Your Full Name' type="text" />
                <h1 className='my-auto text-xl'>Image</h1>
                <input type="file" className="file-input file-input-bordered file-input-info" name='image' required/>
                <h1 className='my-auto text-xl'>Email</h1>
                <input  className='input input-info'  required name='email' placeholder='Your Email' type="email" />
                <h1 className='my-auto text-xl'>Password</h1>
                <input  className='input input-info'  required name='password' placeholder='Set A Password' type={show? 'text' : 'password'} />
                <h1 className='my-auto text-xl'>Confirm</h1>
                <input  className='input input-info'  required name='confirm' placeholder='Confirm The Password' type={show? 'text' : 'password'} />
                <h1 className='my-auto text-xl'>Role</h1>
                <select name='role' className="select select-info">
                    <option value={'buyer'}>Buyer</option>
                    <option value={'seller'}>Seller</option>
                </select>
                <div className='sm:col-span-2'>
                    <p className='w-fit ml-auto text-warning'>Show Password <input type="checkbox" className="checkbox checkbox-xs outline ml-2" onClick={()=>setShow(!show)} 
                    /></p>
                </div>
                {
                    regloading ? 
                    <div className='sm:col-span-2 flex justify-center'>
                        <Loading size={50}></Loading>
                    </div> :
                    <>
                        <input className='btn btn-success w-40 mx-auto' type="submit" value={'Register'}/>
                        <Link className='btn btn-info btn-outline w-64 mx-auto' to='/login'>Already Have Account?</Link>
                        <div className='sm:col-span-2 text-2xl flex justify-center gap-5 p-5 bg-base-100 w-fit mx-auto mt-5 rounded-3xl'>
                            <FcGoogle
                            onClick={googleClicked}
                            />
                            <FiGithub
                            onClick={githubClicked}
                            />
                        </div>
                    </>
                }
            </form>
        </div>
    );
};

export default Register;