import { useState } from "react";

export class BlocNote {

    information: string;

    public opened: boolean;
    private setOpened: Function;

    constructor(opened : boolean, setOpened : Function) {
        this.information = "";
        this.opened = opened;
        this.setOpened = setOpened;
    };

    public blocNoteButton = () => {
        return <div className="blocNoteButton">
            <button onClick={()=> {
                this.setOpened(true);
                }}>Bloc note</button>
        </div>
    }

    public onSubmitInformation(event: any) {
        console.log(event.target.value)
        // this.information = event.target.value;
    }
}

export const BlocNoteReact = () => {
    const [opened, setOpened] = useState(false);

    const blocNote = new BlocNote(opened, setOpened);

    return <>{blocNote.blocNoteButton()}{
        blocNote.opened ?
        <div className="information">
            <form>
                <label>
                    Notes
                    {/* <textarea name="information" value={this.information} onChange={this.onSubmitInformation}/> */}
                    <textarea name="information" />
                </label>
                <input type="submit" value="Enregistrer" />
            </form>
        </div>
        : <></>
        }</>

}