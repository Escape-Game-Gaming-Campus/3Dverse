declare module 'https://*'

declare module 'SDK3DVerse.js' {
  export module _SDK3DVerse {
    export module webAPI {
      function createOrJoinSession(sceneId: string): Promise<any | undefined>;
    }
    export module notifier {
      function on(event: string, callback: Function): void;
      function off(event: string, callback: Function): void;
    }
    export const setupDisplay: (canvas: HTMLElement | null) => void;
    export const startStreamer: (connectionInfo: any) => void;
    export function connectToEditor(): Promise<void>;
    export module engineAPI{
      function findEntitiesByEUID(euid : string) : {};
    }

    export module actionMap{
      function setFrenchKeyboardBindings() : void;
    }
  }
}

declare module 'https://cdn.3dverse.com/legacy/sdk/stable/SDK3DVerse_VirtualJoystick_Ext.js' {
    
} 