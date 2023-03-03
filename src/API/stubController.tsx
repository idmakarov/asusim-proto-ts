interface IStubController {
    url: string;
    eventSource?: EventSource;
    mount: (action: (param: any) => void) => void;
    unmount: () => void;
};

class StubController implements IStubController {
    url: string;
    eventSource?: EventSource;

    constructor(url: string) {
        this.url = url;
    }

    mount(action: (param: any) => void) {
        if (this.eventSource === undefined) {
            this.eventSource = new EventSource(this.url);
        }

        this.eventSource.onmessage = (e) => action(e.data);
    };

    unmount() {
        this.eventSource?.close();
    };
}

export default StubController;