(function () {
    const header = document.querySelector("body > header");
    if (!header) {
        return;
    }

    function updateScrolled() {
        header.classList.toggle("is-scrolled", window.scrollY > 0);
    }

    window.addEventListener("scroll", updateScrolled, { passive: true });
    updateScrolled();

    const button = header.querySelector("button[aria-controls='menu-principal']");
    const nav = document.getElementById("menu-principal");
    if (!button || !nav) {
        return;
    }

    function isOpen() {
        return button.getAttribute("aria-expanded") === "true";
    }

    function setOpen(open) {
        button.setAttribute("aria-expanded", open ? "true" : "false");
        button.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");

        if (open) {
            nav.setAttribute("data-open", "");
        } else {
            nav.removeAttribute("data-open");
        }
    }

    button.addEventListener("click", function () {
        setOpen(!isOpen());
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isOpen()) {
            setOpen(false);
            button.focus();
        }
    });

    nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            setOpen(false);
        });
    });

    document.addEventListener("click", function (event) {
        if (!isOpen()) {
            return;
        }

        if (header.contains(event.target)) {
            return;
        }

        setOpen(false);
    });
})();
