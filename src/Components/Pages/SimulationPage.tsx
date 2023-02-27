import "src/styles/containers.css";
import ControlPanel, { SimStateEnum } from "../ControlPanel";

const today = new Date();

const SimulationPage = () => (
    <>
        <div className="container-simulation">
            <ControlPanel
                handleActionChanged={() => {}}
                simState={SimStateEnum.InitialState}
                simTime={new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)}
            />
            <div className="container-base"/>
        </div>
    </>
);

export default SimulationPage;
