import { useRef } from "react";
import { SDK_Vec3 } from "../../../_3dverseEngine/declareGlobal";
import Player from "../../../constants/players";
import { getInventory } from "../../inventory";
import { player, setPlayers } from "../../player";
import { _SDK3DVerse } from "../../../_3dverseEngine/declare";

export class Totoro {
    private itemUUID: string;
    private item: SDK_Vec3 = [0, 0, 0];
    private itemCatch: boolean;
    private playerNear: { "timer": number, "playerName": string };
    private audioRef = useRef(new Audio("bip.mp3"));
    private SDK3Dverse ?: typeof _SDK3DVerse;

    constructor(itemUUID: string) {
        this.itemUUID = itemUUID;
        this.playerNear = { "timer": 0, "playerName": ""};
        this.itemCatch = false;
    };

    set SDK3dverse (SDK3Dverse : typeof _SDK3DVerse)
    {
        this.SDK3Dverse = SDK3Dverse;
    }

    set Item (item : SDK_Vec3)
    {
        this.item = item
        console.log("items", this.item)
    }
   

    public hotAndCold(player: Player) {
        const playerPos = { "x": player.position[0], "y": player.position[1], "z": player.position[2] }
        console.log("hac item", this.item)
        console.log("hac player", playerPos)

        const vector = { "x": playerPos.x - this.item[0], "y": playerPos.y - this.item[1] }
        const distance = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y))
        const gapTimer = 2000 // in ms for 1 meters

        const timer = gapTimer * distance

        return { "timer": timer, "playerName": player.name }
    }

    public setPlayerNear(players: Player[]) {
        console.log("fpss", players)
        players.forEach((player) => {
            const selectedPlayer = this.hotAndCold(player);
            if (this.playerNear.timer === 0) {
                this.playerNear = selectedPlayer;
            }
            else if (this.playerNear.timer > selectedPlayer.timer) {
                this.playerNear = selectedPlayer;
            }
        })
    }

    public soundNearHotAndCold(players: Player[]) {
        this.setPlayerNear(players);
        const currentPlayer = "Player" + this.SDK3Dverse?.getClientUUID()
        if (currentPlayer && this.playerNear.playerName === (player as Player).name) {
            setInterval(() => { this.audioRef.current.play() }, this.playerNear.timer)
        }
    }

    public setItemCatched() {
        if (getInventory(this.itemUUID) as Object) {
            this.itemCatch = true;
        }
    }

    public enigmHotAndCold(players: Player[]) {
        console.log("fps", players)
        console.log("items", this.item)
        if (!players) return
        while (!this.itemCatch) {
            this.setItemCatched();
            this.soundNearHotAndCold(players);
        }
    }
}

