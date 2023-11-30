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

export class Entity {

}