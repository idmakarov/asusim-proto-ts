import { SimStateEnum, SimStatusEnum } from "./simEnums";

function simStateToStatus(state: SimStateEnum) {
    switch (state) {
        case SimStateEnum.Stopped:
        case SimStateEnum.Idle:
            return SimStatusEnum.Idle;

        case SimStateEnum.CriticalError:
            return SimStatusEnum.Error;

        default:
            return SimStatusEnum.Ok;
    }
};

export { simStateToStatus };