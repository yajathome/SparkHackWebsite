import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem("team")
        navigate("/")
    })

    return (
        <div>

        </div>
    )
}

export default Logout