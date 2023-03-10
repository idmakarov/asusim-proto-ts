import SimVariableType from "./simVariableModel";

interface IState {
    SimTime: Date;
    Data: SimVariableType[];
};

type StateType = Readonly<IState>;

export default StateType;