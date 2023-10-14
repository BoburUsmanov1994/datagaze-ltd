import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import DashboardPage from "../modules/dashboard/pages/DashboardPage";
import AuthLayout from "../layouts/auth-layout";
import LoginPage from "../modules/auth/pages/LoginPage";
import LogoutPage from "../modules/auth/pages/LogoutPage";
import IsAuth from "../services/auth/IsAuth";
import IsGuest from "../services/auth/IsGuest";
import NotFoundPage from "../modules/auth/pages/NotFoundPage";
import EmployeePage from "../modules/employee/pages/EmployeePage";
import EmployeeListPage from "../modules/employee/pages/EmployeeListPage";
import EmployeeLayout from "../modules/employee/layout";
import ForbiddenPage from "../modules/auth/pages/ForbiddenPage";
import ErrorPage from "../modules/auth/pages/ErrorPage";
import KeyloggerListPage from "../modules/keylogger/pages/KeyloggerListPage";
import BufferListPage from "../modules/buffer/pages/BufferListPage";
import ScreenshotListPage from "../modules/screenshot/pages/ScreenshotListPage";
import WarningsListPage from "../modules/alerts/pages/WarningsListPage";
import AccountsPage from "../modules/account/pages/AccountsPage";
import ComputersListPage from "../modules/computer/pages/ComputersListPage";
import IncidentListPage from "../modules/incident/pages/IncidentListPage";
import VisitsListPage from "../modules/internet/pages/VisitsListPage";
import CloudStorageListPage from "../modules/internet/pages/CloudStorageListPage";
import WebSniffsListPage from "../modules/internet/pages/HttpListPage";
import GroupsPage from "../modules/account/pages/GroupsPage";
import TranslationsPage from "../modules/translations/pages/ListPage";
import DocumentsListPage from "../modules/document/pages/DocumentListPage";
import RuleListPage from "../modules/rules/pages/RuleListPage";
import TelegramListPage from "../modules/telegram/pages/TelegramListPage";
import UsbDevicesListPage from "../modules/usb-devices/pages/UsbDevicesListPage";
import RuleEditPage from "../modules/rules/pages/RuleEditPage";
import RuleCreatePage from "../modules/rules/pages/RuleCreatePage";
import UsbFileListPage from "../modules/usb-devices/pages/UsbFileListPage";

const Router = () => {
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
                                <Route path={"keylogger/:id"} element={<KeyloggerListPage/>}/>
                                <Route path={"buffer/:id"} element={<BufferListPage/>}/>
                                <Route path={"screenshot/:id"} element={<ScreenshotListPage/>}/>
                                <Route path={"warnings/:id"} element={<WarningsListPage/>}/>
                                <Route path={"internet-use/:id"} element={<VisitsListPage/>}/>
                                <Route path={"internet-use/cloud-storage/:id"} element={<CloudStorageListPage/>}/>
                                <Route path={"internet-use/http/:id"} element={<WebSniffsListPage/>}/>
                                <Route path={"telegram/:id"} element={<TelegramListPage/>}/>
                                <Route path={"usb-devices/:id"} element={<UsbDevicesListPage/>}/>
                                <Route path={"usb-files/:id"} element={<UsbFileListPage/>}/>
                            </Route>
                        </Route>
                        <Route path={"accounts"}>
                            <Route index element={<AccountsPage/>}/>
                        </Route>
                        <Route path={"computers"}>
                            <Route index element={<ComputersListPage/>}/>
                        </Route>
                        <Route path={"incidents"}>
                            <Route index element={<IncidentListPage/>}/>
                        </Route>
                        <Route path={"documents"}>
                            <Route index element={<DocumentsListPage/>}/>
                        </Route>
                        <Route path={"rules"}>
                            <Route index element={<RuleListPage/>}/>
                            <Route path={"create"} element={<RuleCreatePage/>}/>
                            <Route path={"edit/:id"} element={<RuleEditPage/>}/>
                        </Route>
                        <Route path={"groups"}>
                            <Route index element={<GroupsPage/>}/>
                        </Route>
                        <Route path={"translations"} element={<TranslationsPage/>}/>
                        <Route path={"403"} element={<ForbiddenPage/>}/>
                        <Route path={"error"} element={<ErrorPage/>}/>
                        <Route path={"logout"} element={<LogoutPage/>}/>
                        <Route path={"auth/*"} element={<Navigate to={'/employee'} replace/>}/>
                        <Route path={"/"} element={<Navigate to={'/employee'} replace/>}/>
                        <Route path={"*"} element={<NotFoundPage/>}/>
                    </Route>
                </Routes>
            </IsAuth>
            <IsGuest>
                <Routes>
                    <Route path={"/auth"} element={<AuthLayout/>}>
                        <Route index element={<LoginPage/>}/>
                    </Route>
                    <Route path={"*"} element={<Navigate to={'/auth'} replace/>}/>
                </Routes>
            </IsGuest>
        </BrowserRouter>
    );
};

export default Router;