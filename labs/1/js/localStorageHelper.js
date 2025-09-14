import { Note } from "./note.js";

export class LocalStorageHelper {
    static _checkLocalStorageSupported() {
        if (typeof(Storage) === "undefined") {
            document.write("Local Storage is not supported by your browser.");
            window.stop();
        }
    }

    static saveNotes(notes) {
        this._checkLocalStorageSupported();
        localStorage.setItem("notes", notes);
    }

    static getAllNotes() {
        this._checkLocalStorageSupported();
        const notes = [];
        console.log(localStorage)

        const notesData = localStorage.getItem("notes");
        if (notesData) {
            const notesArray = JSON.parse(notesData);
            notesArray.forEach(noteData => {
                const note = new Note(noteData.content, noteData.id, noteData.isActive);
                notes.push(note);
            });
        }
        return notes;
    }

    static deleteNoteById(id) {
        const notesData = localStorage.getItem("notes");
        if (notesData) {
            let notesArray = JSON.parse(notesData);
            notesArray = notesArray.filter(note => note.id !== id);
            localStorage.setItem("notes", JSON.stringify(notesArray));
        }
    }

    static _initializeIdCounter() {
        const initialId = 0;
        localStorage.setItem("id", initialId.toString());
    }

    static incrementIdCounter() {
        this._checkLocalStorageSupported();
        let id = localStorage.getItem("id");
        if (id) {
            const newId = parseInt(id) + 1;
            localStorage.setItem("id", newId.toString());
        } else {
            this._initializeIdCounter();
        }
    }

    static getIdCounter() {
        this._checkLocalStorageSupported();
        let id = localStorage.getItem("id");
        if (id) {
            return parseInt(id);
        } else {
            this._initializeIdCounter();
            return 0;
        }
    }
}