import { SimStateEnum, SimStatusEnum } from "./simEnums";

function simStateToStatus(state: SimStateEnum) {
    switch (state) {
        case SimStateEnum.Stopped:
            return SimStatusEnum.Idle;

        case SimStateEnum.CriticalError:
            return SimStatusEnum.Error;

        default:
            return SimStatusEnum.Ok;
    }
};

export { simStateToStatus };