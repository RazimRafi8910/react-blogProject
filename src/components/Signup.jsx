import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { emailSignin, googleLoging } from "../firebase/firebaseAuth";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";


function Signup() {
    const [isLodding, setIsLodding] = useState(false);
    const [error, setError] = useState('');;
    let navigate = useNavigate()

    //yup form validation schema
    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    //sign in with email and password
    const onSubmit = async(data) => {
        setIsLodding(true);
        try {
            const user = await emailSignin(data.email, data.password, data.username);
            if (user) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        setIsLodding(false);
    }
    

    //sign in with google account
    const handleGooglesignin = async() => {
        setIsLodding(true);
        try {
            const user = await googleLoging();
            if (user) {
                navigate('/');
            }
        } catch (error) {
            if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found') {
                setError("Invalid Email or Password")
            } else if (error.code === 'auth/wrong-password') {
                setError("")
            } else {
                setError("An error occured while logging in. Please try again later.")
            }
            console.log(error);

        } finally {
            setIsLodding(false);
        }
    }


    if (isLodding) {
        return (
            <>
                <div className="container" style={{ height: "100vh" }}>
                    <div className="row justify-content-center align-items-center">
                        <div class="spinner-border text-primary mt-3" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            
            <div className="container" style={{ height: "100vh" }}>
                <div className="row justify-content-center align-items-center mt-5">
                    <div className="col-lg-4 col-md-5 col-8 border border-dark rounded-3 py-3 px-4">
                        <div className="d-flex justify-content-center">
                            <h1>Signup</h1>
                        </div>
                            {error && <p className="text-danger text-center">{ error }</p>}
                        <hr />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="px-3">
                                
                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">
                                     Username
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    id="inputUsername"
                                    {...register("username")}
                                    style={{
                                        background: "var(--background)",
                                        color: "var(--text-primary)",
                                        borderColor: "var(--text-secondary)",
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="inputEmail" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    className="form-control"
                                    type="email"
                                    id="inputEmail"
                                    {...register("email")}
                                    style={{
                                        background: "var(--background)",
                                        color: "var(--text-primary)",
                                        borderColor: "var(--text-secondary)",
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPass" className="form-label">
                                    Password
                                </label>
                                <input
                                    className="form-control"
                                    id="inputPass"
                                    type="password"
                                    {...register("password")}
                                    style={{
                                        background: "var(--background)",
                                        color: "var(--text-primary)",
                                        borderColor: "var(--text-secondary)",
                                    }}
                                />
                            </div>
                            </div>
                        <div className="d-flex justify-content-center m-3">
                            <button  type="submit" className="col-lg-4 w-100 btn btn-primary my-3 px-4">
                                SignUp
                            </button>
                        </div>
                            </form>
                        <hr />

                        <div className="d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn fw-bold text-truncate text-center"
                                onClick={handleGooglesignin}
                                style={{
                                    borderColor: "var(--text-primary)",
                                    color: "var(--text-primary)",
                                }}
                            >
                                <i class="fa-brands fa-google mx-3"></i>
                                signin with google
                            </button>
                        </div>

                        <div className="d-flex justify-content-center">
                            <p className="mb-0 mt-3">
                                Already have accound?<Link to={"/login"}>Login</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
