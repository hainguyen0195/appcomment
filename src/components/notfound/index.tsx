import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import '../../assets/css/css-notfound.css';
export const NotFoundContent = () => {
    return (
        <>
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>Oops! Trang hiện không tồn tại</h2>
                    <p>Trang bạn đang tìm kiếm không tồn tại, bị xóa hoặc thông tin đã bị thay đổi. </p>
                    <Link to="/" className="link-home" >
                        Trở lại trang chủ
                    </Link>
                </div>
            </div>

        </>
    )
}

export default NotFoundContent