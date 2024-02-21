import { Alert, Box, Button, IconButton, Snackbar, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../assets/css/css-auth.css';
import { IUser } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { getUser } from '../../store/userReducer';
import { LoadingButton } from "@mui/lab";


export const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    let navigate = useNavigate()
    const [infoMember, setInfoMember] = useState<IUser>({});
    const handleChangeData = (e: any) => {
        const { name, value } = e.target;
        setInfoMember({
            ...infoMember,
            [name]: value
        })
    }
    const resetData = () => {
        setInfoMember({
            email: "",
            password: "",
        });
    }
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const listUserSignUp = useAppSelector((state) => state.userReducer.listUser)
    const submitFormSignIn = (e: React.FormEvent) => {
        e.preventDefault();

        if (infoMember) {
            let dataRegister: IUser = {
                email: infoMember.email,
                password: infoMember.password,
            }
            listUserSignUp?.length && listUserSignUp.forEach(async (user, index) => {
                if (user.email === dataRegister.email && user.password === dataRegister.password) {
                    dispatch(getUser(user))
                    resetData();
                    try {
                        toast.success('Sign In Success!')
                        setIsLoading(true)
                        const timer = await setTimeout(() => {
                            navigate('/')
                        }, 2000);
                        return () => clearTimeout(timer);
                    }
                    catch (error) {
                        toast.error('Sign In Error !')
                    }
                }
            })

        }
    }

    return (
        <>
            <Box className="App">
                <Box className="wrap-user">
                    <Box className="title-user">
                        <Box component={'span'} >Sign In</Box>
                    </Box>
                    <Box className="row-dn">
                        <Box className="dn-form">
                            <Box component={'form'} onSubmit={submitFormSignIn} className="form-user validation-user" encType="multipart/form-data">
                                <Box className="input-group input-user">
                                    <Box component={'label'} htmlFor="email">Email *</Box>
                                    <TextField type="email" id="email" name="email" value={infoMember.email} onChange={handleChangeData} placeholder="Your email" required autoComplete="off"
                                        sx={{
                                            padding: '0',
                                            width: '100%',
                                            '& fieldset': {
                                                border: 'none',
                                                width: '100%',
                                            },
                                            '& input': {
                                                fontSize: '14px',
                                                fontWeight: '400',
                                            }
                                        }} />
                                </Box>
                                <Box className="input-group input-user">
                                    <Box component={'label'} htmlFor="password">Password *</Box>
                                    <TextField type="password" id="password" name="password" value={infoMember.password} onChange={handleChangeData} placeholder="Password" required
                                        sx={{
                                            padding: '0',
                                            width: '100%',
                                            '& fieldset': {
                                                border: 'none',
                                                width: '100%',
                                            },
                                            '& input': {
                                                fontSize: '14px',
                                                fontWeight: '400',
                                            }
                                        }} />
                                </Box>
                                <Box className="button-user">
                                    <LoadingButton loading={isLoading} type="submit" className="btn  btn-block" name="signin"
                                        sx={{
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            textTransform: 'none',
                                            minWidth: 'initial',
                                            border: 'none',
                                            boxShadow: '0 8px 24px 0 rgb(255 235 167 / 20 %)',
                                            backgroundColor: '#0a7cf7',
                                            borderColor: '#0a7cf7',
                                            color: '#fff',
                                            '&:hover': {
                                                backgroundColor: '#0a7cf7',
                                            }
                                        }}
                                    >Sign In</LoadingButton>

                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="menu">
                    <Link to="/home" title="Home">Home</Link>
                    <Link to="/auth/sign-up" title="Sign Up">Sign Up</Link>
                </Box>
                <ToastContainer />
            </Box>
        </>
    )
}
