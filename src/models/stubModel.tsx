interface IStubData {
    SimTime: Date;
    Data: {
        key: string,
        value: number,
    }[];
    SessionId: string;
};

type StubDataType = Readonly<IStubData>;

export default StubDataType;