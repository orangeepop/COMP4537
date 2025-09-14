export class TimeLastAccessedLocalStoreElement {
    constructor(readOrUpdate) {
        this._element = document.getElementById("time-last-accessed");
        this._readOrUpdate = readOrUpdate;
    }

    updateTimeLastSaved(timestamp) {
        this._element.textContent = `${this._readOrUpdate} at: ${timestamp.toLocaleTimeString()}`;
    }
}