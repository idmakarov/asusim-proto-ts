interface IState {
    SimTime: Date;
    Data: {
        id: number;
        variableName: string;
        value: number;
    }[];
    SessionId: string;
}

type StateType = Readonly<IState>;

export default StateType;