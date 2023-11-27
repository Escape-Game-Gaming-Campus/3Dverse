import { _SDK3DVerse } from "SDK3DVerse.js";
import App from "../../app.js";

export class Entity {
    private SDK3DVerse?: typeof _SDK3DVerse;

    constructor(){
        this.SDK3DVerse = new App().INSTANCE?.SDK3DVerse
    }

    public console () {
        const entity = this.SDK3DVerse?.engineAPI.findEntitiesByEUID("ed5186d6-ee8d-416c-a4dd-bef4bb6d9622")
        console.log(entity)
    }
    
}

