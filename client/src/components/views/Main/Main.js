import axios from 'axios';
import React, { useState, useEffect } from 'react'
import './Main.css';

function Main(props) {

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
            writer: props.user.userData._id,
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


    const processcingLists = Lists.map((list, index) => {

        console.log('list', list)

        return <ul key= {index}>
            <li>           
                {list.description}
                <button>완료</button>
                <button>삭제</button>
            </li>
        </ul>
    })


    return (
        <div className="box2">
            <div className="processingBox">
                <form onSubmit={submitHandler}>
                    <br />
                    <label>일정을 입력해주세요.</label>
                    <textarea onChange={descriptionChangeHandler} value={Description} />
                    <button type="submit">확인</button>

                </form>

                <div>

                    {processcingLists}
              
                </div>

            </div>
        </div>
    )
}

export default Main
