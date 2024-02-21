import React from "react";
import { imageadmin } from "../../assets/image";
import { Comment } from '../../components'
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { logOut } from "../../store/userReducer";
import { Box, Button, Typography } from "@mui/material";
export const HomeContent = () => {
    const dispatch = useAppDispatch()
    const handleClickSignOut = () => {
        dispatch(logOut())
    }
    const infoUser = useAppSelector((state) => state.userReducer.user)
    return (
        <>
            <Box className="App">
                <Box className="main p-tb-15 border-bottom">
                    <Box className="p-lr-30">
                        <Box className="flex author-news">
                            <Box className="image">
                                <img className="radius-50" src={imageadmin} alt="" />
                            </Box>
                            <Box className="author-info">
                                <Box component='h3' className="mg-0 f-w-600 f-size-14">Adam Smith</Box>
                                <Typography component="p" className="mg-0 f-w-500 f-size-14">
                                    2d
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box className="main p-tb-15 border-bottom">
                    <Box className="p-lr-30">
                        <Box className="news-item">
                            <Box component='h2' className="news-name mg-0 f-w-600 f-size-16">Celebrating New Year</Box>
                            <Typography component="p" className="news-des mg-0 f-w-400 f-size-14">
                                One more year loaded with sweet recollections and cheerful times has passed. All my friends made my year exceptionally uncommon, and I wish this continues forever. With you around, each minute is a unique event for me. I wish you to Happy new year to all of you.
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Comment />
                <Box className="menu">
                    {
                        infoUser.isLogin &&
                        <>
                            <Box className="flex justify-center p-bt-10 f-w-600 f-size-16">
                                Hello  {infoUser.fullName} <img src={infoUser.avt} alt="" className="ml-10" />
                            </Box>
                            <Button type="button" onClick={handleClickSignOut} className="signOut">Sign Out</Button>
                        </>
                    }

                </Box>
            </Box>
        </>
    )
}

export default HomeContent