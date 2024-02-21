import IRouter from "./router-models";
import { Home, SignInPage, NotFound, SignUpPage } from "../page";


const routers: IRouter[] = [
    {
        path: '/',
        name: 'Home Page',
        component: Home,
    },
    {
        path: '/index',
        name: 'Home Page',
        component: Home,
    },
    {
        path: '/home',
        name: 'Home Page',
        component: Home,
    },
    {
        path: '/auth/sign-in',
        name: 'SignIn Page',
        component: SignInPage,
    },
    {
        path: '/auth/sign-up',
        name: 'SignUp Page',
        component: SignUpPage,
    },
    {
        path: '*',
        name: 'Not Found',
        component: NotFound,
        layout: null,
    },
]

export default routers
