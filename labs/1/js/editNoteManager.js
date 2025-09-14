import { NoteManager } from "./noteManager.js";
import { TimeLastAccessedLocalStoreElement } from "./timeLastAccessedLocalStoreElement.js";
import { LocalStorageHelper } from "./localStorageHelper.js";
import { Note } from "./note.js";
import { NoteElement } from "./noteElement.js";
import { ADD } from "../lang/messages/en/user.js";

export class EditNoteManager extends NoteManager {
    constructor() {
        super();
        this._initializeAddButton();
        this._readonly = false;
        this._timeLastSavedElement = new TimeLastAccessedLocalStoreElement("stored");
        this._timeLastSaved = Date.now();
        this._isDirty = false;
        this._updateNotesElementsDisplay();
    }

    get isDirty() {
        return this._isDirty;
    }

    get timeLastSaved() {
        return this._timeLastSaved;
    }

    get timeLastSaved() {
        return this._timeLastSaved;
    }

    _scheduledFunction() {
        setInterval(() => {
            if (this.isDirty) {
                this.save();
            }
        }, 2000);
    }

    _updateNotesElementsDisplay() {
        document.getElementById("notes-container").innerHTML = "";
        this._notes.forEach(note => {
            if (note.isActive) {
                const noteElement = new NoteElement(note, this._readonly, () => this.markDirty(), () => this.deleteNoteElement(note.id));
                document.getElementById("notes-container").appendChild(noteElement.element);
            }
        });
    }

    _updateNotes() {
        Array.from(this.notesElements).forEach(textarea => {
            const note = this._notes.find(n => n.id == textarea.id);
            if (note) {
                note.content = textarea.value;
            }
        });
    }

    _initializeAddButton() {
        let element = document.createElement("button");
        element.id = "add-button";
        element.textContent = ADD;
        element.addEventListener("click", () => {
            this.addNoteElement();
        });

        document.getElementById("add-note-container").appendChild(element);
    }

    save() {
        this._updateNotes();
        let serializedNotes = JSON.stringify(this._notes.map(note => note.getJsonObject()));
        LocalStorageHelper.saveNotes(serializedNotes);
        this.updateTimeLastSaved();
        this._isDirty = false;
        this._updateNotesElementsDisplay();
    }

    updateTimeLastSaved() {
        this._timeLastSaved = Date.now();
        this._timeLastSavedElement.updateTimeLastSaved(new Date(this.timeLastSaved));
    }

    addNoteElement() {
        const note = new Note("");
        this._notes.push(note);
        const noteElement = new NoteElement(note, this._readonly, () => this.markDirty());
        document.getElementById("notes-container").appendChild(noteElement.element);
        this.markDirty();
    }

    deleteNoteElement(id) {
        this._notes = this._notes.filter(note => note.id !== id);
    }

    markDirty() {
        this._isDirty = true;
    }
}