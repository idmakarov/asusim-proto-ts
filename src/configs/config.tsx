const GatewayURL = "http://localhost:5202";

const ApiRequestDict = {
    start: "/api/session/start",
    end: "/api/session/end",
    listen: "/api/states/listen",
    generate: "/api/test/generate",
};

const StubRequestDict = {
    start: "/stub/session/start",
    end: "/stub/session/end",
    listen: "/stub/states/listen",
};

export { GatewayURL, ApiRequestDict, StubRequestDict };