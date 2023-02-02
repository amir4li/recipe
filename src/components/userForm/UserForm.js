import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { loginSchema, signupSchema } from './validate';
import { Stack, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/authSlice';

const initialValuesSignup = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}

function UserForm({ pageType }) {
    const isLogin = pageType === "login"
    const isSignup = pageType === "signup"
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signup = async (values, onSubmitProps)=> {
        const savedUserResponse = await fetch( "https://recipe-backend-api.onrender.com/api/v1/auth/signup", {
                mode: 'cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        );

        const savedUser = await savedUserResponse.json();
        console.log(savedUser)
        
        // redux
        if (savedUser.token) {
            dispatch(
                setLogin({
                    user: savedUser.user,
                    token: savedUser.token
                })
            );           
            navigate("/");
        }
        onSubmitProps.resetForm();
    };

    const login = async (values, onSubmitProps)=> {
        const loggedInResponse = await fetch( "https://recipe-backend-api.onrender.com/api/v1/auth/login", {
                mode: 'cors',
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();

        //redux
        if (loggedIn) {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/");
        };
        onSubmitProps.resetForm();
    };

    const handleFormSubmit = async(values, onSubmitProps)=> {
        if (isLogin) await login(values, onSubmitProps);
        if (isSignup) await signup(values, onSubmitProps)
    };

    return (
        <Formik
            initialValues={isLogin ? initialValuesLogin : initialValuesSignup}
            validationSchema={isLogin ? loginSchema: signupSchema}
            onSubmit={handleFormSubmit}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit
            })=> (
                <Form onSubmit={handleSubmit}>
                <Stack
                    margin="auto"
                    width="80%"
                    gap="30px"
                    color="#000"
                    p={2}
                >
                {isSignup && (
                    <TextField
                        size="small"
                        label="Name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.name}
                        name="name"
                        type="text"
                        error={Boolean(touched.name) && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                    />
                )}
                    
                    <TextField
                        size="small"
                        label="E-mail"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        type="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                    />
                    <TextField
                        size="small"
                        label="Password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        type="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                    />
                    {isSignup && (
                        <TextField
                            size="small"
                            label="ConfirmPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            name="confirmPassword"
                            type="password"
                            error={Boolean(touched.confirmPassword) && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                        />
                    )}
                    <div>
                    <Button
                        
                        variant="contained"
                        type="submit"
                    >
                        {isLogin ? "Log In" : "Sign Up"}
                    </Button>
                    </div>
                    <Typography
                            onClick={()=> {
                                isLogin ? navigate("/signup") : navigate("/login")
                            }}
                            sx={{
                                textDecoration: "underline",
                                "&:hover": {
                                    cursor: "pointer",
                                }
                            }}
                        >
                            {isLogin ?
                            "Don't have an account? Sign Up Here." :
                            "Already have an account? Login Here."}
                    </Typography>
                    
                </Stack>
                </Form>
            )
            }
            
        </Formik>
    )
}

export default UserForm;