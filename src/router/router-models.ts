export default interface IRouter {
    path: string;
    name: string;
    component: any;
    props?: any;
    layout?:any
}