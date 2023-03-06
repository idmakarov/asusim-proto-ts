import { treatAsType, TypeEnum } from "src/utils/jsonConverter";

interface IStubData {
    SimTime: Date;
    Data: Object;
    SessionId: string;
};

type StubDataType = Readonly<IStubData>;

const stubDataTypeMap: any = {
    "StubDataType": treatAsType(
        TypeEnum.Object,
        [
            { json: "SimTime", js: "SimTime", typ: Date },
            { json: "Data", js: "Data", typ: treatAsType(TypeEnum.Map, 0) },
            { json: "SessionId", js: "SessionId", typ: "" },
        ],
        false
    )
};

export default StubDataType;
export { stubDataTypeMap };