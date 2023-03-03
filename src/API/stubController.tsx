interface IStubController {
    eventSource: EventSource;
    mount: (action: (param: any) => void) => void;
    unmount: () => void;
};

class StubController implements IStubController {
    eventSource: EventSource;

    constructor(url: string) {
        this.eventSource = new EventSource(url);
    }

    mount(action: (param: any) => void) {
        this.eventSource.onmessage = (e) => action(e.data);
    };

    unmount() {
        this.eventSource.close();
    };
}

export default StubController;