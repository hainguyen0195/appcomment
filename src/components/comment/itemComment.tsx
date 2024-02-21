import React, { useState, useEffect } from "react";
import './index.css';
import { collapse, imageadmin } from "../../assets/image";
import { IComment } from "../../models/models";
import { useAppDispatch, useAppSelector } from "../../services/app/hooks";
import FormComment from "./formComment";
import { reply } from "../../assets/image";
import { DeleteComment, SaveComment } from "../../store/commentReducer";
import { Box, Button, TextField } from "@mui/material";

type Props = {
    item: IComment,
    index: number,
}
export const ItemComment: React.FC<Props> = ({ item, index }) => {
    const dispatch = useAppDispatch();

    const infoUserSignIn = useAppSelector((state) => state.userReducer.user)

    const listUserSignUp = useAppSelector((state) => state.userReducer.listUser)

    const infoUser = listUserSignUp.find((user) => user.id == item.idUser)

    const [messcomment, setMesscomment] = useState(item.mess);

    const [showFormCmt, setShowFormCmt] = useState(false);

    const handleClickOpenFormCmt = () => {
        setShowFormCmt(!showFormCmt)
    }

    const listComment = useAppSelector((state) => state.commentReducer.listComment)

    let listCommentChil = listComment.filter(comment => {
        return comment.id_parent === item.id;
    });

    listCommentChil.sort((a, b) => b.id - a.id); //sort by id

    const [showListComment, setShowListComment] = useState(false)

    const handleShowListComment = () => {
        setShowListComment(!showListComment)
    }

    const [showEditComment, setShowEditComment] = useState(true)

    const handleClickEdit = (id: number) => {
        setShowEditComment(!showEditComment)
        document.getElementById("input-mess-" + id)?.focus();
    }

    const handleClickCancel = () => {
        setShowEditComment(!showEditComment)
        setMesscomment(item.mess)
    }

    const handleClickSave = () => {
        let dataComment: IComment = {
            id: item.id,
            idUser: item.idUser,
            mess: messcomment,
            id_parent: item.id_parent,
        }
        dispatch(SaveComment(dataComment))
        setShowEditComment(!showEditComment)
    }

    const handleClickDelete = (item: IComment) => {
        dispatch(DeleteComment(item))
    }
    return (
        <>
            <Box className="flex item-comment">
                <Box className="image image-user-comment">
                    <img className="radius-50" src={infoUser?.avt} alt="avt" />
                </Box>
                <Box className="content-comment">
                    <Box className="content-comment-top">
                        <Box component='h3' className="mg-0 f-w-600 f-size-14" >{infoUser?.fullName}</Box>
                        <TextField id={`input-mess-${item.id}`} className={`mg-0 f-w-400 f-size-14 input-mess ${!showEditComment ? 'input-mess-edit' : ''}`} value={messcomment} onChange={(e) => setMesscomment(e.target.value)} InputProps={{
                            readOnly: showEditComment,
                        }} sx={{
                            padding: '0', width: '100%',
                            '& fieldset': {
                                border: 'none',
                                width: '100%',
                            },
                            '& input': {
                                border: 'none',
                                width: '100%',
                                height: 'inherit',
                                padding: 0,
                                fontSize: '14px',
                                fontWeight: '400',
                            }
                        }} />

                    </Box>
                    <Box className="btn-reply flex">
                        <Button className="f-w-500 f-size-14 " onClick={handleClickOpenFormCmt}
                            sx={{
                                fontSize: '14px',
                                fontWeight: '400',
                                textTransform: 'none',
                                minWidth: 'initial',
                            }}
                        >{showFormCmt ? 'Close Reply' : 'Reply'}</Button>
                        {
                            item.idUser === infoUserSignIn.id ?
                                <>
                                    <Box className="btn-reply-right">
                                        {
                                            showEditComment ?
                                                <>
                                                    <Button className="f-w-500 f-size-14 text-transform-none" onClick={() => handleClickEdit(item.id)}>Edit</Button>
                                                </> : <>
                                                    <Button className="f-w-500 f-size-14 text-transform-none " onClick={handleClickCancel}>Cancel</Button>
                                                    <Button className="f-w-500 f-size-14 ml-10 text-transform-none" onClick={handleClickSave}>Save</Button>
                                                </>
                                        }

                                        <Button className="f-w-500 f-size-14 ml-10" onClick={() => handleClickDelete(item)}>Delete</Button>
                                    </Box>
                                </> : null
                        }
                    </Box>
                    {
                        showFormCmt ? <FormComment id_parent={item.id} /> : <></>
                    }
                </Box>
                <Box className={`list-comment-chil ${index}`}>
                    <Box className={`${(index == 0) ? 'block' : `${showListComment ? 'block' : 'none'}`}`}>
                        {
                            listCommentChil.length > 0 &&
                            listCommentChil.map((item, index) => {
                                return <ItemComment item={item} key={item.id} index={index} />
                            })
                        }
                    </Box>
                    {
                        listCommentChil.length > 0 && item.id_parent === 0 && index !== 0 ?
                            <Box className="total-eplies f-w-500 f-size-14" onClick={handleShowListComment}>
                                {showListComment ? <>
                                    <img src={collapse} alt="" /> Collapse
                                </> :
                                    <>
                                        <img src={reply} alt="" />
                                        {listCommentChil.length} Replies
                                    </>
                                }
                            </Box>
                            : <></>
                    }
                </Box>
            </Box>
        </>
    )
}
