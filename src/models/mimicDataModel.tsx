import MimicType from "./mimicModel";

interface IMimicData {
    mimicList: MimicType[];
    selectedId?: number;
};

type MimicDataType = Readonly<IMimicData>;

export default MimicDataType;