/* =========================================================
   SiNG BOX — NEW DESIGN
   script-new.js
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       TRANSLATIONS
    ===================================================== */

    const translations = {

        /* =========================
           ENGLISH
        ========================= */

        en: {

            /* Navigation */

            "nav.home": "Home",
            "nav.rooms": "Rooms",
            "nav.food": "Food & Drinks",
            "nav.experience": "Experience",
            "nav.about": "About",
            "nav.contact": "Contact",


            /* Common */

            "common.bookNow": "Book now",
            "common.bookRoom": "Book a room",
            "common.helsinki": "Helsinki",
            "common.finland": "Finland",


            /* Hero */

            "hero.eyebrow":
                "Premium Korean karaoke in Helsinki",

            "hero.title":
                "A little Seoul<br>in your day.",

            "hero.tags":
                "Karaoke · Food · Drinks · Friends",

            "hero.scroll":
                "Scroll",

            "hero.side":
                "Good<br>people<br>good<br>songs",


            /* Rooms intro */

            "rooms.eyebrow":
                "Private karaoke rooms",

            "rooms.title":
                "Find your<br>vibe.",

            "rooms.text":
                "Different rooms. Same great feeling.",

            "rooms.cta":
                "Explore rooms",

            "rooms.imageText":
                "Music<br>brings<br>people<br>together",


            /* Room list */

            "roomList.eyebrow":
                "Four atmospheres",

            "roomList.title":
                "Choose your room",

            "roomList.text":
                "From intimate nights to bigger celebrations.",


            /* Gangnam */

            "room.gangnam.name":
                "Gangnam Lounge",

            "room.gangnam.guests":
                "Up to 6 guests",

            "room.gangnam.text":
                "Warm gold tones and a polished lounge atmosphere.",


            /* Seoul */

            "room.seoul.name":
                "Seoul Lounge",

            "room.seoul.guests":
                "Up to 6 guests",

            "room.seoul.text":
                "Bold pink details with modern Seoul energy.",


            /* Hongdae */

            "room.hongdae.name":
                "Hongdae Neon",

            "room.hongdae.guests":
                "Up to 4 guests",

            "room.hongdae.text":
                "An intimate neon room inspired by Hongdae nightlife.",


            /* Itaewon */

            "room.itaewon.name":
                "Itaewon Gold",

            "room.itaewon.guests":
                "Up to 4 guests",

            "room.itaewon.text":
                "A darker, luxurious room with golden details.",


            /* Food & Drinks */

            "food.eyebrow":
                "Food & Drinks",

            "food.title":
                "Good food.<br>Better company.",

            "food.text":
                "Korean flavours, creative cocktails and the perfect karaoke vibe.",

            "food.cta":
                "View menu",


            /* Menu */

            "menu.eyebrow":
                "Something for the table",

            "menu.title":
                "Menu",

            "menu.text":
                "Drinks, snacks and sweets served directly to your karaoke room.",

            "menu.soft":
                "Non-alcoholic",

            "menu.hot":
                "Hot drinks",

            "menu.snacks":
                "Snacks",

            "menu.alcohol":
                "Alcohol",

            "menu.coffee":
                "Coffee",

            "menu.tea":
                "Tea",

            "menu.popcorn":
                "Popcorn 0.5 l",

            "menu.fries":
                "French fries",

            "menu.nachos":
                "Nachos + salsa",


            /* Experience */

            "experience.eyebrow":
                "More than karaoke",

            "experience.title":
                "Your own room.<br>Your own night.",

            "experience.text":
                "Sing, eat, drink and spend the evening together in your own private space.",


            /* About */

            "about.eyebrow":
                "A little Seoul in Helsinki",

            "about.title":
                "Korean noraebang,<br>made for your night.",

            "about.text":
                "SiNG BOX brings the private-room karaoke culture of Korea to Helsinki with premium interiors, food, drinks and a relaxed atmosphere.",


            /* Final CTA */

            "cta.eyebrow":
                "It's more than karaoke",

            "cta.title":
                "Ready to sing?",

            "cta.button":
                "Book your room"

        },


        /* =========================
           FINNISH
        ========================= */

        fi: {

            /* Navigation */

            "nav.home": "Etusivu",
            "nav.rooms": "Huoneet",
            "nav.food": "Ruoka & juomat",
            "nav.experience": "Elämys",
            "nav.about": "Meistä",
            "nav.contact": "Yhteystiedot",


            /* Common */

            "common.bookNow": "Varaa nyt",
            "common.bookRoom": "Varaa huone",
            "common.helsinki": "Helsinki",
            "common.finland": "Suomi",


            /* Hero */

            "hero.eyebrow":
                "Premium korealainen karaoke Helsingissä",

            "hero.title":
                "Pala Soulia<br>päivääsi.",

            "hero.tags":
                "Karaoke · Ruoka · Juomat · Ystävät",

            "hero.scroll":
                "Vieritä",

            "hero.side":
                "Hyvät<br>tyypit<br>hyvät<br>biisit",


            /* Rooms intro */

            "rooms.eyebrow":
                "Yksityiset karaokehuoneet",

            "rooms.title":
                "Löydä oma<br>fiiliksesi.",

            "rooms.text":
                "Erilaiset huoneet. Sama upea tunnelma.",

            "rooms.cta":
                "Tutustu huoneisiin",

            "rooms.imageText":
                "Musiikki<br>tuo<br>ihmiset<br>yhteen",


            /* Room list */

            "roomList.eyebrow":
                "Neljä tunnelmaa",

            "roomList.title":
                "Valitse huoneesi",

            "roomList.text":
                "Intiimeistä illoista suurempiin juhliin.",


            /* Gangnam */

            "room.gangnam.name":
                "Gangnam Lounge",

            "room.gangnam.guests":
                "Enintään 6 henkilöä",

            "room.gangnam.text":
                "Lämpimät kultaiset sävyt ja viimeistelty lounge-tunnelma.",


            /* Seoul */

            "room.seoul.name":
                "Seoul Lounge",

            "room.seoul.guests":
                "Enintään 6 henkilöä",

            "room.seoul.text":
                "Rohkeita pinkkejä yksityiskohtia ja modernia Soulin energiaa.",


            /* Hongdae */

            "room.hongdae.name":
                "Hongdae Neon",

            "room.hongdae.guests":
                "Enintään 4 henkilöä",

            "room.hongdae.text":
                "Intiimi neonhuone Hongdaen yöelämän inspiroimana.",


            /* Itaewon */

            "room.itaewon.name":
                "Itaewon Gold",

            "room.itaewon.guests":
                "Enintään 4 henkilöä",

            "room.itaewon.text":
                "Tumma ja ylellinen huone kultaisilla yksityiskohdilla.",


            /* Food & Drinks */

            "food.eyebrow":
                "Ruoka & juomat",

            "food.title":
                "Hyvää ruokaa.<br>Vielä parempaa seuraa.",

            "food.text":
                "Korealaisia makuja, luovia cocktaileja ja täydellinen karaoketunnelma.",

            "food.cta":
                "Katso menu",


            /* Menu */

            "menu.eyebrow":
                "Jotain pöytään",

            "menu.title":
                "Menu",

            "menu.text":
                "Juomat, naposteltavat ja makeat herkut suoraan karaokehuoneeseesi.",

            "menu.soft":
                "Alkoholittomat",

            "menu.hot":
                "Kuumat juomat",

            "menu.snacks":
                "Naposteltavat",

            "menu.alcohol":
                "Alkoholijuomat",

            "menu.coffee":
                "Kahvi",

            "menu.tea":
                "Tee",

            "menu.popcorn":
                "Popcorn 0,5 l",

            "menu.fries":
                "Ranskalaiset",

            "menu.nachos":
                "Nachot + salsa",


            /* Experience */

            "experience.eyebrow":
                "Enemmän kuin karaokea",

            "experience.title":
                "Oma huone.<br>Oma ilta.",

            "experience.text":
                "Laula, syö, juo ja vietä iltaa yhdessä omassa yksityisessä tilassasi.",


            /* About */

            "about.eyebrow":
                "Pala Soulia Helsingissä",

            "about.title":
                "Korealainen noraebang,<br>sinun iltaasi varten.",

            "about.text":
                "SiNG BOX tuo korealaisen yksityishuonekaraoken kulttuurin Helsinkiin premium-tason sisustuksella, ruoalla, juomilla ja rennolla tunnelmalla.",


            /* Final CTA */

            "cta.eyebrow":
                "Enemmän kuin karaokea",

            "cta.title":
                "Valmiina laulamaan?",

            "cta.button":
                "Varaa huoneesi"

        }

    };


    /* =====================================================
       LANGUAGE SYSTEM
    ===================================================== */

    const languageButtons =
        document.querySelectorAll(".lang-btn");


    /*
       Translation function

       innerHTML is intentional here because some translations
       contain <br> elements.
    */

    function setLanguage(language) {

        if (!translations[language]) {
            language = "en";
        }


        /* Change every translated element */

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.getAttribute("data-i18n");

                const translation =
                    translations[language][key];

                if (translation !== undefined) {
                    element.innerHTML = translation;
                }

            });


        /* Set correct HTML language */

        document.documentElement.lang = language;


        /* Update language buttons */

        languageButtons.forEach(button => {

            const buttonLanguage =
                button.dataset.lang;

            button.classList.toggle(
                "active",
                buttonLanguage === language
            );

            button.setAttribute(
                "aria-pressed",
                buttonLanguage === language
                    ? "true"
                    : "false"
            );

        });


        /* Save selection */

        try {

            localStorage.setItem(
                "singbox-language",
                language
            );

        } catch (error) {

            console.warn(
                "Language preference could not be saved."
            );

        }

    }


    /* =====================================================
       LANGUAGE BUTTON EVENTS
    ===================================================== */

    languageButtons.forEach(button => {

        button.addEventListener("click", () => {

            const language =
                button.dataset.lang;

            setLanguage(language);

        });

    });


    /* =====================================================
       INITIAL LANGUAGE
    ===================================================== */

    let savedLanguage = null;

    try {

        savedLanguage =
            localStorage.getItem(
                "singbox-language"
            );

    } catch (error) {

        savedLanguage = null;

    }


    /*
       Priority:

       1. Previously selected language
       2. Browser language
       3. English
    */

    let initialLanguage = "en";


    if (
        savedLanguage === "fi" ||
        savedLanguage === "en"
    ) {

        initialLanguage = savedLanguage;

    } else {

        const browserLanguage =
            navigator.language
                .toLowerCase();

        if (
            browserLanguage.startsWith("fi")
        ) {

            initialLanguage = "fi";

        }

    }


    setLanguage(initialLanguage);


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNav =
        document.querySelector(".main-nav");


    function openMenu() {

        if (!header || !menuToggle) {
            return;
        }

        header.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu() {

        if (!header || !menuToggle) {
            return;
        }

        header.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    function toggleMenu() {

        if (!header) {
            return;
        }

        const isOpen =
            header.classList.contains(
                "menu-open"
            );

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMenu
        );

    }


    /* =====================================================
       CLOSE MOBILE MENU AFTER NAVIGATION
    ===================================================== */

    if (mainNav) {

        mainNav
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    closeMenu
                );

            });

    }


    /* =====================================================
       CLOSE MENU WHEN SCREEN BECOMES DESKTOP SIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");

                    /*
                       Ignore empty # links
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(href);

                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    /*
                       Update URL without jumping
                    */

                    try {

                        history.replaceState(
                            null,
                            "",
                            href
                        );

                    } catch (error) {

                        /* No action needed */

                    }

                }
            );

        });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".room-card, " +
            ".menu-column, " +
            ".section-heading, " +
            ".about-copy"
        );


    /*
       Give elements a reveal class first.
       CSS can animate these later if desired.
    */

    revealElements.forEach(element => {
        element.classList.add(
            "reveal-item"
        );
    });


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList.add(
                                    "revealed"
                                );

                            revealObserver
                                .unobserve(
                                    entry.target
                                );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
           Older browser fallback
        */

        revealElements.forEach(
            element => {

                element.classList.add(
                    "revealed"
                );

            }
        );

    }


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.main-nav a[href^="#"]'
        );


    if (
        "IntersectionObserver" in window &&
        sections.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        const sectionId =
                            entry.target.id;


                        navLinks.forEach(link => {

                            const href =
                                link.getAttribute(
                                    "href"
                                );

                            link.classList.toggle(
                                "current",
                                href ===
                                    "#" + sectionId
                            );

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );


        sections.forEach(section => {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       ESCAPE CLOSES MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* =====================================================
       CLICK OUTSIDE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "click",
        event => {

            if (
                !header ||
                !header.classList.contains(
                    "menu-open"
                )
            ) {
                return;
            }


            if (
                header.contains(
                    event.target
                )
            ) {
                return;
            }


            closeMenu();

        }
    );

});
