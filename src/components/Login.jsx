import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { emailLogin, googleLoging } from '../firebase/firebaseAuth';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

function Login() {
    const [isLodding, setIsLodding] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //yup schema for validation
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password:yup.string().min(6).required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver:yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setIsLodding(true);

        try {
            await emailLogin(data.email, data.password);
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                setError("Invalid Email or Password");
            } else if (error.code === 'auth/wrong-password') {
                setError("Invalid Password");
            } else {
                setError("An error occurred while logging in. Please try again later.");
            }
            console.log(error);
        } finally {
            setIsLodding(false);
        }
    }

    //google login
    const handleGoogleLogin = async () => {
        setIsLodding(true);

        try {
            const user = await googleLoging();
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setError("Error Occured");
        }
        setIsLodding(false)

    }

    if (isLodding) {
        return (
            <>
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row justify-content-center h-75 align-items-center">
                        <div className="spinner-border text-primary align-items-center" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="container" style={{ height: "100vh" }}>
                <div className="row d-flex justify-content-center align-items-center mt-5">
                    <div className="col-lg-4 col-md-5 col-8 border border-dark rounded-3 py-3 px-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="d-flex justify-content-center">
                                <h1>Login</h1>
                            </div>
                            <p className="text-danger text-center">{error}</p>
                            <hr />
                            <div className="px-3">
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email Address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        {...register('email')}
                                        style={{
                                            background: "var(--background)",
                                            color: "var(--text-primary)",
                                            borderColor: "var(--text-secondary)",
                                        }}
                                    />
                                    <p className='text-danger'>{ errors.email?.message }</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPass" className="form-label">Password</label>
                                    <input
                                        className="form-control"
                                        id="inputPass"
                                        type="password"
                                        {...register('password')}
                                        style={{
                                            background: "var(--background)",
                                            color: "var(--text-primary)",
                                            borderColor: "var(--text-secondary)",
                                        }}
                                    />
                                    <p className='text-danger'>{ errors.password?.message }</p>
                                </div>
                            </div>
                            <Link to={"/"} className="ms-3">
                                Forget Password?
                            </Link>
                            <div className="d-flex justify-content-center m-3">
                                <button className="col-lg-4 w-100 btn btn-primary px-4" type='submit'>
                                    Login
                                </button>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn fw-bold text-truncate text-center"
                                    onClick={handleGoogleLogin}
                                    style={{
                                        borderColor: "var(--text-primary)",
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    <i className="fa-brands fa-google mx-3"></i>
                                    Login with google
                                </button>
                            </div>

                            <div className="d-flex justify-content-center">
                                <p className="mb-0 mt-4">
                                    dont have account?{" "}
                                    <Link to={"/signup"} className="">
                                        Signin
                                    </Link>{" "}
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login