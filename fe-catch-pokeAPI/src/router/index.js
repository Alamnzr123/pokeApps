import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../views/Home/index';
import Detail from '../views/Detail/index';
import MyPage from '../views/My Page/index';
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

























// import React from 'react';

// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Button from '../Component/Button';
// import Detail from '../views/Detail/Detail';
// import User from '../views/User';
// import Login from '../views/Login';
// // import Modal from '../Component/Modal';
// import GetQueryParam from '../Component/GetQueryParams';
// import GetParam from '../Component/GetParams';
// import NotFound from '../views/NotFound';

// const Router = () => {
//     return (
//         <>
//             <BrowserRouter>
//                 <Routes>
//                     <Route path="/">
//                         <Route index element={<Button />} />
//                         <Route path="button" element={<Detail />} />
//                         <Route path="params/:id" element={<GetParam />} />
//                         <Route path="params" element={<GetQueryParam />} />
//                         <Route path="login" element={<Login />} />
//                         <Route path="user" element={<User />} />
//                     </Route>
//                     <Route path="*" element={<NotFound />} />
//                 </Routes>
//             </BrowserRouter>
//         </>

//     )

// }

// export default Router;