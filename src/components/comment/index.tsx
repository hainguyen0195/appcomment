import React, { useState, useEffect } from "react";
import './index.css';
import FormComment from "./formComment";
import { useAppSelector } from "../../services/app/hooks";
import { ItemComment } from "./itemComment";
import { Box } from "@mui/material";

export const Comment: React.FC = () => {
    const [showFormCmt, setShowFormCmt] = useState(true);
    const listComment = useAppSelector((state) => state.commentReducer.listComment)

    let listCommentParent = listComment.filter(comment => {
        return comment.id !== 0 && comment.id_parent === 0;
    });
    listCommentParent.sort((a, b) => b.id - a.id); //sort by id

    const handleClickOpenFormCmt = () => {
        setShowFormCmt(!showFormCmt)
    }

    return (
        <>
            <Box className="main p-tb-15 border-bottom">
                <Box className="p-lr-30">
                    <Box className="comment">
                        <Box component='h3' className="title-comment mg-0 f-w-600 f-size-14" onClick={handleClickOpenFormCmt}>Comments</Box>
                    </Box>
                    {
                        showFormCmt ? <FormComment id_parent={0} /> : <></>
                    }
                    {
                        listCommentParent.length > 0 &&
                        listCommentParent.map((item, index) => {
                            return <ItemComment item={item} key={item.id} index={index} />
                        })
                    }
                </Box>
            </Box>
        </>
    )
}
