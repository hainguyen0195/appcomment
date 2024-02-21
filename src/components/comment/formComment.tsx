import React, { useState, useEffect } from "react";
import './index.css';
import { IComment, IUserSignUp } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import { avtNomal, imageadmin, reply } from "../../assets/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserEdit, faShare, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { AddComment } from "../../store/commentReducer";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Box, Button, TextField } from "@mui/material";

type Props = {
    id_parent: number,
    userInfos: IUserSignUp
}

const FormComment: React.FC<Props> = ({ id_parent, userInfos }) => {
    const infoUser = useAppSelector((state) => state.userReducer.user)
    const dispatch = useAppDispatch()
    const [textcomment, setTextcomment] = useState('');
    const listComment = useAppSelector((state) => state.commentReducer.listComment)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let dataComment: IComment = {
            id: listComment.length,
            idUser: userInfos.id,
            mess: textcomment,
            id_parent: id_parent,
        }
        dispatch(AddComment(dataComment))
        setTextcomment('')
    }
    const [readySubmit, setEeadySubmit] = useState(false);
    useEffect(() => {
        if (textcomment != '' && infoUser.isLogin) {
            setEeadySubmit(true)
        } else {
            setEeadySubmit(false)
        }
    }, [textcomment])

    return (
        <>
            <Box component={'form'} onSubmit={handleSubmit}>
                <Box className="flex item-form-comment">
                    <Box className="image image-user-comment">
                        <img className="radius-50" src={userInfos.avt ? userInfos.avt : avtNomal} alt="" />
                    </Box>
                    <Box className="input-field-comment" >
                        <TextField placeholder="Write a comment" id="input-mess" value={textcomment} onChange={(e) => setTextcomment(e.target.value)}
                            sx={{
                                padding: '0',
                                width: 'calc(100% - 30px)',
                                '& fieldset': {
                                    border: 'none',
                                    width: '100%',
                                },
                                '& input': {
                                    border: 'none',
                                    height: 'inherit',
                                    padding: 0,
                                    fontSize: '14px',
                                    fontWeight: '400',
                                }
                            }} />


                        <Button type="submit" className={`btn-submit-comment ${readySubmit ? 'ready-submit-comment' : ''}`}
                            sx={{
                                fontSize: '14px',
                                fontWeight: '400',
                                textTransform: 'none',
                                minWidth: 'initial',
                            }}
                        ><FontAwesomeIcon icon={faShare} /></Button>

                        {
                            !infoUser.isLogin ?
                                <Box className="note-sign-in">
                                    Please log in first to make comments. Click <Link to='/auth/sign-in' title="SignIn">here</Link> to login .
                                </Box>
                                : ''
                        }
                    </Box>
                </Box>
                <input type="hidden" name="idUser" value={(userInfos && userInfos.id) ? userInfos.id : ''} />
            </Box >
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        userInfos: state.userReducer.user
    };
};

export default connect(mapStateToProps)(FormComment);