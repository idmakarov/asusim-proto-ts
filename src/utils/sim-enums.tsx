enum SimActionEnum {
    None = 0,
    Start,
    Pause,
    Stop,
}

enum SimStateEnum {
    InitialState = "Начальное состояние",
    Started = "Симуляция запущена",
    Paused = "Симуляция приостановлена",
    Stopped = "Симуляция остановлена",
    Completed = "Симуляция завершена",
    CriticalError = "Критическая ошибка",
}

enum SimStatusEnum {
    Ok = "ok",
    Idle = "idle",
    Error = "error",
}

export { SimActionEnum, SimStateEnum, SimStatusEnum };