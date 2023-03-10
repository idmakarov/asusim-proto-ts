import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages.css";
import "../styles/containers.css"
import "../styles/buttons.css"
import ActionButton from "../Components/ActionButton";

const MainPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <div>
                <ActionButton
                    onButtonClick={() => navigate("simulation", {replace: false})}
                    className={"button-fake"}
                >
                    Simulation
                </ActionButton>
                {/* <button
                    onClick={() => navigate("simulation", {replace: false})}
                >
                    Simulation
                </button> */}
            </div>
        </>
    );
};

export default MainPage;
