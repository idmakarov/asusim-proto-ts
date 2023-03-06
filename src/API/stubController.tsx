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
        if (!this.eventSource) {
            this.eventSource = new EventSource(this.url);
        }

        if (!this.eventSource.onmessage)
        {
            this.eventSource.onmessage = (e) => action(e.data);
        }
    };

    unmount() {
        if (this.eventSource !== undefined) {
            this.eventSource.onmessage = null;
            // this.eventSource.close();
        }
    };
}

export default StubController;