import { _SDK3DVerse } from "SDK3DVerse.js";
import App from "../../app.js";
import { SDK3DVerse_Entity } from "../../engine/utils/Types.js";

export class Character {
    private SDK3DVerse?: typeof _SDK3DVerse;
    private App: App;
    constructor(app : App){
        this.SDK3DVerse = app.SDK3DVerse;
        this.App = app;
    }

    //----------------------------Spawn Player------------------------------------------------------\\
    public async SpawnPlayer(characterControllerSceneUUID : string)
    {
        console.log("Prepping up your player's avatar...");
        
        const playerTemplate : any = { debug_name : {value : 'Player'} };
        this.SDK3DVerse?.utils.resolveComponentDependencies(playerTemplate, 'scene_ref');
    
        playerTemplate.scene_ref.value  = characterControllerSceneUUID;
    
        // random start position
        //const startPositions            = await SDK3DVerse.engineAPI.findEntitiesByNames("Start Position 1", "Start Position 2");
        //const rnd                       = Math.floor(Math.random() * startPositions.length);
        //playerTemplate.local_transform  = startPositions[rnd].getComponent('local_transform');
        const playerEntity              = await  this.SDK3DVerse?.engineAPI.spawnEntity(null, playerTemplate);
        if (!playerEntity) return // try error
        console.log("enfants:")
        const joe = await this.SDK3DVerse?.engineAPI.getEntityChildren(playerEntity)
        if(joe){
            if (joe[0].getComponent("capsule_geometry"))
        {joe[0].setGlobalTransform({"scale":[3.5,3.5,3.5],"position":[0,10,0]});}
        else{
            joe[1].setGlobalTransform({"scale":[3.5,3.5,3.5],"position":[0,10,0]});
        }
    }
        // playerEntity.setGlobalTransform({"scale":[3.5,3.5,3.5],"position":[0,10,0]});
        // this.SDK3DVerse?.engineAPI.propagateChanges();
        let   children                  = await  this.SDK3DVerse?.engineAPI.getEntityChildren(playerEntity);
        const cameraEntity              = children?.find((child) => child.isAttached('camera'));
        const characterController       = children?.find((child) => child.isAttached('character_controller'))
        console.log("Awaiting teleportation accreditation...");

        if (!characterController) return //try error
        children = await  this.SDK3DVerse?.engineAPI.getEntityChildren(characterController);
        return { playerEntity, cameraEntity, characterController};
    }

    public attachScripts(cameraEntity : SDK3DVerse_Entity, characterController : SDK3DVerse_Entity)
    {
    const cameraScriptUUID = Object.keys(cameraEntity.getComponent("script_map").elements).pop();
    const controllerScriptUUID  = Object.keys(characterController.getComponent("script_map").elements).pop();

    if (!cameraScriptUUID || !controllerScriptUUID) return // test error

    this.SDK3DVerse?.engineAPI.attachToScript(characterController, controllerScriptUUID);
    this.SDK3DVerse?.engineAPI.attachToScript(cameraEntity, cameraScriptUUID);

    console.log("Teleportation accreditation granted, brace yourself...");
    
    document.getElementById('display_canvas')?.focus();

}

//--------------------------------------------------------------------------------------------------
public async setupKeyboardLayout(event : any)
{
    if((event.code === "KeyA" && event.key !== "a") ||
       (event.code === "KeyQ" && event.key !== "q") ||
       (event.code === "KeyZ" && event.key !== "z") ||
       (event.code === "KeyW" && event.key !== "w"))
    {
        this.SDK3DVerse?.actionMap.setFrenchKeyboardBindings();
        window.removeEventListener('keydown', this.setupKeyboardLayout);
        await this.SDK3DVerse?.onConnected();
        this.SDK3DVerse?.actionMap.propagate();
    }
}

//--------------------------------------------------------------------------------------------------
public SetResolution(showInfo = true)
{
    const container = document.getElementById('display_canvas')?.parentElement;

    if (!container)return // test error

    const canvasSize    = container.getBoundingClientRect();
    //const canvasSize    = {width: window.innerWidth, height: window.innerHeight};

    const largestDim    = Math.max(canvasSize.width, canvasSize.height);
    const MAX_DIM       = 1920;
    const scale         = (largestDim > MAX_DIM) ? (MAX_DIM / largestDim) : 1;

    let w               = Math.floor(canvasSize.width);
    let h               = Math.floor(canvasSize.height);
    const aspectRatio   = w/h;

    if(w > h)
    {
        // landscape
        w = Math.floor(aspectRatio * h);
    }
    else
    {
        // portrait
    this.SDK3DVerse?.floor(w / aspectRatio);
    }
    this.SDK3DVerse?.setResolution(w, h, scale);

    if(showInfo)
    {
        console.log(`Setting resolution to ${w} x ${h} (scale=${scale})`);
    }
}
//--------------------------------------------------------------------------------------------------

public Resize()
{
    let debounceResizeTimeout = null;
    if(debounceResizeTimeout)
    {
        clearTimeout(debounceResizeTimeout);
    }
    debounceResizeTimeout = setTimeout(() =>
    {
        this.SetResolution(false);
        debounceResizeTimeout = null;
    }, 100);
}

}