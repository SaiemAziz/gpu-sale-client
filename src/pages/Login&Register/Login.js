import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/Auth';
import { useTitle } from '../../hooks/useTitle';
import { Loading } from '../../shared/components/Loading';
import {toast} from 'react-toastify'
import {FcGoogle} from 'react-icons/fc'
import {FiGithub} from 'react-icons/fi'
import roleSet from '../../hooks/roleSet';
import tokenSet from '../../hooks/tokenSet';
import useRoleCheck from '../../hooks/useRoleCheck';

const Login = () => {
    useTitle("Login")
    let [show, setShow] = useState(false)
    let [logloading, setLogLoading] = useState(false)
    let navigate = useNavigate()
    let {user, setUser, logIn, redirect, googleLogin, setRedirect, githubLogin, setLoading} = useContext(AuthContext)
    let form = redirect || '/'

    // log in form
    let formSubmit = e => {
        e.preventDefault()
        setLogLoading(true)
        let email = e.target.email.value
        let password = e.target.password.value
        logIn(email, password)
            .then(res => {
                setUser(res.user)
                setLogLoading(false)
                setRedirect(null)
                navigate(form)
                tokenSet(res.user.email)
            })
            .catch(err => {
                toast.error(err.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
                setLogLoading(false)
                setLoading(false)
            })
    }

    // google log in
    let googleClicked = () => {
        setLogLoading(true)
        googleLogin()
            .then(res => {
                setUser(res.user)
                roleSet(res.user?.email, 'buyer', res.user?.photoURL, res.user?.displayName)
                setLogLoading(false)
                setRedirect(null)
                navigate(form)
                tokenSet(res.user?.email)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
                setLogLoading(false)
                setLoading(false)
            })
    }

    // git hub log in
    let githubClicked = () => {
        setLogLoading(true)
        githubLogin()
            .then(res => {
                setUser(res.user)
                roleSet(res.user?.email, 'buyer', res.user?.photoURL, res.user?.displayName)
                setLogLoading(false)
                setRedirect(null)
                navigate(form)
                tokenSet(res.user?.email)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.code.replace('auth/','').replaceAll('-',' ').toUpperCase())
                setLogLoading(false)
                setLoading(false)
            })
    }
    return (
        <div className='my-10 mx-5 text-left'>
            <h1 className='text-4xl font-bold mb-10 text-center'>Please Login</h1>
            <form onSubmit={formSubmit} className="grid sm:grid-cols-2 grid-cols-1 mx-auto max-w-2xl w-full gap-3 p-5 bg-base-200 rounded-xl">
                <h1 className='my-auto text-xl'>Email</h1>
                <input  className='input input-info'  required name='email' placeholder='Your Email' type="email" />
                <h1 className='my-auto text-xl'>Password</h1>
                <input  className='input input-info'  required name='password' placeholder='Your Password' type={show? 'text' : 'password'} />
        
                <div className='sm:col-span-2'>
                    <p className='w-fit ml-auto text-warning'>Show Password <input type="checkbox" className="checkbox checkbox-xs outline ml-2" onClick={()=>setShow(!show)} 
                    /></p>
                </div>

                {
                    logloading ? 
                    <div className='sm:col-span-2 flex justify-center'>
                        <Loading size={50}></Loading>
                    </div> :
                    <>
                        <input className='btn btn-success w-40 mx-auto' type="submit" value={'Login'}/>
                        <Link className='btn btn-info btn-outline w-64 mx-auto' to='/register'>No Account?</Link>
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

export default Login;