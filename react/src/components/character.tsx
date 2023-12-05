import { _SDK3DVerse } from '../_3dverseEngine/declare';

export class Character {
    private SDK3DVerse:typeof _SDK3DVerse;
    constructor(SDK3DVerse:typeof _SDK3DVerse){
        this.SDK3DVerse = SDK3DVerse;
    };
    public async InitFirstPersonController(charCtlSceneUUID:string) {
        const playerTemplate = new this.SDK3DVerse.EntityTemplate();
        playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
        const parentEntity = null;
        const deleteOnClientDisconnection = true;
        const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
          "Player",
          parentEntity,
          deleteOnClientDisconnection
        );
        const firstPersonController = (await playerSceneEntity.getChildren())[0];
        const children = await firstPersonController.getChildren();
        const firstPersonCamera = children.find((child: any) =>
          child.isAttached("camera")
        );
        
        this.SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
        // firstPersonController?.setGlobalTransform({"position":[0,10,0]})
        if(firstPersonCamera)
        this.SDK3DVerse.setMainCamera(firstPersonCamera);}
      }