import { PROMPT, SUCCESS, FAILURE, ERROR } from "../lang/messages/en/user.js";

const COLORS = ["red", "green", "blue", "darkgoldenrod", "orange", "purple", "pink"];
const BUTTON_CLASS_NAME = "game-button"
const BUTTON_HEIGHT = "5em";
const BUTTON_WIDTH = "10em";
const ABSOLUTE_POSITION = "absolute";
const RELATIVE_POSITION = "relative";

class Game {
    constructor () {
        this._colors = [...COLORS];
        this._clickedOrder = [];
        this._dialogElement = new Dialog();
    }

    start() {
        this._initializeGameSpace()
        const num = parseInt(document.getElementById("buttonNumber").value, 10);
        if (this._validateInput(num)) {
            this._setNumber(num);
            this._initializeButtons();
            this._initializeButtonElements();
            this._activateGame();
        }
    }

    _validateInput(num) {
        if (isNaN(num) || num < 3 || num > 7) {
            this._errorGame();
            return false;
        }
        return true;
    }

    _run() {
        const count = this._number;
        const initialWait = count * 1000;
        const delay = 2000;
      
        setTimeout(() => {
          for (let i = 0; i <= count; i++) {
            setTimeout(() => {
                if (i < count) {
                    this._scrambleAllButtons();
                } else {
                    this._activateAllButtons();
                    this._updateAllButtonElements();
                }
            }, i * delay);
          }
        }, initialWait);
    }  

    _clickedButton(n) {
        this._clickedOrder.push(n);
        this._validateClickedOrder(n);
    }

    _setState(state) {
        this._state = state;
        this._onStateChange();
    }

    _activateGame() {
        this._setState("active");
    }

    _winGame() {
        this._setState("won");
    }

    _loseGame() {
        this._setState("lost");
    }

    _errorGame() {
        this._setState("error");
    }

    _onGameEnd() {
        this._deactivateAllButtons();
        this._updateAllButtonElements();
    }

    _onGameWon() {
        this._onGameEnd();
        this._dialogElement.showSuccessDialog();
    }

    _onGameLost() {
        this._onGameEnd();
        this._dialogElement.showFailureDialog();
    }

    _onGameError() {
        this._dialogElement.showErrorDialog();
    }

    _onStateChange() {
        switch (this._state) {
            case "active":
                this._run();
                break;
            case "won":
                this._onGameWon();
                break;
            case "lost":
                this._onGameLost();
                break;
            case "error":
                this._onGameError();
                break;
            default:
                break;
        }
    }

    _initializeGameSpace() {
        const gameSpace = document.getElementById("gameSpace");
        gameSpace.innerHTML = "";
    }

    _initializeButtonElements() {
        const gameSpace = document.getElementById("gameSpace");

        this._buttons.forEach(button => {
            const btn = button.createButtonElement();
            btn.onclick = () => {
                button.deactivateButton();
                button.updateButtonElement();
                this._clickedButton(button.getNumber());
            };

            gameSpace.appendChild(btn);
        });
    }

    _setNumber(n) {
        this._number = n;
    }

    _initializeButtons() {
        this._buttons = [];
        for (let i = 0; i < this._number; i++) {
            const color = this._colors.splice(Math.floor(Math.random() * this._colors.length), 1);
            this._buttons.push(new Button(i + 1, color));
        }
    }

    _scrambleAllButtons() {
        this._buttons.forEach(button => {
            button.scramblePosition();
            button.updateButtonElement();
        });
    }

    _activateAllButtons() {
        this._buttons.forEach(button => button.activateButton());
    }

    _deactivateAllButtons() {
        this._buttons.forEach(button => button.deactivateButton());
    }

    _updateAllButtonElements() {
        this._buttons.forEach(button => button.updateButtonElement());
    }

    _validateClickedOrder(n) {
        if (n == this._clickedOrder.length) {
            this._checkWinCondition();
            return;
        } else {
            this._loseGame();
        }
    }

    _checkWinCondition() {
        if (this._clickedOrder.length === this._number) {
            this._winGame();
        }
    }
}

class Dialog {
    constructor() {
        this._dialog = document.querySelector("dialog");
        this._message = document.getElementById("dialogText");
    }

    showSuccessDialog() {
        this._updateDialogMessage(SUCCESS);
        this._show();
    }

    showFailureDialog() {
        this._updateDialogMessage(FAILURE);
        this._show();
    }

    showErrorDialog() {
        this._updateDialogMessage(ERROR);
        this._show();
    }

    _show() {
        this._dialog.showModal();
    }

    _updateDialogMessage(message) {
        this._message.textContent = message;
    }
}

class Button {
    constructor(n, color) {
        this._number = n;
        this._color = color;
        this._height = BUTTON_HEIGHT;
        this._width = BUTTON_WIDTH;
        this._position = RELATIVE_POSITION
        this._elementId = `button-${this._number}`
        this._isActive = false;
    }

    createButtonElement() {
        const btn = document.createElement("button");

        btn.className = BUTTON_CLASS_NAME;
        btn.textContent = this._number;
        btn.id = this._elementId;
        btn.disabled = true;
        btn.style.backgroundColor = this._color;
        btn.style.position = this._position;
        btn.style.height = this._height;
        btn.style.width = this._width;

        return btn;
    }

    scramblePosition() {
        this._position = ABSOLUTE_POSITION;

        const emToPx = 16;
        const btnWidthEm = parseFloat(this._width);
        const btnHeightEm = parseFloat(this._height);
        const btnWidthPx = btnWidthEm * emToPx;
        const btnHeightPx = btnHeightEm * emToPx;

        this.x = Math.floor(Math.random() * (window.innerWidth - btnWidthPx));
        this.y = Math.floor(Math.random() * (window.innerHeight - btnHeightPx));
    }

    activateButton() {
        this._setState(true);
    }

    deactivateButton() {
        this._setState(false);
    }

    updateButtonElement() {
        this._updateButtonElementPosition();
        this._updateButtonElementDisplay();
    }

    _updateButtonElementPosition() {
        const btn = this._getButtonElement();
        if (btn) {
            btn.style.position = this._position;
            if (this._position === ABSOLUTE_POSITION) {
                btn.style.left = `${this.x}px`;
                btn.style.top = `${this.y}px`;
            } else {
                btn.style.left = "";
                btn.style.top = "";
            }
        }
    }

    _updateButtonElementDisplay() {
        const btn = this._getButtonElement();
        if (btn && this._isActive === true) {
            btn.textContent = ""
        } else if (btn && this._isActive === false) {
            btn.textContent = this._number;
        }
        btn.disabled = !this._isActive;
    }

    _setState(state) {
        this._isActive = state
    }

    _getButtonElement() {
        return document.getElementById(this._elementId);
    }

    getNumber() {
        return this._number;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("prompt").textContent = PROMPT;
  
    const goBtn = document.getElementById("goButton");
    goBtn.addEventListener("click", () => {
        const game = new Game();
        game.start();
    });
  });