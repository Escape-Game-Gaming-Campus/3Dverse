import { useRef } from "react";
import { SDK_Vec3 } from "../../../_3dverseEngine/declareGlobal";
import Player from "../../../constants/players";
import { getInventory } from "../../inventory";
import { _SDK3DVerse } from "../../../_3dverseEngine/declare";

export class Totoro {
    private itemUUID: string;
    public itemCatch: boolean;
    private playerNear: { "timer": number, "playerName": string };
    private audioRef = useRef(new Audio("bip.mp3"));
    private SDK3Dverse?: typeof _SDK3DVerse;
    public timerEnd: boolean = true;
    public keyPickedUp:boolean = false;
    public hotAndColdBool = false;
    constructor(itemUUID: string) {
        this.itemUUID = itemUUID;
        this.playerNear = { "timer": 0, "playerName": "" };
        this.itemCatch = false;
    };

    set SDK3dverse(SDK3Dverse: typeof _SDK3DVerse) {
        this.SDK3Dverse = SDK3Dverse;
    }

    public hotAndCold(player: Player, itemPos: SDK_Vec3) {
        const gapTimer = 100 // in ms for 1 meters
        const playerPos = { "x": player.position[0], "y": player.position[1], "z": player.position[2] }

        const vector = { "x": itemPos[0] - playerPos.x, "z": itemPos[2] - playerPos.z }
        const distance = Math.sqrt((vector.x * vector.x) + (vector.z * vector.z))

        const factor = 5;
        const timer = (gapTimer * (distance * factor))// - 475 * factor //duréee

        return { "timer": timer, "playerName": player.name }
    }

    public setPlayerNear(players: Player[], itemPos: SDK_Vec3) {
        players.forEach((player) => {
            const selectedPlayer = this.hotAndCold(player, itemPos);
            if (this.playerNear.playerName == '') {
                this.playerNear = selectedPlayer;
            }
            else if (this.playerNear.timer > selectedPlayer.timer){
                this.playerNear = selectedPlayer;
            }
        })
    }

    public soundNearHotAndCold(players: Player[], itemPos: SDK_Vec3, currentPlayerName: string) {
        this.setPlayerNear(players, itemPos);
        if (this.playerNear.playerName === currentPlayerName) {
            this.timerEnd = false;
            setTimeout(() => {
                this.audioRef.current.play().then(() => {}).catch(() => {});
                this.timerEnd = true;
            }, this.playerNear.timer)
        }
    }

    public setItemCatched() {
        if (getInventory(this.itemUUID) as Object) {
            this.itemCatch = true;
        }
    }

    public enigmHotAndCold(players: Player[], itemPos: SDK_Vec3, currentPlayerName: string) {
        if (!players) return
        this.setItemCatched();
        this.soundNearHotAndCold(players, itemPos, currentPlayerName);

    }
}

