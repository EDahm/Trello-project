import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // **option 종류**
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능한 페이지
    function AuthenticationCheck(props) {
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인하지 않은 상태
                if (!response.payload.isAuth) {
                    if (option) { //아무것도 안쓰면 option == true랑 같은거
                        props.history.push('/login')    //로그인페이지로 이동
                    }
                } else {
                    //로그인한 상태
                    if (adminRoute && !response.payload.isAdmin) { //admin이 아닌데 admin 페이지에 접속하려고 하는 경우
                        props.history.push('/')
                    } else {
                        if (option === false) //로그인한 유저가 로그인한 유저는 출입 불가능한 페이지에 접속하려고 하는 경우(로그인페이지, 회원가입페이지)
                            props.history.push('/')
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )
    }


    return AuthenticationCheck
}