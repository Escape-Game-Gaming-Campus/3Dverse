import { useRef } from "react";
import { SDK_Vec3 } from "../../../_3dverseEngine/declareGlobal";
import Player from "../../../constants/players";
import { getInventory } from "../../inventory";
import { player } from "../../player";
import { _SDK3DVerse } from "../../../_3dverseEngine/declare";

export class Totoro {
    private itemUUID: string;
    public itemCatch: boolean;
    private playerNear: { "timer": number, "playerName": string };
    private audioRef = useRef(new Audio("bip.mp3"));
    private SDK3Dverse?: typeof _SDK3DVerse;

    constructor(itemUUID: string) {
        this.itemUUID = itemUUID;
        this.playerNear = { "timer": 0, "playerName": "" };
        this.itemCatch = false;
    };

    set SDK3dverse(SDK3Dverse: typeof _SDK3DVerse) {
        this.SDK3Dverse = SDK3Dverse;
    }

    public hotAndCold(player: Player, itemPos: SDK_Vec3) {
        const gapTimer = 1000 // in ms for 1 meters
        const playerPos = { "x": player.position[0], "y": player.position[1], "z": player.position[2] }
        console.log("hac item", itemPos)
        console.log("hac player", playerPos)

        const vector = { "x": playerPos.x - itemPos[0], "y": playerPos.y - itemPos[1], "z": playerPos.y - itemPos[2] }
        const distance = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y) + (vector.z * vector.z))

        console.log("hac vector", vector)
        console.log("hac distance", distance)

        const timer = gapTimer * distance
        console.log("hac timer", timer)

        return { "timer": timer, "playerName": player.name }
    }

    public setPlayerNear(players: Player[], itemPos: SDK_Vec3) {
        console.log("fpss", players)
        players.forEach((player) => {
            const selectedPlayer = this.hotAndCold(player, itemPos);
            if (this.playerNear.timer === 0) {
                this.playerNear = selectedPlayer;
            }
            else if (this.playerNear.timer > selectedPlayer.timer) {
                this.playerNear = selectedPlayer;
            }
        })
    }

    public soundNearHotAndCold(players: Player[], itemPos: SDK_Vec3, currentPlayerName: string) {
        this.setPlayerNear(players, itemPos);
        console.log("hac currentPlayer", currentPlayerName)
        if (this.playerNear.playerName === currentPlayerName) {
            setTimeout(() => {
                // this.audioRef.current.play();
                console.log("hac bip");
            }, this.playerNear.timer)
        }
    }

    public setItemCatched() {
        if (getInventory(this.itemUUID) as Object) {
            this.itemCatch = true;
        }
    }

    public enigmHotAndCold(players: Player[], itemPos: SDK_Vec3, currentPlayerName: string) {
        console.log("fps", players)
        console.log("itemsPos", itemPos)
        if (!players) return

        this.setItemCatched();
        this.soundNearHotAndCold(players, itemPos, currentPlayerName);
        console.log("hac itemCatched", this.itemCatch)

    }
}

