import { NoteManager } from "./noteManager.js";
import { LocalStorageHelper } from "./localStorageHelper.js";
import { TimeLastAccessedLocalStoreElement } from "./timeLastAccessedLocalStoreElement.js";
import { NoteElement } from "./noteElement.js";

export class ReadNoteManager extends NoteManager {
    constructor() {
        super();
        this._readonly = true;
        this._timeLastReadElement = new TimeLastAccessedLocalStoreElement("updated");
        this._timeLastRead = Date.now();
        this._updateNotesElementsDisplay();
    }

    _scheduledFunction() {
        setInterval(() => {
            this._notes = LocalStorageHelper.getAllNotes();
            this._updateNotesElementsDisplay();
            this._timeLastRead = Date.now();
            this._timeLastReadElement.updateTimeLastSaved(new Date(this._timeLastRead));
        }, 2000);
    }

    _updateNotesElementsDisplay() {
        document.getElementById("notes-container").innerHTML = "";
        this._notes.forEach(note => {
            if (note.isActive) {
                const noteElement = new NoteElement(note, this._readonly);
                document.getElementById("notes-container").appendChild(noteElement.element);
            }
        });
    }
}