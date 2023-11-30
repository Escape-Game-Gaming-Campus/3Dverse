import * as _3DverseGlobal from "./declareGlobal";

export module _SDK3DVerse {
  export module controller_type {
    export var none: any;
    export var orbit: any;
    export var editor: any;
  }
  
  export function joinOrStartSession(params: {
    sceneUUID : string,
    userToken : string,
    canvas : HTMLElement,
    constraints ?: _3DverseGlobal.SessionConstraints,
    isTransient ?: boolean,
    connectToEditor ?: boolean,
    startSimulation ?: 'no' | 'yes' | 'on-assets-loaded',
    viewportProperties ?: object,
    maxDimension ?: number,
    onFindingSession ?: Function,
    onStartingStreamer ?: Function,
    onConnectingToEditor ?: Function,
    onLoadingAssets ?: Function,
    defaultCameraSpeed ?: string | Number
  }) : void {};
  export function joinSession(params: {
    sessionId : string,
    userToken : string,
    canvas : HTMLCanvasElement,
    isTransient ?: boolean,
    connectToEditor ?: boolean,
    viewportProperties ?: object,
    maxDimension ?: number,
    onStartingStreamer ?: Function,
    onConnectingToEditor ?: Function,
    defaultCameraSpeed ?: string | Number
  }) : void {};
}