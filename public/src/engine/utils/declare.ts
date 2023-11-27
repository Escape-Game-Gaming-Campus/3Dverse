import { SDK3DVerse_Entity, connectionInfo } from "./Types";

declare module 'SDK3DVerse.js' {
  export module _SDK3DVerse {
    export module webAPI {
      function createOrJoinSession(sceneId: string): Promise<connectionInfo | undefined>;
      function createSession(sceneId: string): Promise<connectionInfo | undefined>;
    }
    export module notifier {
      function on(event: string, callback: Function): void;
      function off(event: string, callback: Function): void;
    }
    export const setupDisplay: (canvas: HTMLElement | null) => void;
    export const startStreamer: (connectionInfo: any) => void;
    export const setViewports: ([] : any) => void;
    export const updateControllerSetting: ({} : Object) => void;

    export function connectToEditor(): Promise<void>;
    export function onConnected(): Promise<void>;
    export function onEditorConnected(): Promise<void>;
    export function setResolution(width : number, height : number, streamingScale?: number): void;
    export function floor(size : number): void;
    
    export module engineAPI{
      function findEntitiesByEUID(euid : string) : SDK3DVerse_Entity[];
      function createEntities(parentEntity: SDK3DVerse_Entity | null, entityTemplates: Object[], ordinal: number) : SDK3DVerse_Entity[];
      function createEntity(parentEntity: SDK3DVerse_Entity | null, entityTemplates: Object, ordinal: number) : SDK3DVerse_Entity;
      function propagateChanges (propagater? : string) : void;
      function spawnEntity(parentEntity: SDK3DVerse_Entity | null, entityTemplates: Object) : SDK3DVerse_Entity;
      function setEntityVisibility(entity : SDK3DVerse_Entity,isVisible : boolean) : void;
      function getEntityChildren(entity : SDK3DVerse_Entity) : SDK3DVerse_Entity[];
      function fireEvent(eventMapUUID : string, eventName : string, entities?: SDK3DVerse_Entity, dataObject?: Object) : void;
      function deleteEntities(entities : SDK3DVerse_Entity) : void;
      function attachToScript(entity: SDK3DVerse_Entity, scriptUUID: string) : void;
      export module cameraAPI{
        function getDefaultCameraValues():Object;
      }
    }
    export module actionMap {
      function setFrenchKeyboardBindings() : void;
      function propagate() : void;
    }
    export module utils {
      function resolveComponentDependencies(entityTemplate: Object, componentName: string) : void;
      export const invalidUUID : string;
    }

  }
}