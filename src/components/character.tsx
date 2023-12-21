import { _SDK3DVerse } from '../_3dverseEngine/declare';

export class Character {
  public camPos?: Array<number>;

  private SDK3DVerse: typeof _SDK3DVerse;
  constructor(SDK3DVerse: typeof _SDK3DVerse) {
    this.SDK3DVerse = SDK3DVerse;
  };
  public async InitFirstPersonController(charCtlSceneUUID: string, playerName : string) {
    const playerTemplate = new this.SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
    playerTemplate.attachComponent("local_transform", { position: [-5, 1, -8.15] , eulerOrientation : [ 0, -90, 0 ]});
    const parentEntity = null;
    const deleteOnClientDisconnection = true;
    playerName += this.SDK3DVerse.getClientUUID()
    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
      playerName,
      parentEntity,
      deleteOnClientDisconnection
    );

    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    //firstPersonController.setGlobalTransform({ position: [-5, 1, -8.15] , orientation : [ 0, -0.8509035, 0, 0.525322 ]})
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child: any) =>
      child.isAttached("camera")
    );

    this.SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
    if (firstPersonCamera)
    {
      this.SDK3DVerse.setMainCamera(firstPersonCamera);
      this.camPos = firstPersonCamera?.getGlobalTransform().position;
    }
  }

}

