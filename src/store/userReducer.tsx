import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserSignUp } from "../models/models";
import { avtAlina, avtJacob, avtJorge, avtSmith, avtAndrew } from "../assets/image";


const arrayUsers: IUser[] = [
    {
        id: 1,
        fullName: "Jorge Parker",
        email: "jorge@gmail.com",
        password: "123",
        avt: avtJorge
    },
    {
        id: 2,
        fullName: "Alina",
        email: "alina@gmail.com",
        password: "123",
        avt: avtAlina
    },
    {
        id: 3,
        fullName: "Kristina Smith",
        email: "smith@gmail.com",
        password: "123",
        avt: avtSmith
    },
    {
        id: 4,
        fullName: "Jacob Parker",
        email: "jacob@gmail.com",
        password: "123",
        avt: avtJacob
    },
    {
        id: 5,
        fullName: "Andrew",
        email: "andrew@gmail.com",
        password: "123",
        avt: avtAndrew
    },
]

interface userSignUp {
    user: IUserSignUp,
    listUser: IUser[]
}

const initialState: userSignUp = {
    user: {
        email: '',
        fullName: '',
        avt: '',
        id: 0,
        isLogin: false
    },
    listUser: arrayUsers,
}

const userReducer = createSlice({
    name: 'getInfo',
    initialState: initialState,
    reducers: {
        AddUser: (state, action) => {
            state.user = {
                ...action.payload,
                isLogin: true
            }
            state.listUser = [
                ...state.listUser,
                action.payload,
            ]
        },
        getUser: (state, action) => {
            state.user = {
                ...action.payload,
                isLogin: true
            }
        },
        getInfoUser: (state, action) => {
            state.user = {
                ...action.payload,
                isLogin: true
            }
        },
        logOut: (state) => {
            state.user = {
                email: '',
                fullName: '',
                avt: '',
                id: 0,
                isLogin: false
            }
        },
    }
})

export const { AddUser, getUser, getInfoUser, logOut } = userReducer.actions
export default userReducer.reducer
