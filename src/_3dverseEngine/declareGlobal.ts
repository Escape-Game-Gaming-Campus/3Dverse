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
    creator_user_id : string,
    country_code : string,
    continent_code : string
}

export type GetSceneSessions_UserInfo = {
    client_id ? : string,
    client_type ? : 'user' | 'guest',
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
    camera ? : Entity,
    defaultControllerType ? : number,
    onCameraCreation ? : Function
}

export type SDK_Vec3 = [number, number, number] // [x, y, z]

export type AABB = {
    min ? : SDK_Vec3,
    max ? : SDK_Vec3
}

export type ComponentFilter = {
    mandatoryComponents ? : string[],
    forbiddenComponents ? : string[]
}

export type SceneSettings = {
    clearColor ? : [number, number, number],
    ambientColorTop ? : [number, number, number],
    ambientColorBottom ? : [number, number, number]
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
    position ? : SDK_Vec3,
    orientation ? : SDK_Quat,
    scale ? : SDK_Vec3,
    eulerOrientation ? : SDK_Vec3,
    globalEulerOrientation ? : SDK_Vec3
}

export type onEntitySelectionChanged = {
    "selectedEntities" : Entities,
    "unselectedEntities" : Entities,
    "triggeredBy" : string
};
export enum onEntitySelectionChangedType {
    selectedEntities = "selectedEntities",
    unselectedEntities = "unselectedEntities",
    triggeredBy = "triggeredBy"
};

export enum ExternalComponentState {
    unmodified = "unmodified",
    overridden = "overridden",
    detached = "detached",
    new = "new"
};

export enum ExternalEntityState {
    unmodified = "unmodified",
    overridden = "overridden",
    deleted = "deleted"
};

export type SceneSettingsMapDisplay = {
    maxFPS : number,
    maxTextureSize : number,
    forceRedraw : boolean,
    drawDebugLines : boolean,
    drawCameraFrustum : boolean,
    drawBoundingBox : boolean,
    enableFrustumCulling : boolean,
    enableTextureStreaming : boolean
}
export type SceneSettingsMapEnvironment = {
    clearColor : SDK_Vec3,
    ambientColorTop : SDK_Vec3,
    ambientColorBottom : SDK_Vec3
}
export type SceneSettingsMapMisc = {
    maxLinkersRecursionCount : number
}
export type SceneSettingsMapPhysics = {
    gravity : SDK_Vec3
}
export type SceneSettingsMapRenderer = {
    cpuOcclusionCulling : boolean
}
export type SceneSettingsMapSound = {
    enabled : boolean
}
export type SceneSettingsMapStreaming = {
    streamingLoadingRadius : number,
    streamingUnloadingRadius : number
}
export type SceneSettingsMapVoxel = {
    maxnumberAlbedoValues : number
}

export type SceneSettingsMap = {
    display : SceneSettingsMapDisplay,
    environment : SceneSettingsMapEnvironment,
    misc : SceneSettingsMapMisc,
    physics : SceneSettingsMapPhysics,
    renderer : SceneSettingsMapRenderer,
    sound : SceneSettingsMapSound,
    streaming : SceneSettingsMapStreaming,
    voxel : SceneSettingsMapVoxel
}
export enum SDK3DVerse_ExtensionInterface {}

export enum componentsType {
    animation_controller = "animation_controller",
    box_geometry = "box_geometry",
    camera = "camera",
    capsule_geometry = "capsule_geometry",
    character_controller = "character_controller",
    collision_geometry_ref = "collision_geometry_ref",
    culling_geometry = "culling_geometry",
    cylinder_geometry = "cylinder_geometry",
    debug_name = "debug_name",
    decal_projector = "decal_projector",
    environment = "environment",
    joint = "joint",
    local_transform = "local_transform",
    material = "material",
    material_ref = "material_ref",
    mesh_ref = "mesh_ref",
    orthographic_lens = "orthographic_lens",
    overrider = "overrider",
    perspective_lens = "perspective_lens",
    physics_material = "physics_material",
    planar_reflection_probe = "planar_reflection_probe",
    plane_geometry = "plane_geometry",
    point_cloud_ref = "point_cloud_ref",
    point_light = "	point_light",
    reflection_probe = "reflection_probe",
    revolute_joint = "revolute_joint",
    rigid_body = "rigid_body",
    scene_ref = "scene_ref",
    script_element = "script_element",
    script_map = "script_map",
    shadow_caster = "shadow_caster",
    skeleton_ref = "skeleton_ref",
    sphere_geometry = "sphere_geometry",
    spot_light = "spot_light",
    stereoscopic_lens = "stereoscopic_lens",
    tags = "tags",
    vehicle_controller = "vehicle_controller",
    volume_filter = "volume_filter",
    volume_material_ref = "volume_material_ref",
    volume_ref = "volume_ref"
};

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
    public getExternalComponentState(componentType : string) : ExternalComponentState {
        return ExternalComponentState.unmodified
    } ;
    public getExternalState(componentType : string) : ExternalEntityState {
        return ExternalEntityState.unmodified
    } ;
    public getGlobalAABB() : AABB {
        return {} 
    } ;
    public getGlobalMatrix(stopAtParent ? : Entity | null) : mat4 {
        return [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
    } ;
    public getGlobalTransform(stopAtParen ? : Entity | null) : Transform {
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
        return new Entity()
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

export class Viewport {
    public focusOn(entity : Entity, options : {
        startPosition ? : SDK_Vec3,
        startOrientation ? : 	SDK_Quat,
        speedFactor ? : number,
        distanceShift ? : number
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
        return new Entity()
    };
    public getId() : number {
        return 0
    };
    public getOffset() : Array<number> {
        return []
    };
    public getProjection() : any {
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
    public getTransform() : any {
        return []
    };
    public getViewProjectionMatrix() : mat4 {
        return [1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                0,0,0,1]
    } ;
    public getWorldMatrix() : Entity {
        return new Entity()
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
    public setGlobalTransform(globalTransform : Transform, propagateChanges ? : boolean) : void {};
    public setOffset(left : number, top : number,  triggerViewportUpdate : boolean = true) : void {};
    public setOffsetRatio(left : number, top : number,  triggerViewportUpdate : boolean) : void {};
    public setTransform(globalTransform : any, propagateChanges : boolean = true) : void {};
    public setZoomFactor(factor : number) : void {};
}