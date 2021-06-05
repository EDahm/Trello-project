import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './LoginPage.css'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {

        setEmail(event.currentTarget.value)
    }


    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }


    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                props.history.push('/usermain')     // 로그인 성공시 루트 페이지로 이동
            } else {
                alert('Error')
            }
        })



    }


    return (
        <div className="box1">
            <form className="formBox" onSubmit={onSubmitHandler}>
                <div className="Title">Trello</div>
                <label>이메일</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>비밀번호</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <br />
                <button type="submit">
                    로그인
                </button>

                <div className="moveToSignUp">
                    <a href="/register">회원가입</a>
                </div>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
