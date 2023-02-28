import React from "react";
import { useNavigate } from "react-router-dom";
import "src/styles/pages.css";
import "src/styles/containers.css"
import "src/styles/buttons.css"
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
