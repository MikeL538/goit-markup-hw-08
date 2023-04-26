const burgerMenuBtn = document.querySelector(".header-burger-menu__btn");
const burgerMenuContainer = document.querySelector(".burger-menu__container");
const burgerMenuCloseBtn = document.querySelector(".burger-menu__close-btn");
const body = document.body;
const outsideElements = document.querySelectorAll(
  "body > *:not(.burger-menu__container)"
);

// ustawienie tabindex=-1 dla elementów znajdujących się poza burger-menu__container
outsideElements.forEach((element) => {
  element.setAttribute("tabindex", "-1");
});

const trapFocus = (event) => {
  const focusableElements = burgerMenuContainer.querySelectorAll(
    "a[href], button, textarea, input[type='text'], input[type='radio'], input[type='checkbox'], select"
  );
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  if (event.keyCode === 9) {
    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }
};

const restoreFocus = () => {
  const lastElement = burgerMenuContainer.querySelector(
    ":scope > *:last-child"
  );
  lastElement.focus();
};

burgerMenuBtn.addEventListener("click", () => {
  burgerMenuContainer.classList.add("burger-menu__container--visible");
  setTimeout(() => {
    burgerMenuContainer.style.transform = "translate(-50%, -50%)";
  }, 100);
  body.classList.add("no-scroll");
  outsideElements.forEach((element) => {
    element.setAttribute("aria-hidden", "true");
  });
  burgerMenuContainer.addEventListener("keydown", trapFocus);
});

burgerMenuCloseBtn.addEventListener("click", () => {
  setTimeout(() => {
    burgerMenuContainer.classList.remove("burger-menu__container--visible");
  }, 350);
  body.classList.remove("no-scroll");
  outsideElements.forEach((element) => {
    element.removeAttribute("aria-hidden");
  });
  burgerMenuContainer.removeEventListener("keydown", trapFocus);
  restoreFocus();
  burgerMenuContainer.style.transform = "translate(100%, -50%)";
});

// obsługa kliknięć myszą na elementach spoza burger-menu__container
outsideElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (!burgerMenuContainer.contains(event.target)) {
      restoreFocus();
    }
  });
});
