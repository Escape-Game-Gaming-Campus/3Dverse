import { _SDK3DVerse } from "SDK3DVerse.js";
import AppConfig from "./engine/utils/AppConfig.js";
import ManorData from "./scripts/generation/manorDataParse.js";

export default class App {
    INSTANCE?: App;
    public SDK3DVerse: typeof _SDK3DVerse;
    // public ManorData : ManorData;

    constructor() {
        if (!this.INSTANCE) {
            this.INSTANCE = this;
        }

        this.SDK3DVerse = SDK3DVerse; // TODO: SDK3DVerse is a global variable, do not change this line, and ignore the error !!!
        // this.ManorData = new ManorData();
    }
    
    private async test() {
        const res = await this.SDK3DVerse.engineAPI.findEntitiesByEUID("ed5186d6-ee8d-416c-a4dd-bef4bb6d9622");
        console.log("res : ", res);
        return res;
    }

    private replaceMessage() : void {
        let message = document.getElementById("message");

        setInterval(this.replaceMessage, 5000)
        if (message?.innerHTML){
            message.innerHTML = "";
        }
    }

    public startingScene() {
        this.test();
        console.log(`SDK3DVerse ${this.SDK3DVerse}`)
        console.log(`SDK3DVerse.webAPI ${JSON.stringify(this.SDK3DVerse.webAPI)}`)
        this.SDK3DVerse.webAPI.createOrJoinSession(AppConfig.SCENE_UUID).then((connectionInfo) => {
            console.log(`connectionInfo: ${JSON.stringify(connectionInfo)}`)

            this.SDK3DVerse.setupDisplay(document.getElementById('display_canvas'));
            this.SDK3DVerse.startStreamer(connectionInfo);

            this.SDK3DVerse.connectToEditor().then(() => {
                console.log("App started");
            })
        }).catch((err) => {
            console.error(err);
        });

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
            // console.log(typeof this.SDK3DVerse?.engineAPI.findEntitiesByEUID("ed5186d6-ee8d-416c-a4dd-bef4bb6d9622"))
            // const entity = this.SDK3DVerse?.engineAPI.findEntitiesByEUID("ed5186d6-ee8d-416c-a4dd-bef4bb6d9622")
            // console.log("entité : ", entity)

        });

        this.replaceMessage()
        
        // console.log(this.ManorData.map)
   }
}

new App();

window.addEventListener('load', () => {
    new App().INSTANCE?.startingScene();
    new App().INSTANCE?.SDK3DVerse.actionMap.setFrenchKeyboardBindings();
});
