import { AABB, ComponentFilter, Entities, Entity, EntityTemplate, GetSceneSessions_Session, PhysicsRaycastResult, SDK_Vec3, SceneSettings, SessionConstraints, TriggerCallback, viewport_info } from "./declareGlobal";

export module _SDK3DVerse {
  export enum cameraControllerType {
    none,
    orbit,
    editor
  }
  export enum controller_type {
    none,
    orbit,
    editor
  }
  export enum PhysicsQueryFilterFlags {
    dynamic_block,
    static_block,
    distance_agnostic_block,
    record_touches
  }

  export function close(): void { };
  export function connectToEditor(editorURL?: string): void { };
  export function disableInputs(): void { };
  export function enableInputs(): void { };
  export function findSessions(params: {
    userToken: string,
    sceneUUID: string
  }): Promise<Array<GetSceneSessions_Session>> {
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
    constraints?: SessionConstraints,
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
  export function setMainCamera(cameraEntity : Entity): void {};
  export function setResolution(width : number, height : number, streamingScale ?: number): void {};
  export function setupDisplay(canvasElement : HTMLElement): void {};
  export function setUpperAlignment(value : boolean): void {};
  export function setViewports(viewports : Array<viewport_info>): void {};
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
    export function assignClientToScripts(...entity : Entity[]): void {};
    export function canEdit(): boolean {
      return false;
    };
    export function castScreenSpaceRay(
      x : number,
      y : number,
      selectEntity ?: boolean,
      keepOldSelection ?: boolean,
      seekExternalLinker ?: boolean,
      planeNormal ?: SDK_Vec3 | null,
      planeDistanceFromOrigin ?: number
    ): {
      entity : Entity | null,
      pickedPosition ?: SDK_Vec3,
      pickedNormal ?: SDK_Vec3
    } {
      return {entity: null}
    };
    export function computeBoundingBoxes(): {
      [sceneUUID : string]: { aabb : AABB, entities : Entities, parentLinker : Entity }
    } {
      return {}
    };
    export function deleteEntities(entities : Entities): void {};
    export function detachExternalComponent(entities : Entities, componentType : string): void {};
    export function discardOverriddenComponent(entities : Entities, componentType : string): void {};
    export function discardOverriddenComponents(entities : Entities): void {};
    export function findEntities(nameOrEUID : string, componentFilter ?: ComponentFilter): Entities {
      return []
    };
    export function findEntitiesByComponents(componentFilter : ComponentFilter): Entities {
      return []
    };
    export function findEntitiesByEUID(euid : string): Entities {
      return []
    };
    export function findEntitiesByNames(...entityNames : string[]): Entities {
      return []
    };
    export function fireEvent(
      eventMapUUID : string,
      eventName : string,
      entities ?: Entities,
      dataObject ?: object
    ): void {};
    export function getDefaultSceneSettings(settingsType : string): SceneSettings {
      return {}
    };
    export function getEntity(entityRTID : string): Entity {
      return new Entity
    };
    export function getRootEntities(): Entities {
      return []
    };
    export function getSceneSettings(settingsType : string): SceneSettings {
      return {}
    };
    export function getSceneStats(): {
      entityCount : number,
      triangleCount : number,
      totalTriangleCount : number
    } {
      return {entityCount : 0, triangleCount : 0, totalTriangleCount : 0}
    };
    export function getSelectedEntities(): Entities {
      return []
    };
    export function instantiateEntities(parent : Entity | null, entityTemplates : Array<EntityTemplate>): Entities {
      return []
    };
    export function onEnterTrigger(callback : TriggerCallback): void {};
    export function onExitTrigger(callback : TriggerCallback): void {};
    export function overrideComponent(entities : Entities, componentType: string): void {};
    export function pauseAnimationSequence(animationSequenceUUID : string, linker : Entity | null): void {};
    export function pauseSimulation(): void {};
    export function physicsRaycast(origin : SDK_Vec3, direction : PhysicsQueryFilterFlags, maxNumTouches : number): PhysicsRaycastResult {
      return {block : null, touches : null}
    };
    
  }
}