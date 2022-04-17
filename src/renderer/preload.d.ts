declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        myPing(): void;
        close():void;
        minimize():void;
        maximize():void;
        on(
          channel: string,
          func: (...args: unknown[]) => void
        ): (() => void) | undefined;
        once(channel: string, func: (...args: unknown[]) => void): void;
      };
    };
  }
}

export {};
