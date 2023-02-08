import {Route, Routes} from "react-router-dom"
import {Status} from "./Status";
import React from "react";
import {NaturalPerson} from "./NaturalPerson";

export const PrivateRoutes = () => {
    return (
        <Routes>
            <Route path="/status" element={<Status/>}/>
            <Route path="/create" element={<NaturalPerson/>}/>
        </Routes>
    )
}