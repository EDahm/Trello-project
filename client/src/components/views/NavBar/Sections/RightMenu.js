import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

function RightMenu(props) {


    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                props.history.push("/login");
            } else {
                alert('로그아웃 실패')
            }
        });
    };

    if (useSelector.userData && !useSelector.userData.isAuth) {
        return (
            <Menu mode={props.mode}>
                <Menu.Item key="mail">
                    <a href="/login">로그인</a>
                </Menu.Item>
                <Menu.Item key="app">
                    <a href="/register">회원가입</a>
                </Menu.Item>
            </Menu>
        )
    } else {

        return (
            <div>
                <Menu mode={props.mode}>
                    <Menu.Item key="logout">
                        <a onClick={logoutHandler}>로그아웃</a>
                    </Menu.Item>
                </Menu>

            </div>
        )
    }
}


export default withRouter(RightMenu)
