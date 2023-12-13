import { useState } from "react";
import "./blocNote.scss"
import bluringCanvas from "../utils/blur";
import AppConfig from '../_3dverseEngine/AppConfig.json';
import axios from "axios";
import pusherChannels from "../constants/pusherChannels";
import { channel } from "../pages/3Dverse";

export class BlocNote {

    information: string;

    public opened: boolean;
    private setOpened: Function;

    constructor(opened: boolean, setOpened: Function, information: string) {
        this.information = information;
        this.opened = opened;
        this.setOpened = setOpened;
    };

    public blocNoteButton = () => {
        return <div className="blocNoteButton">
            <i className="fa-regular fa-clipboard"
                onClick={() => {
                    this.setOpened(true);
                    bluringCanvas(25);
                }}></i>
        </div>
    }

}

export const BlocNoteReact = () => {
    const [opened, setOpened] = useState(false);
    const [information, setInformation] = useState("");

    channel.get(pusherChannels.DEV).bind('notesChange', function (data: {notes : string}) {
        console.log("PUSHER : ", JSON.stringify(data));
        setInformation(data.notes)
    });

    const blocNote = new BlocNote(opened, setOpened, information);

    return <>{
        blocNote.opened ?
            <>
                <div className="information">
                    <form>
                        <textarea placeholder="Notes" value={blocNote.information}
                            onChange={(event: any) => {
                                setInformation(event.target.value)

                                axios.post(`${AppConfig.API_HOST}:${AppConfig.API_PORT}/notesChanges`, {notes : event.target.value})
                                .then((response) => { })
                                .catch(error => console.error('Error:', error));
                            }} />
                    </form>
                </div>
                <i className="fa-solid fa-x"
                    onClick={() => { 
                        setOpened(false);
                        bluringCanvas();
                    }}></i>
            </>
            : <>{blocNote.blocNoteButton()}</>
    }</>

}