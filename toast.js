export const Toast = {
    initialized: false,
    types: {
        info: ["#00c4ff", "#007fa5"],
        warrning: ["#fbff00", "#afb202"],
        error: ["#ff0000", "#b60000"],
        success: ["#0be12f", "#079f20"],
    },
    styleSheet: `
            .toast-container {
                position: fixed;
                right: 1%;
                width: auto;
            }
            .toast {
                border: 2px solid black;
                width: 250px;
                margin-left: -125px;
                background-color: #ddd;
                color: #000;
                border-radius: 2px;
                padding: 10px;
                z-index: 1;
                margin-bottom: 20px;
                position: relative;
                box-shadow: 1px 1px 10px 0px #00000094;
                transform: translateX(200%);
                opacity: 0;
                transition: all 0.5s cubic-bezier(0.95, -0.06, 0, 1.09);
            }
            .toast-visible {
                opacity: 1;
                transform: translateX(0);
            }
            .close {
                position: absolute;
                top: 0;
                right: 0;
                margin: 5px;
                cursor: pointer;
            }
            .title {
                margin-bottom: 15px;
            }`,
    init() {
        if (!this.initialized) {
            let style = document.createElement("style");
            style.innerHTML = this.styleSheet;
            document.head.appendChild(style);
            let newContainer = document.createElement("div");
            newContainer.className = "toast-container";
            document.body.appendChild(newContainer);
            this.container = newContainer;
            this.initialized = true;
        }
    },
    show(type, message, duration) {
        this.init();
        let toast = this.newToast(type, message, duration);
        this.container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add("toast-visible");
        }, 0);
    },
    newToast(type, message, duration) {
        const toastType = type || "info";
        const toastDuration = duration || -1;
        let toast = document.createElement("div");
        toast.classList.add("toast");
        toast.innerHTML = `<div class="title">${toastType}!</div>
                <div class="close">&#10006;</div>
                <div class="message">${message}</div>`;

        toast.querySelector(".close").addEventListener("click", () => {
            toast.classList.remove("toast-visible");
            this.removeToast(toast);
        });
        toast.style.backgroundColor = this.types[type][0];
        toast.style.borderColor = this.types[type][1];
        if (toastDuration > 0) {
            setTimeout(() => {
                toast.classList.remove("toast-visible");
                this.removeToast(toast);
            }, duration * 1000);
        }
        return toast;
    },

    removeToast(toast) {
        setTimeout(() => {
            toast.remove();
        }, 500);
    },
};
