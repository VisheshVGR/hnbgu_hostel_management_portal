import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const OfficerDashboard = ({ currUser, notify }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!currUser) {
            navigate("/login")
            return
        }
    }, [currUser, navigate])

    return (
        <>
            This is OfficerDashboard Page
        </>
    )
}

export default OfficerDashboard