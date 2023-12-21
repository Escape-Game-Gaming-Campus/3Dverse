import { _SDK3DVerse } from '../_3dverseEngine/declare';

export class Character {
  public camPos?: Array<number>;

  private SDK3DVerse: typeof _SDK3DVerse;
  constructor(SDK3DVerse: typeof _SDK3DVerse) {
    this.SDK3DVerse = SDK3DVerse;
  };
  public async InitFirstPersonController(charCtlSceneUUID: string, playerName: string) {
    const playerTemplate = new this.SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
    playerTemplate.attachComponent("local_transform", { position: [-10, 1, -10] });
    const parentEntity = null;
    const deleteOnClientDisconnection = true;
    playerName += this.SDK3DVerse.getClientUUID()
    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
      "Player" + this.SDK3DVerse.getClientUUID(),
      parentEntity,
      deleteOnClientDisconnection
    );

    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child: any) =>
      child.isAttached("camera")
    );

    this.SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);
    firstPersonController?.setGlobalTransform({ "position": [-8, 1, -2] })
    if (firstPersonCamera) {
      this.SDK3DVerse.setMainCamera(firstPersonCamera);
      this.camPos = firstPersonCamera?.getGlobalTransform().position;
    }
  }
}
