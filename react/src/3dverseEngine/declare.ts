import * as _3DverseGlobal from "./declareGlobal";

export module _SDK3DVerse {
  export module cameraControllerType {
    export var none: any;
    export var orbit: any;
    export var editor: any;
  }
  export module controller_type {
    export var none: any;
    export var orbit: any;
    export var editor: any;
  }
  export module PhysicsQueryFilterFlag {
    export var dynamic_block: any;
    export var static_block: any;
    export var distance_agnostic_block: any;
    export var record_touches: any;
  }

  export function close(): void { };
  export function connectToEditor(editorURL?: string): void { };
  export function disableInputs(): void { };
  export function enableInputs(): void { };
  export function findSessions(params: {
    userToken: string,
    sceneUUID: string
  }): Promise<Array<_3DverseGlobal.GetSceneSessions_Session>> {
    return Promise.resolve([]);
  };
  export function getClientUUID(): string {
    return '';
  };
  export function getKey(key: string): object {
    return {};
  };
  export function getVersion(): string {
    return '';
  };
  export function isConnected(): boolean {
    return false;
  };
  export function joinOrStartSession(params: {
    sceneUUID: string,
    userToken: string,
    canvas: HTMLElement,
    constraints?: _3DverseGlobal.SessionConstraints,
    isTransient?: boolean,
    connectToEditor?: boolean,
    startSimulation?: 'no' | 'yes' | 'on-assets-loaded',
    viewportProperties?: object,
    maxDimension?: number,
    onFindingSession?: Function,
    onStartingStreamer?: Function,
    onConnectingToEditor?: Function,
    onLoadingAssets?: Function,
    defaultCameraSpeed?: string | Number
  }): void { };
  export function joinSession(params: {
    sessionId: string,
    userToken: string,
    canvas: HTMLCanvasElement,
    isTransient?: boolean,
    connectToEditor?: boolean,
    viewportProperties?: object,
    maxDimension?: number,
    onStartingStreamer?: Function,
    onConnectingToEditor?: Function,
    defaultCameraSpeed?: string | Number
  }): void { };
  export function onConnected(): Promise<object> {
    return Promise.resolve({});
  };
  export function onEditorConnected(): Promise<object> {
    return Promise.resolve({});
  };
  export function setApiVersion(apiVersion : string): void {};
  export function setInactivityCallback(callback : Function): void {};
  export function setInputRelayFrequency(inputRelayFrequency : number): void {};
  export function setMainCamera(cameraEntity : _3DverseGlobal.Entity): void {};
  export function setResolution(width : number, height : number, streamingScale ?: number): void {};
  export function setupDisplay(canvasElement : HTMLElement): void {};
  export function setUpperAlignment(value : boolean): void {};
  export function setViewports(viewports : Array<_3DverseGlobal.viewport_info>): void {};
  export function startSession(params : {
    sceneUUID: string,
    userToken: string,
    canvas: HTMLElement,
    isTransient?: boolean,
    connectToEditor?: boolean,
    startSimulation?: 'no' | 'yes' | 'on-assets-loaded',
    viewportProperties?: object,
    maxDimension?: number,
    onStartingStreamer?: Function,
    onConnectingToEditor?: Function,
    onLoadingAssets?: Function,
    defaultCameraSpeed?: string | Number
  }): void {};
  export function startStreamer(connectionInfo : object, hardwareDecoding : boolean, hevcSupport : boolean): void {};
  export function updateControllerSetting(controllerSettings : object): void {};

  export module engineAPI {
    
  }
}