import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {OwnerPage} from "./views/OwnerPage.tsx";
import {ParticipantPage} from "./views/ParticipantPage.tsx";

const socket = new WebSocket("ws://64.110.81.120:7942/ws/test");


export default function App() {


// 연결이 열릴 때 호출되는 이벤트 핸들러
    socket.onopen = function() {
        console.log("WebSocket is open now.");
        // 서버에 메시지 전송
        socket.send(JSON.stringify({ data: "Hello Server!" }));
    };

// 서버로부터 메시지를 수신할 때 호출되는 이벤트 핸들러
    socket.onmessage = function(event) {
        console.log("Message from server: ", event.data);
    };

    // 연결이 닫힐 때 호출되는 이벤트 핸들러
    socket.onclose = function() {
        console.log("WebSocket is closed now.");
    };

// 오류 발생 시 호출되는 이벤트 핸들러
    socket.onerror = function(error) {
        console.error("WebSocket error observed:", error);
    };


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/admin' element={<OwnerPage />} />
                    <Route path='/' element={<ParticipantPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
