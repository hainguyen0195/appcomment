import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "../models/models";


const arrayUsers: IComment[] = [
    {
        id: 1,
        mess: "Happy new year.",
        idUser: 5,
        id_parent: 0,
    },
    {
        id: 2,
        mess: "Wish you a very happy new year. Enjoy !!",
        idUser: 4,
        id_parent: 0,
    },
    {
        id: 3,
        mess: "Wish you a very happy new year Brother.",
        idUser: 1,
        id_parent: 0,
    },
    {
        id: 4,
        mess: "Don’t forgot to invite me",
        idUser: 3,
        id_parent: 3,
    },
    {
        id: 5,
        mess: "Where is celebration party jorge?",
        idUser: 2,
        id_parent: 3,
    },
    {
        id: 6,
        mess: "Don’t forgot to invite me",
        idUser: 4,
        id_parent: 4,
    },

]


interface Comments {
    listComment: IComment[]
}

const initialState: Comments = {
    listComment: arrayUsers,
}

const commentReducer = createSlice({
    name: 'Comment',
    initialState: initialState,
    reducers: {
        AddComment: (state, action) => {
            let newList = state.listComment
            // if (state.listComment[0].id === 0) {
            //     newList = [action.payload]
            // } else {
            //     newList = [
            //         ...state.listComment,
            //         action.payload
            //     ]
            // }
            state.listComment = [
                ...state.listComment,
                action.payload
            ]
        },
        GetComment: (state, action) => {
            state.listComment = [
                ...state.listComment,
                action.payload,
            ]
        },
        SaveComment: (state, action) => {
            let updatedComment = state.listComment.filter(
                comment => comment.id !== action.payload.id
            )

            state.listComment = [
                ...updatedComment,
                action.payload
            ]

        },
        DeleteComment: (state, action) => {
            let updatedComment = state.listComment.filter(
                comment => comment.id !== action.payload.id
            )
            updatedComment = updatedComment.filter(comment => comment.id_parent !== action.payload.id)

            state.listComment = [
                ...updatedComment
            ]

        },
    }
})

export const { AddComment, GetComment, DeleteComment, SaveComment } = commentReducer.actions
export default commentReducer.reducer
