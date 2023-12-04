export type mat4 = [
    number, number, number, number,
    number, number, number, number,
    number, number, number, number,
    number, number, number, number
]

export type SDK_Quat = [
    number, number, number, number
]

export type SessionConstraints = {
    creator_user_id: string,
    country_code: string,
    continent_code: string
}

export type GetSceneSessions_UserInfo = {
    client_id ?: string,
    client_type ?: 'user' | 'guest',
    user_id : string,
    username : string
}

export type GetSceneSessions_Session = {
    session_id : string,
    scene_id : string,
    scene_name : string,
    folder_id : string,
    max_users : number,
    creator_user_id : string,
    created_at : string,
    country_code : string,
    continent_code : string,
    clients : Array<GetSceneSessions_UserInfo>
}

export type viewport_info = {
    id : number,
    width : number,
    height : number,
    left : number,
    top : number,
    camera ?: Entity,
    defaultControllerType ?: number,
    onCameraCreation ?: Function
}

export type SDK_Vec3 = {
    creator_user_id ?: string,
    country_code ?: string,
    continent_code ?: string
}

export type AABB = {
    min ?: SDK_Vec3,
    max ?: SDK_Vec3
}

export type ComponentFilter = {
    mandatoryComponents ?: string[],
    forbiddenComponents ?: string[]
}

export type SceneSettings = {
    clearColor ?: [Number, Number, Number],
    ambientColorTop ?: [Number, Number, Number],
    ambientColorBottom ?: [Number, Number, Number]
}

export type PhysicsRayHit = {
    entity : Entity,
    position : SDK_Vec3,
    normal : SDK_Vec3
}

export type PhysicsRaycastResult = {
    block : PhysicsRayHit | null,
    touches : Array<PhysicsRayHit> | null
}

export type PhysicsQueryFilterFlags = {
    block : PhysicsRayHit | null,
    touches : Array<PhysicsRayHit> | null
}

export type TriggerCallback = (emitterEntity : Entity, triggerEntity : Entity) => void;
export type Entities = Array<Entity>;

export type Transform = {
    position ?: SDK_Vec3,
    orientation ?: SDK_Quat,
    scale ?: SDK_Vec3,
    eulerOrientation ?: SDK_Vec3,
    globalEulerOrientation ?: SDK_Vec3
}

export class Entity {
    public attachComponent(componentType : string , componentValue : object) : void {};
    public getAncestors() : Entities {
        return [];
    };
    public getChildren() : Entities {
        return [];
    };
    public getComponent(componentType : string) : object {
        return {}
    } ;
    public getComponents() : object {
        return {}
    } ;
    public getComponentTypes() : Array<string> {
        return []
    } ;
    public getEUID() : string {
        return ""
    } ;
    public getExternalComponentState(componentType : string) : ExtertnalComponentState {} ;
    public getExternalState(componentType : string) : ExternalEntityState {} ;
    public getGlobalAABB() : AABB {
        return {} 
    } ;
    public getGlobalMatrix(stopAtParent ?: Entity | null) : mat4 {
        return [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
    } ;
    public getGlobalTransform(stopAtParen ?: Entity | null) : Transform {
        return {}
    } ;
    public getID() : string {
        return ""
    } ;
    public getLocalMatrix() : mat4 {
        return [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
    } ;
    public getName(defaultNameopt : boolean = true) : string {
        return ""
    } ;
    public getParent() : Entity {
        return new Entity
    } ;
    public hasChildren() : boolean {
        return false
    } ;
    public hasParent() : boolean {
        return false
    } ;
    public isAttached(componentType : string) : boolean {
        return false
    } ;
    public isExternal() : boolean {
        return false
    } ;
    public entity(componentType : Entity) : boolean {
        return false
    } ;
    public isSelected() : boolean {
        return false
    } ;
    public isTransient() : boolean {
        return false
    } ;
    public isVisible() : boolean {
        return false
    } ;
    public lookAt(target : SDK_Vec3) : void {};
    public reparent(parent : Entity, keepGlobalTransform : boolean = true) : void {};
    public save() : void {};
    public select(keepOldSelection : boolean = false, triggeredBy : string = "select") : void {};
    public setComponent(componentType : string, componentValue : object) : void {};
    public setGlobalTransform(globalTransform : Transform) : void {};
    public setOrAttachComponent(componentType : string, componentValue : object) : void {};
    public setVisibility(isVisible : boolean) : void {};
    public unselect(triggeredBy : string = "unselect") : void {};
}

export class EntityTemplate {
    public attachComponent(componentType : string, componentValue : object) : EntityTemplate {
        return new EntityTemplate
    };
    public instantiateEntity(name : string = "unnamed entity", parent : Entity | null = null) : Entity {
        return new Entity
    };
    public instantiateTransientEntity(name : string = "unnamed entity", parent : Entity | null = null, deleteOnClientDisconnection : boolean = false) : Entity {
        return new Entity
    };
}

export class Viewport {
    public focusOn(entity : Entity, options : {
        startPosition ?: SDK_Vec3,
        startOrientation ?: 	SDK_Quat,
        speedFactor ?: number,
        distanceShift ?: number
    } = {
        speedFactor : 4,
        distanceShift : 0
    }
    ) : Promise<null> {
        return Promise.resolve(null)
    };
    public getAreaSize() : Array<number> {
        return []
    };
    public getCamera() : Entity {
        return new Entity
    };
    public getId() : number {
        return 0
    };
    public getOffset() : Array<number> {
        return []
    };
    public getProjection() : component {
        return []
    };
    public getProjectionMatrix() : mat4 {
        return [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
    } ;
    public getProjectionType() : number {
        return 0
    };
    public getTransform() : component {
        return []
    };
    public getViewProjectionMatrix() : mat4 {
        return [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
    } ;
    public getWorldMatrix() : Entity {
        return new Entity
    };
    public getZoomFactor() : number {
        return 0
    };
    public hasOrthographicProjection() : boolean {
        return false
    };
    public hasPerspectiveProjection() : boolean {
        return false
    };
    public isInArea(position : Array<number>) : boolean {
        return false
    };
    public lookAt(target : Array<number>, propagateChanges : boolean = false ) : void {};
    public project(position :  Array<number>) : Array<number> {
        return []
    };
    public reset(propagateChanges : boolean = true, travelingTime : number = 0) : void {};
    public setAreaRatio(width : number, height : number,  triggerViewportUpdate : boolean) : void {};
    public setAreaSize(width : number, height : number,  triggerViewportUpdate : boolean = true) : void {};
    public setGlobalTransform(globalTransform : Transform, propagateChanges ?: boolean) : void {};
    public setOffset(left : number, top : number,  triggerViewportUpdate : boolean = true) : void {};
    public setOffsetRatio(left : number, top : number,  triggerViewportUpdate : boolean) : void {};
    public setTransform(globalTransform : component, propagateChanges : boolean = true) : void {};
    public setZoomFactor(factor : number) : void {};
}