import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../modules/auth/pages/LoginPage";
import SignUpPage from "../modules/auth/pages/SignUpPage";
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import NotFoundPage from "../modules/auth/pages/NotFoundPage";
import EmployeePage from "../modules/employee/pages/EmployeePage";
import EmployeeListPage from "../modules/employee/pages/EmployeeListPage";
import EmployeeLayout from "../modules/employee/layout";

const Router = ({...rest}) => {
    return (
        <BrowserRouter>

            <IsAuth>
                <Routes>
                    <Route path={"/"} element={<MainLayout/>}>
                        <Route path={"dashboard"} index element={<DashboardPage/>}/>
                        <Route path={"employee"}>
                            <Route index element={<EmployeeListPage/>}/>
                            <Route element={<EmployeeLayout/>}>
                                <Route path={"activity-log/:id"} element={<EmployeePage/>}/>
                            </Route>
                        </Route>
                        <Route path={"auth/*"} element={<Navigate to={'/dashboard'} replace/>}/>
                        <Route path={"/"} element={<Navigate to={'/dashboard'} replace/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </Route>

                </Routes>
            </IsAuth>

            <IsGuest>
                <Routes>
                    <Route path={"/auth"} element={<AuthLayout/>}>
                        <Route index element={<LoginPage/>}/>
                        <Route path={"sign-up"} element={<SignUpPage/>}/>
                    </Route>
                    <Route path={"*"} element={<Navigate to={'/auth'} replace/>}/>
                </Routes>
            </IsGuest>

        </BrowserRouter>
    );
};

export default Router;