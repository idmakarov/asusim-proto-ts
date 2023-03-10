import { treatAsType, TypeEnum } from "../utils/jsonConverter";

interface IApiData {
    SimTime: Date;
    Data: Object;
};

type ApiDataType = Readonly<IApiData>;

const apiDataTypeMap: any = {
    "ApiDataType": treatAsType(
        TypeEnum.Object,
        [
            { json: "Timestamp", js: "SimTime", typ: Date },
            { json: "States", js: "Data", typ: treatAsType(TypeEnum.Map, 0) },
        ],
        false
    )
};

export default ApiDataType;
export { apiDataTypeMap };