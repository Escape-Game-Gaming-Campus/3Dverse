import { _SDK3DVerse } from '../_3dverseEngine/declare';
export class Raycast
{
    private SDK3DVerse:typeof _SDK3DVerse;
    private interactableObjects:string[];
    private setSelectedEntity : React.Dispatch<React.SetStateAction<number>>;

    constructor(SDK3DVerse:typeof _SDK3DVerse,interactableObjects:string[],setSelectedEntity: React.Dispatch<React.SetStateAction<number>>){
        this.SDK3DVerse = SDK3DVerse;
        this.interactableObjects = interactableObjects;
        this.setSelectedEntity = setSelectedEntity;
    };
    public async fireRay(x:number,y:number){
        const entity = await this.SDK3DVerse.engineAPI.castScreenSpaceRay(x,y,false,false,false,null,0);
        for(let i = 0;i<this.interactableObjects.length;i++)
        {
            if(entity.entity?.getEUID() === this.interactableObjects[i])
            {
                this.setSelectedEntity(i);
                console.log(i);
            }else if(entity.entity?.getParent().getEUID() === this.interactableObjects[i]){
                if(entity.entity?.getParent().getEUID() === "c930d200-ae0a-4467-b106-663ca3dfe0cf" && entity.entity?.getParent().getParent().getEUID() === "ba406661-7b0e-4436-b059-ecfa590bbb00" ){
                    this.setSelectedEntity(i);
                    console.log(i);
                }else{
                }
            }
        }
        console.log(entity.entity?.getEUID());
        console.log(entity.entity?.getParent().getEUID());
        }
}

export default Raycast;