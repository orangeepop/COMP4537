import { REMOVE } from "../lang/messages/en/user.js";

// chatGPT used for passing function references

export class NoteElement {
    constructor(note, disabled, markDirtyFunction = () => {}, deleteNoteFunction = () => {}) {
        this._note = note;
        this._element = document.createElement("div");
        this._element.className = "note-input";
        this._disabled = disabled;

        this._appendTextarea(markDirtyFunction);

        if (!disabled) {
            this._appendDeleteButton(markDirtyFunction, deleteNoteFunction);
        }
    }

    get element() {
        return this._element;
    }

    _appendTextarea(markDirtyFunction) {
        let textarea = document.createElement("textarea");
        textarea.value = this._note.content;
        textarea.className = "note-content";
        textarea.id = `${this._note.id}`;
        textarea.disabled = this._disabled;
        textarea.addEventListener("input", () => {
            markDirtyFunction();
        });

        this._element.appendChild(textarea);
    }

    _appendDeleteButton(markDirtyFunction, deleteNoteFunction) {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = REMOVE;
        deleteButton.id = "remove-button";
        deleteButton.addEventListener("click", () => {
            deleteNoteFunction();
            markDirtyFunction();
            this._element.remove();
        });
        this._element.appendChild(deleteButton);
    }
}