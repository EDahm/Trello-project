import './Main.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BsPlusSquareFill } from "react-icons/bs";
import { GoListUnordered, GoTasklist } from "react-icons/go";
import { MdDone } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";






function Main(props) {


    const user = useSelector(state => state.user)
    const [Description, setDescription] = useState("")

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if (!Description) {
            return alert("일정을 입력해주세요.")
        }

        //서버에 채운 값들을 request로 보냄

        const body = {
            //로그인된 사람의 ID
            writer: user.userData._id,
            description: Description
        }

        axios.post("/api/list", body)
            .then(response => {
                if (response.data.success) {
                    alert('일정이 등록되었습니다.')
                    setDescription('')
                    window.location.replace("/usermain")
                } else {
                    alert('일정 등록에 실패했습니다. 다시 등록해주세요.')
                }
            })
    }




    // 진행중 리스트 불러오기
    const [Lists, setLists] = useState([])  //여러개 불러올거니까 [] Array


    useEffect(() => {

        axios.post('/api/list/lists')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setLists(response.data.listInfo)
                } else {
                    alert("리스트 목록 불러오기 실패")
                }
            })
    }, [])




    const removeList = (list) => {

        const body = {
            _id: list._id,
            writer: list.writer._id,
            description: list.description

        }

        if (window.confirm('해당 일정을 삭제하시겠습니까?\n삭제된 데이터는 복구할 수 없습니다.')) {

            axios.post("/api/list/delete", body)
                .then(response => {
                    if (response.data.success) {
                        alert('일정이 삭제되었습니다.')
                        window.location.replace("/usermain")
                    } else {
                        alert('일정 삭제에 실패했습니다.')
                    }
                })
        }
    }




    const modifyList = (list) => {

        const body = {
            _id: list._id,
            writer: list.writer._id
        }

        if (window.confirm('해당 일정을 완료하시겠습니까?')) {

            axios.post("/api/list/modify", body)
                .then(response => {
                    if (response.data.success) {
                        alert('일정이 완료되었습니다.')
                        window.location.replace("/usermain")
                    } else {
                        alert('일정상태 변경에 실패했습니다.')
                    }
                })
        }
    }





    const processcingLists = Lists.filter((list) => {

        const currentUser = user.userData._id

        const state = '진행중'

        return list.writer._id === currentUser && list.state === state
    }).map((list, index) => {

        //console.log('list', list)

        return <ul key={index} className="listed">
            <li>
                {list.description}
                <button className="buttonType" onClick={() => removeList(list)}><span id="removeButton"><RiDeleteBinLine /></span></button>
                <button className="buttonType" onClick={() => modifyList(list)}><span id="doneButton"><MdDone /></span></button>
            </li>
        </ul>
    })


    const doneLists = Lists.filter((list) => {

        const currentUser = user.userData._id
        const state = '완료'

        return list.writer._id === currentUser && list.state === state
    }).map((list, index) => {

        //console.log('list', list)

        return <ul key={index} className="listed">
            <li>
                {list.description}
                <button className="buttonType" onClick={() => removeList(list)}><span id="removeButton"><RiDeleteBinLine /></span></button>
            </li>
        </ul>
    })


    return (
        <div className="box2">
            <div className="textarea">
                <form onSubmit={submitHandler}>
                    <label><span><BsPlusSquareFill /></span> 일정을 입력해주세요</label><br />
                    <textarea onChange={descriptionChangeHandler} value={Description} />
                    <br />
                    <button className="submitButton" type="submit">확인</button>

                </form>
            </div>

            <div className="processingBox">
                <h2 class="listTitle"><span><GoListUnordered /></span> 진행중</h2>
                <div>

                    {processcingLists}

                </div>

            </div>

            <div className="processingBox">
                <h2 class="listTitle"><span><GoTasklist /></span> 완료</h2>
                <div>

                    {doneLists}

                </div>

            </div>
        </div>
    )
}

export default Main
