// theme

const body = document.body;
const darkIcons = document.querySelectorAll(".img-dark");
const whiteIcons = document.querySelectorAll(".img-white");
const headerChangeTheme = document.querySelector(".header__change-theme");
const changeThemeBtns = document.querySelectorAll(
  ".header__change-theme button"
);

function updateIcons() {
  if (body.classList.contains("dark")) {
    darkIcons.forEach((icon) => (icon.style.display = "none"));
    whiteIcons.forEach((icon) => (icon.style.display = "block"));
  } else {
    whiteIcons.forEach((icon) => (icon.style.display = "none"));
    darkIcons.forEach((icon) => (icon.style.display = "block"));
  }
}

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    body.classList.remove("white");
    headerChangeTheme.classList.add("dark-theme");
    headerChangeTheme.classList.remove("white-theme");
  } else {
    body.classList.add("white");
    body.classList.remove("dark");
    headerChangeTheme.classList.add("white-theme");
    headerChangeTheme.classList.remove("dark-theme");
  }

  localStorage.setItem("theme", theme);
  updateIcons();
}

function checkUserTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDark ? "dark" : "white");
  }
}

checkUserTheme();

changeThemeBtns.forEach((button) => {
  button.addEventListener("click", function () {
    const theme = button.dataset.theme;
    setTheme(theme);
  });
});

// change language

const langButtons = document.querySelectorAll(".language-selection__btn");
const langElements = document.querySelectorAll("[data-lang]");

function setLanguage(lang) {
  if (!languages[lang]) return;

  langElements.forEach((el) => {
    const key = el.dataset.lang;
    if (languages[lang][key]) {
      el.textContent = languages[lang][key];
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("language__active", btn.value === lang);
  });

  localStorage.setItem("language", lang);
}

function checkUserLanguage() {
  const savedLanguage = localStorage.getItem("language");
  const browserLanguage = navigator.language.startsWith("pl") ? "pl" : "eng";

  setLanguage(savedLanguage || browserLanguage);
}

checkUserLanguage();

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setLanguage(button.value);
  });
});

// burger menu

const header = document.querySelector(".header");
const bugrenBtn = document.querySelector(".header__nav-btn");

bugrenBtn.addEventListener("click", () => {
  header.classList.toggle("header--mobile");
});

// main change phase
function changeLanguageAndUpdateText(lang) {
  currentLanguage = lang;
  localStorage.setItem("language", lang);
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedLang = button.value;
    changeLanguageAndUpdateText(selectedLang);
  });
});

let currentLanguage =
  localStorage.getItem("language") ||
  (navigator.language.startsWith("pl") ? "pl" : "eng");

