// import { Suspense } from 'react';
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "@/view/page/MainPage.tsx";


function App() {
    return (
        <BrowserRouter>
            {/*<Suspense fallback={}>*/}
                <Routes>
                    <Route path="/" element={<MainPage />}/>
                    {/*<Route path="/editor" element={}/>*/}
                </Routes>
            {/*</Suspense>*/}
        </BrowserRouter>
    )
}

export default App