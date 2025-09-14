import { LAB_TITLE, NAME, READER, WRITER } from "../../lang/messages/en/user.js";

class Main {
    constructor() {
        let title = document.createElement("h1");
        title.textContent = LAB_TITLE;
        let name = document.createElement("h3");
        name.textContent = NAME;

        let readerButton = document.createElement("button");
        readerButton.textContent = READER;
        readerButton.addEventListener("click", () => {
            window.location.href = "/reader.html";
        });

        let writerButton = document.createElement("button");
        writerButton.textContent = WRITER;
        writerButton.addEventListener("click", () => {
            window.location.href = "writer.html";
        });

        let buttonsDiv = document.createElement("div");
        buttonsDiv.appendChild(readerButton);
        buttonsDiv.appendChild(writerButton);

        document.getElementById("container").appendChild(title);
        document.getElementById("container").appendChild(name);
        document.getElementById("container").appendChild(buttonsDiv);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new Main();
});

