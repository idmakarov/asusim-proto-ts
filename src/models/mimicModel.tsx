interface IMimic {
    id: number;
    name: string;
    image?: ImageBitmap;
};

type MimicType = Readonly<IMimic>;

export default MimicType;