interface IStubController {
    url?: string;
    eventSource?: EventSource;
    mount: (url: string, action: (param: any) => void) => void;
    unmount: () => void;
};

class StubController implements IStubController {
    url?: string;
    eventSource?: EventSource;

    mount(url: string, action: (param: any) => void) {
        if (!this.url) {
            this.url = url;
        }

        if (!this.eventSource) {
            this.eventSource = new EventSource(this.url);
        }

        if (!this.eventSource.onmessage)
        {
            this.eventSource.onmessage = (e) => action(e.data);
        }
    };

    unmount() {
        if (this.eventSource) {
            this.eventSource.onmessage = null;
            this.eventSource.close();
        }
    };
}

export default StubController;