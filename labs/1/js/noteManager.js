import { LocalStorageHelper } from "./localStorageHelper.js";

export class NoteManager {
    constructor() {
        LocalStorageHelper.checkLocalStorageSupported();
        this._initializeBackButton();
        this._notes = LocalStorageHelper.getAllNotes();
        this._scheduledFunction();
    }

    get notesElements() {
        return document.getElementsByClassName("note-content");
    }

    _scheduledFunction() {}

    _initializeBackButton() {
        let element = document.createElement("button");
        element.id = "back-button";
        element.textContent = "Back";
        element.addEventListener("click", () => {
            window.location.href = "./index.html";
        });

        document.getElementById("back-button-container").appendChild(element);
    }
}