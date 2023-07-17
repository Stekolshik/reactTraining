import React, {useContext} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {publicRoutes, privateRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    if(isLoading) {
        return <Loader/>
    }

    return (
            isAuth
        ?<div>
                    <Routes>
                        {privateRoutes.map(route =>
                            <Route
                                element={<route.element />}
                                path={route.path}
                                exact={route.exact}
                                key={route.path}
                            />
                        )}

                        <Route path="/*"
                               element={<Navigate to="/posts" replace />} />
                    </Routes>
                </div>
        :
                <Routes>
                    {publicRoutes.map(route =>
                        <Route
                            element={<route.element />}
                            path={route.path}
                            exact={route.exact}
                            key={route.path}
                        />
                    )}

                    <Route path="/*"
                           element={<Navigate to="/login" replace />} />
                </Routes>

    );
};

export default AppRouter;