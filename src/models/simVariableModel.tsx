interface ISimVariable {
    id: number;
    name: string;
    value: number;
    isOnChart: boolean;
    color: string;
};

type SimVariableType = Readonly<ISimVariable>;

export default SimVariableType;