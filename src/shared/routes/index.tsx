import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../../pages"

export const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/home" element={<Home />} />
        </Routes>
    )
}