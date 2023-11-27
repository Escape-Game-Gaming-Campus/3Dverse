window.addEventListener('load', async () =>
{

    window.addEventListener('keydown', setupKeyboardLayout);
    window.addEventListener('resize', Resize);

    const connectionInfo = await SDK3DVerse.webAPI.createOrJoinSession(AppConfig.sceneUUID);

    SDK3DVerse.setViewports(null);
    SetResolution();

    SDK3DVerse.setupDisplay(document.getElementById('display_canvas'));
    SDK3DVerse.startStreamer(connectionInfo);

    await SDK3DVerse.connectToEditor();



    

    SDK3DVerse.engineAPI.fireEvent(SDK3DVerse.utils.invalidUUID, "start_simulation");

    // spawn the player entity which have its own camera entity & character controller entity
    const {
        playerEntity,
        cameraEntity,
        characterController
    } = await SpawnPlayer("9921baa5-86c9-437b-9ff6-f8f280fb04b5");

    window.onbeforeunload = () =>
    {
        SDK3DVerse.engineAPI.deleteEntities([playerEntity]);
        return null;
    };

    await attachScripts(cameraEntity, characterController);

    await SDK3DVerse.setViewports([
        {
            id : 0,
            left : 0, top: 0, width: 1, height: 1,
            defaultControllerType : -1,
            camera: cameraEntity,
            defaultCameraValues: SDK3DVerse.engineAPI.cameraAPI.getDefaultCameraValues(),
        }
    ]);
});

//--------------------------------------------------------------------------------------------------
async function SpawnPlayer(characterControllerSceneUUID)
{
    console.log("Prepping up your player's avatar...");

    const playerTemplate  = { debug_name : {value : 'Player'} };
    SDK3DVerse.utils.resolveComponentDependencies(playerTemplate, 'scene_ref');

    playerTemplate.scene_ref.value  = characterControllerSceneUUID;

    // random start position
    //const startPositions            = await SDK3DVerse.engineAPI.findEntitiesByNames("Start Position 1", "Start Position 2");
    //const rnd                       = Math.floor(Math.random() * startPositions.length);
    //playerTemplate.local_transform  = startPositions[rnd].getComponent('local_transform');

    const playerEntity              = await SDK3DVerse.engineAPI.spawnEntity(null, playerTemplate);
    let   children                  = await SDK3DVerse.engineAPI.getEntityChildren(playerEntity);
    const cameraEntity              = children.find((child) => child.isAttached('camera'));
    const characterController       = children.find((child) => child.isAttached('character_controller'));

    console.log("Awaiting teleportation accreditation...");

    children = await SDK3DVerse.engineAPI.getEntityChildren(characterController);

    return { playerEntity, cameraEntity, characterController};
}


//--------------------------------------------------------------------------------------------------
function attachScripts(cameraEntity, characterController)
{
    const cameraScriptUUID = Object.keys(cameraEntity.getComponent("script_map").elements).pop();
    const controllerScriptUUID  = Object.keys(characterController.getComponent("script_map").elements).pop();

    SDK3DVerse.engineAPI.attachToScript(characterController, controllerScriptUUID);
    SDK3DVerse.engineAPI.attachToScript(cameraEntity, cameraScriptUUID);

    console.log("Teleportation accreditation granted, brace yourself...");
    document.getElementById('display_canvas').focus();
}

//--------------------------------------------------------------------------------------------------
async function setupKeyboardLayout(event)
{
    if((event.code === "KeyA" && event.key !== "a") ||
       (event.code === "KeyQ" && event.key !== "q") ||
       (event.code === "KeyZ" && event.key !== "z") ||
       (event.code === "KeyW" && event.key !== "w"))
    {
        SDK3DVerse.actionMap.setFrenchKeyboardBindings();
        window.removeEventListener('keydown', setupKeyboardLayout);
        await SDK3DVerse.onConnected();
        SDK3DVerse.actionMap.propagate();
    }
}

//--------------------------------------------------------------------------------------------------
let debounceResizeTimeout = null;
function Resize()
{
    if(debounceResizeTimeout)
    {
        clearTimeout(debounceResizeTimeout);
    }
    debounceResizeTimeout = setTimeout(() =>
    {
        SetResolution(false);
        debounceResizeTimeout = null;
    }, 100);
}

//--------------------------------------------------------------------------------------------------
function SetResolution(showInfo = true)
{
    const container     = document.getElementById('display_canvas').parentElement;
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
        h = Math.floor(w / aspectRatio);
    }
    SDK3DVerse.setResolution(w, h, scale);

    if(showInfo)
    {
        console.log(`Setting resolution to ${w} x ${h} (scale=${scale})`);
    }
}