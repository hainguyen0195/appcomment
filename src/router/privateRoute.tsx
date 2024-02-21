import * as React from 'react';
import { Navigate, RouteProps, Route } from 'react-router-dom';
export function PrivateRoute(props: RouteProps) {
    const isLoggedIn = Boolean(localStorage.getItem('access_admin_logged_in'))
    if (props.path?.includes('admin')) {
        if (!isLoggedIn) return <Navigate to="/admin/auth/login" replace />;
    }
    return <Route {...props} />;
}