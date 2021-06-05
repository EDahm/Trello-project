import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {

    const user = useSelector(state => state.user)


    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('로그아웃 실패')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        return (
            <div className="right">
                <div className="detailRight">
                    <a href="/login">로그인</a>
                </div>
                <div className="detailRight">
                    <a href="/register">회원가입</a>
                </div>
            </div>
        )
    } else {

        return (
            <div className="right">
                <div className="detailRight">
                    <a onClick={logoutHandler}>로그아웃</a>
                </div>

            </div>
        )
    }
}


export default withRouter(RightMenu)
