import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../views/Home/index';
import Detail from '../views/Detail/index';
import MyPage from '../views/MyPage/index';
import Notfound from '../views/NotFound/index';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                </Route>
                <Route path="/detail/:id">
                    <Route index element={<Detail />} />
                </Route>
                <Route path="/mypage">
                    <Route index element={<MyPage />} />
                </Route>
                <Route path="*" element={<Notfound />} />
            </Routes>
        </BrowserRouter >
    )
}

export default Router;