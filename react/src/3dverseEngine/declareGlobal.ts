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

export class Entity {

}

export class EntityTemplate {

}