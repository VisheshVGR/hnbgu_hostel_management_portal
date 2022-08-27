import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const StudentDashboard = ({ currUser, notify }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!currUser) {
            navigate("/login")
            return
        }
    }, [currUser, navigate])

    return (
        <>
            This is StudentDashboard Page
        </>
    )
}

export default StudentDashboard