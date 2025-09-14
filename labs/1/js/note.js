import { LocalStorageHelper } from "./localStorageHelper.js";

export class Note {
    constructor(content, id = null, isActive = true) {
        if (id != null) {
            this._id = id;
        } else {
            this._id = LocalStorageHelper.getIdCounter();
            LocalStorageHelper.incrementIdCounter();
        }
        this._content = content;
        this._isActive = isActive;
    }
    
    set content(newContent) {
        this._content = newContent;
    }

    get id() {
        return this._id;
    }

    get content() {
        return this._content;
    }

    get isActive() {
        return this._isActive;
    }

    set isActive(status) {
        this._isActive = status;
    }

    getJsonObject() {
        return {
            id: this.id,
            content: this.content,
            isActive: this.isActive
        };
    }
}