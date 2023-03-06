import SimVariableType from "./simVariableModel";

interface IState {
    SimTime: Date;
    Data: SimVariableType[];
    SessionId: string;
};

type StateType = Readonly<IState>;

export default StateType;