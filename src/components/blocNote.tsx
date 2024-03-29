import { useEffect, useState } from "react";
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
        return <div className="blocNoteButton bluringOff">
            <i className="fa-regular fa-clipboard"
                onClick={() => {
                    this.setOpened(true);
                    bluringCanvas(25);
                }} />
        </div>
    }

}

export const BlocNoteReact = () => {
    const [opened, setOpened] = useState(false);
    const [information, setInformation] = useState("");

    channel.get(pusherChannels.DEV).bind('notesChange', function (data: {notes : string}) {
        setInformation(data.notes)
    });

    const blocNote = new BlocNote(opened, setOpened, information);

    useEffect(() => {
        var element = document.getElementById("allNotes");
        if (element === null) return;
        element.style.height = "1px";
        element.style.height = `${element.scrollHeight}px`;
    }, [information, blocNote.opened]);

    return <>{
        blocNote.opened ?
            <>
                <div className="information">
                    <form>
                        <textarea id="allNotes" placeholder="Notes" value={blocNote.information}
                            onChange={(event: any) => {
                                setInformation(event.target.value)

                                axios.post(`${AppConfig.API.HOST}:${AppConfig.API.PORT}/notesChanges`, {notes : event.target.value})
                                .then((response) => { })
                                .catch(err => {});
                            }} />
                    </form>
                </div>
                <i className="fa-solid fa-x"
                    onClick={() => { 
                        setOpened(false);
                        bluringCanvas();
                    }} />
            </>
            : <>{blocNote.blocNoteButton()}</>
    }</>

}