import { _SDK3DVerse } from "SDK3DVerse.js";
import AppConfig from "./engine/utils/AppConfig.js";
import { SDK3DVerse_Entity, vect3 } from "./engine/utils/Types.js";
import { Character } from "./scripts/entity/Character.js";
import { Camera } from "./scripts/generation/Camera.js";

export default class App {
    INSTANCE?: App;
    public SDK3DVerse: typeof _SDK3DVerse;

    //
    //
    public character: Character;
    public camera: Camera
    constructor() {
        if (!this.INSTANCE) {
            this.INSTANCE = this;
        }

        this.SDK3DVerse = SDK3DVerse; // TODO: SDK3DVerse is a global variable, do not change this line, and ignore the error !!!

        //
        //

        this.character = new Character(this.INSTANCE);
        this.camera = new Camera(this.INSTANCE)
    }

    private replaceMessage(): void {
        let message = document.getElementById("message");

        setInterval(this.replaceMessage, 5000)
        if (message?.innerHTML) {
            message.innerHTML = "";
        }
    }

    // ------------------------- Starting scene ----------------------------------------- \\
    public async startingScene() {
        const connectionInfo = await this.SDK3DVerse.webAPI.createOrJoinSession(AppConfig.SCENE_UUID)

        this.SDK3DVerse.notifier.on('onLoadingStarted', () => {
            let message = document.getElementById("message");
            if (message) {
                message.innerHTML = "Connecting...";
            }
        });

        this.SDK3DVerse.notifier.on('onLoadingProgress', (status: { message: string }) => {
            let message = document.getElementById("message");
            if (message) {
                message.innerHTML = status.message;
            }
        });

        this.SDK3DVerse.notifier.on('onLoadingEnded', (status: { message: string }) => {

            let message = document.getElementById("message");
            if (message) {
                message.innerHTML = status.message;
            }
        });
        this.SDK3DVerse.setViewports(null);
        this.SDK3DVerse.setupDisplay(document.getElementById('display_canvas'));
        // this.SDK3DVerse.setViewports([{
        //     id                      : 0,
        //     left                    : 0, top: 0, width: 1, height: 1,
        //     defaultControllerType   : 4,
        // }]);
        this.SDK3DVerse.startStreamer(connectionInfo);

        this.SDK3DVerse.connectToEditor()
        await this.SDK3DVerse.onEditorConnected();

        this.replaceMessage()
        console.log("App started");
        // this.manor.generate();

        //
        //

        function play_audio() {
            var audio = new Audio('Boo_house.mp3');
            audio.loop = true;
            audio.play();
        }
        const state = {
            eventListener: true
        };

        function clickListener() {
            play_audio();
            state.eventListener = false;
            document.removeEventListener('click', clickListener);
        }

        if (state.eventListener) {
            document.addEventListener('click', clickListener);
        }
        const test = await this.character.SpawnPlayer("9921baa5-86c9-437b-9ff6-f8f280fb04b5");
        if (test?.cameraEntity) {
            console.log(test.cameraEntity)
            console.log(test.characterController)
            this.character.attachScripts(test.cameraEntity, test.characterController);
        }
        addEventListener("keypress", (event) => { this.character.setupKeyboardLayout(event); });
        this.character.Resize();
        await this.SDK3DVerse.setViewports([
            {
                id: 0,
                left: 0, top: 0, width: 1, height: 1,
                defaultControllerType: -1,
                camera: test?.cameraEntity,
                defaultCameraValues: this.SDK3DVerse.engineAPI.cameraAPI.getDefaultCameraValues(),
            }
        ]);
        this.SDK3DVerse.engineAPI.fireEvent(this.SDK3DVerse.utils.invalidUUID, "start_simulation");
    }



    public async spawnScene(debug_name?: string, transform?: vect3, sceneUUID?: string, parentEntity: SDK3DVerse_Entity | null = null): Promise<SDK3DVerse_Entity> {
        await this.SDK3DVerse.onEditorConnected();
        let template: any = {};
        this.SDK3DVerse.utils.resolveComponentDependencies(template, 'debug_name');
        this.SDK3DVerse.utils.resolveComponentDependencies(template, 'local_transform');
        if (debug_name) {
            template.debug_name.value = debug_name;
        }
        if (transform) {
            template.local_transform.position = [transform?.x, transform?.y, transform?.z];
        }
        if (sceneUUID) {
            this.SDK3DVerse.utils.resolveComponentDependencies(template, 'scene_ref');
            template.scene_ref.value = sceneUUID;
        }

        const scene = await this.SDK3DVerse.engineAPI.spawnEntity(parentEntity, template);
        return scene;
    }
}

new App();

window.addEventListener('load', () => {
    new App().INSTANCE?.startingScene();
});