// download app swiper
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 7,
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  spaceBetween: 10,
  speed: 1000,
  breakpoints: {
    650: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

// validation

const popUp = document.querySelector(".form__success");

document
  .querySelector(".form__btn")
  .addEventListener("click", async function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll(".input__wrapper");
    inputs.forEach((inputWrapper) => {
      inputWrapper.classList.remove(
        "input__wrapper-validate",
        "input__wrapper-error"
      );
      const errorSpan = inputWrapper.querySelector(".input__error");
      if (errorSpan) {
        errorSpan.textContent = "";
        errorSpan.removeAttribute("data-lang");
      }
    });

    let isValid = true;

    const nameInput = document.getElementById("name");
    const nameWrapper = document.querySelector(".input__wrapper-first");
    const nameError = nameWrapper.querySelector(".input__error");
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      nameWrapper.classList.add("input__wrapper-error");
      nameError.textContent = "Name is required.";
      nameError.setAttribute("data-lang", "error__name_required");
      isValid = false;
    } else if (nameValue.length < 2 || nameValue.length > 20) {
      nameWrapper.classList.add("input__wrapper-error");
      nameError.textContent = "Name must be between 2 and 20 characters.";
      nameError.setAttribute("data-lang", "error__name_length");
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
      nameWrapper.classList.add("input__wrapper-error");
      nameError.textContent = "Name must only contain letters.";
      nameError.setAttribute("data-lang", "error__name_letters");
      isValid = false;
    } else {
      nameWrapper.classList.add("input__wrapper-validate");
    }

    const emailOrPhoneInput = document.getElementById("e-mail-or-phone");
    const emailOrPhoneWrapper = document.querySelector(
      ".input__wrapper-second"
    );
    const emailOrPhoneError =
      emailOrPhoneWrapper.querySelector(".input__error");
    const emailOrPhoneValue = emailOrPhoneInput.value.trim();

    if (emailOrPhoneValue === "") {
      emailOrPhoneWrapper.classList.add("input__wrapper-error");
      emailOrPhoneError.textContent = "Email or phone number is required.";
      emailOrPhoneError.setAttribute(
        "data-lang",
        "error__email_phone_required"
      );
      isValid = false;
    } else if (
      /^\d+$/.test(emailOrPhoneValue) ||
      /^[\+]*\d+$/.test(emailOrPhoneValue)
    ) {
      const phoneRegex = /^(\+?\d{10,15})$/;
      if (!phoneRegex.test(emailOrPhoneValue)) {
        emailOrPhoneWrapper.classList.add("input__wrapper-error");
        emailOrPhoneError.textContent =
          "Phone number must be 10-15 digits, with or without '+' sign.";
        emailOrPhoneError.setAttribute("data-lang", "error__phone_format");
        isValid = false;
      } else {
        emailOrPhoneWrapper.classList.add("input__wrapper-validate");
      }
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(emailOrPhoneValue)) {
        emailOrPhoneWrapper.classList.add("input__wrapper-error");
        emailOrPhoneError.textContent = "Please enter a valid email address.";
        emailOrPhoneError.setAttribute("data-lang", "error__email_format");
        isValid = false;
      } else {
        emailOrPhoneWrapper.classList.add("input__wrapper-validate");
      }
    }

    const currentLang = localStorage.getItem("language") || "eng"; // Берем язык из localStorage
    changeLanguage(currentLang);

    if (isValid) {
      const TheForm = document.getElementById("TheForm");
      const data = new URLSearchParams(new FormData(TheForm));
      const result = await fetch("https://formspree.io/f/xldgvrlz", {
        method: "post",
        body: data,
        redirect: "manual",
      });

      // Можно отправлять форму
      popUp.classList.add("active");
    }
  });

function changeLanguage(lang) {
  document.querySelector("#name").placeholder =
    languages[lang]["placeholder__name"];
  document.querySelector("#e-mail-or-phone").placeholder =
    languages[lang]["placeholder__email_or_phone"];

  document.querySelector('[data-lang="checkbox__p"]').textContent =
    languages[lang]["checkbox__p"];
  document.querySelector('[data-lang="form__send"]').textContent =
    languages[lang]["form__send"];

  document.querySelectorAll(".input__error").forEach((errorSpan) => {
    const errorKey = errorSpan.getAttribute("data-lang");
    if (errorKey && languages[lang][errorKey]) {
      errorSpan.textContent = languages[lang][errorKey];
    }
  });
}

// faq

// document.addEventListener("DOMContentLoaded", () => {
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  const btn = item.querySelector(".faq__btn");
  const answer = item.querySelector(".faq__answer");

  btn.addEventListener("click", () => {
    faqItems.forEach((el) => {
      if (el !== item && el.classList.contains("active")) {
        el.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});
// });

// close popup
const closePopUpBtn = popUp.querySelector(".form__success_close");
const okPopUpBtn = popUp.querySelector(".form__success_btn");

closePopUpBtn.addEventListener("click", () => {
  popUp.classList.remove("active");
});

okPopUpBtn.addEventListener("click", () => {
  popUp.classList.remove("active");
});

// links

const footerPricingPolicy = document.querySelector("#pricing_policy");
const pricingPolicyTarget = document.querySelector(".price");

const footerFAQ = document.querySelector("#FAQ");
const FAQSection = document.querySelector(".faq");

footerPricingPolicy.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: pricingPolicyTarget.offsetTop - 20,
    behavior: "smooth",
  });
});

footerFAQ.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: FAQSection.offsetTop - 20,
    behavior: "smooth",
  });
});
