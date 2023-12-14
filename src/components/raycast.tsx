import { _SDK3DVerse } from '../_3dverseEngine/declare';
export class Raycast
{
    private SDK3DVerse:typeof _SDK3DVerse;
    constructor(SDK3DVerse:typeof _SDK3DVerse){
        this.SDK3DVerse = SDK3DVerse;
    };
    public async fireRay(){
        const player = await this.SDK3DVerse.engineAPI.findEntities("Player"+this.SDK3DVerse.getClientUUID())[0];
        const camera = await this.SDK3DVerse.engineAPI.cameraAPI.getClientCameras(player);
        const viewport = await this.SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0];
        const cameraTransform = await this.SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getTransform();
        console.log(viewport.getWorldMatrix());
        let directionVector = [
            viewport.getWorldMatrix()[8],
            viewport.getWorldMatrix()[9],
            viewport.getWorldMatrix()[10],
          ];
        const norm = Math.sqrt(
            directionVector[0] ** 2 + directionVector[1] ** 2 + directionVector[2] ** 2
          );
        directionVector =
        [
            directionVector[0]/norm,
            directionVector[1]/norm,
            directionVector[2]/norm,
        ]
    }
}

export default Raycast;