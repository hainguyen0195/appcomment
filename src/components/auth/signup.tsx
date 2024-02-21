import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { IUser } from "../../models/models";
import '../../assets/css/css-auth.css';
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { AddUser } from '../../store/userReducer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { avtNomal } from "../../assets/image";
import { Box, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

export const SignUp: React.FC = () => {
    const dispatch = useAppDispatch()
    let navigate = useNavigate()

    const [infoMember, setInfoMember] = useState<IUser>({

    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const handleChangeData = (e: any) => {
        const { name, value } = e.target;
        setInfoMember({
            ...infoMember,
            [name]: value
        })
    }
    const resetData = () => {
        setInfoMember({
            fullName: '',
            email: "",
            password: "",
        });
    }
    const listUserSignUp = useAppSelector((state) => state.userReducer.listUser)

    const submitFormSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (infoMember) {
            const sumuser = listUserSignUp?.length + 1
            let dataRegister: IUser = {
                id: sumuser,
                fullName: infoMember.fullName,
                email: infoMember.email,
                password: infoMember.password,
                avt: avtNomal
            }
            let errorSignUp = false;
            listUserSignUp?.length && listUserSignUp.map((user, index) => {
                if (user.email === dataRegister.email) {
                    errorSignUp = true
                }
            })
            if (errorSignUp) {
                toast.error('Sign Up Error - Email already exists!')
            } else {
                dispatch(AddUser(dataRegister))
                toast.success('Sign Up Success !')
                const timer = await setTimeout(() => {
                    resetData();
                    navigate('/auth/sign-in')
                }, 2000);
                return () => clearTimeout(timer);

            }
        }
    }
    return (
        <>
            <Box className="App">
                <Box className="wrap-user wrap-user-dk">
                    <Box className="title-user">
                        <Box component={'span'}>Sign Up</Box>
                    </Box>
                    <Box component={'form'} onSubmit={submitFormSignUp} className="form-user validation-user" autoComplete="off">
                        <Box className="input-group input-user">
                            <Box component={'label'} htmlFor="name">Name *</Box>
                            <TextField id="name" name="fullName" value={infoMember.fullName} onChange={handleChangeData} required placeholder="Your name"
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
                            <LoadingButton loading={isLoading} type="submit" className="btn  btn-block" name="signup"
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
                            >Sign Up</LoadingButton>
                        </Box>
                    </Box>
                </Box >
                <Box className="menu">
                    <Link to="/home" title="Home">Home</Link>
                    <Link to="/auth/sign-in" title="Sign In">Sign In</Link>
                </Box>
            </Box >
            <ToastContainer />
        </>
    );
}
