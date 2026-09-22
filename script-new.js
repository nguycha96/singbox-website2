/* =========================================================
   SiNG BOX NORAEBANG
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
            "hero.eyebrow": "Premium Korean Karaoke in Helsinki",
            "hero.title": "A little Seoul<br>in your day.",
            "hero.tags": "Karaoke · Food · Drinks · Friends",
            "hero.scroll": "Scroll",

            "hero.good": "Good",
            "hero.people": "People",
            "hero.songs": "Songs",

            /* Rooms intro */
            "rooms.eyebrow": "Private Karaoke Rooms",
            "rooms.title": "Find your<br>vibe.",
            "rooms.text": "Different rooms. Same great feeling.",
            "rooms.cta": "Explore rooms",

            "rooms.music": "Music",
            "rooms.brings": "Brings",
            "rooms.people": "People",
            "rooms.together": "Together",

            /* Room selection */
            "roomList.eyebrow": "Choose your space",
            "roomList.title": "Our rooms",
            "roomList.text":
                "Four private rooms. Four different atmospheres.",

            /* Gangnam */
            "room.gangnam.name": "Gangnam Lounge",
            "room.gangnam.guests": "Up to 6 guests",
            "room.gangnam.text":
                "Warm gold tones and a polished lounge atmosphere.",

            /* Seoul */
            "room.seoul.name": "Seoul Lounge",
            "room.seoul.guests": "Up to 6 guests",
            "room.seoul.text":
                "Bold pink details with modern Seoul energy.",

            /* Hongdae */
            "room.hongdae.name": "Hongdae Neon",
            "room.hongdae.guests": "Up to 4 guests",
            "room.hongdae.text":
                "An intimate neon room inspired by Hongdae nightlife.",

            /* Itaewon */
            "room.itaewon.name": "Itaewon Gold",
            "room.itaewon.guests": "Up to 4 guests",
            "room.itaewon.text":
                "A darker, luxurious room with golden details.",

            /* Food */
            "food.eyebrow": "Food & Drinks",
            "food.title": "Good food.<br>Better company.",
            "food.text":
                "Korean flavours, creative drinks and the perfect karaoke vibe.",
            "food.cta": "View menu",

            /* Menu */
            "menu.eyebrow": "Something for the table",
            "menu.title": "Menu",
            "menu.text":
                "Drinks and snacks for your karaoke night.",

            "menu.soft": "Non-alcoholic",
            "menu.hot": "Hot drinks",
            "menu.snacks": "Snacks",
            "menu.alcohol": "Alcohol",

            "menu.coffee": "Coffee",
            "menu.tea": "Tea",
            "menu.popcorn": "Popcorn 0.5 l",
            "menu.fries": "French fries",
            "menu.nachos": "Nachos + salsa",

            /* Experience */
            "experience.eyebrow": "More than karaoke",
            "experience.title": "Your room.<br>Your night.",
            "experience.text":
                "Sing, eat, drink and spend the evening together in your own private karaoke room.",

            /* About */
            "about.eyebrow": "A little Seoul in Helsinki",
            "about.title": "Korean noraebang.<br>Your way.",
            "about.text":
                "SiNG BOX brings Korean private-room karaoke culture to Helsinki with music, food, drinks and a space made for spending time together.",

            /* CTA */
            "cta.eyebrow": "It's more than karaoke",
            "cta.title": "Ready to sing?",
            "cta.button": "Book your room"
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
            "hero.eyebrow": "Premium korealainen karaoke Helsingissä",
            "hero.title": "Pala Soulia<br>päivääsi.",
            "hero.tags": "Karaoke · Ruoka · Juomat · Ystävät",
            "hero.scroll": "Vieritä",

            "hero.good": "Hyvät",
            "hero.people": "Tyypit",
            "hero.songs": "Biisit",

            /* Rooms intro */
            "rooms.eyebrow": "Yksityiset karaokehuoneet",
            "rooms.title": "Löydä oma<br>fiiliksesi.",
            "rooms.text":
                "Erilaiset huoneet. Sama upea tunnelma.",
            "rooms.cta": "Tutustu huoneisiin",

            "rooms.music": "Musiikki",
            "rooms.brings": "Tuo",
            "rooms.people": "Ihmiset",
            "rooms.together": "Yhteen",

            /* Room selection */
            "roomList.eyebrow": "Valitse oma tilasi",
            "roomList.title": "Huoneemme",
            "roomList.text":
                "Neljä yksityistä huonetta. Neljä erilaista tunnelmaa.",

            /* Gangnam */
            "room.gangnam.name": "Gangnam Lounge",
            "room.gangnam.guests": "Enintään 6 henkilöä",
            "room.gangnam.text":
                "Lämpimät kultaiset sävyt ja viimeistelty lounge-tunnelma.",

            /* Seoul */
            "room.seoul.name": "Seoul Lounge",
            "room.seoul.guests": "Enintään 6 henkilöä",
            "room.seoul.text":
                "Rohkeita pinkkejä yksityiskohtia ja modernia Soulin energiaa.",

            /* Hongdae */
            "room.hongdae.name": "Hongdae Neon",
            "room.hongdae.guests": "Enintään 4 henkilöä",
            "room.hongdae.text":
                "Intiimi neonhuone Hongdaen yöelämän inspiroimana.",

            /* Itaewon */
            "room.itaewon.name": "Itaewon Gold",
            "room.itaewon.guests": "Enintään 4 henkilöä",
            "room.itaewon.text":
                "Tumma ja ylellinen huone kultaisilla yksityiskohdilla.",

            /* Food */
            "food.eyebrow": "Ruoka & juomat",
            "food.title":
                "Hyvää ruokaa.<br>Parempaa seuraa.",
            "food.text":
                "Korealaisia makuja, raikkaita juomia ja täydellinen karaoketunnelma.",
            "food.cta": "Katso menu",

            /* Menu */
            "menu.eyebrow": "Jotain pöytään",
            "menu.title": "Menu",
            "menu.text":
                "Juomia ja naposteltavaa karaokeiltaasi varten.",

            "menu.soft": "Alkoholittomat",
            "menu.hot": "Kuumat juomat",
            "menu.snacks": "Naposteltavat",
            "menu.alcohol": "Alkoholijuomat",

            "menu.coffee": "Kahvi",
            "menu.tea": "Tee",
            "menu.popcorn": "Popcorn 0,5 l",
            "menu.fries": "Ranskalaiset",
            "menu.nachos": "Nachot + salsa",

            /* Experience */
            "experience.eyebrow": "Enemmän kuin karaokea",
            "experience.title": "Oma huone.<br>Oma ilta.",
            "experience.text":
                "Laula, syö, juo ja vietä iltaa yhdessä omassa yksityisessä karaokehuoneessasi.",

            /* About */
            "about.eyebrow": "Pala Soulia Helsingissä",
            "about.title":
                "Korealainen noraebang.<br>Sinun tavallasi.",
            "about.text":
                "SiNG BOX tuo korealaisen yksityishuonekaraoken kulttuurin Helsinkiin musiikin, ruoan, juomien ja yhdessäolon ympärille.",

            /* CTA */
            "cta.eyebrow": "Enemmän kuin karaokea",
            "cta.title": "Valmiina laulamaan?",
            "cta.button": "Varaa huoneesi"
        }
    };


    /* =====================================================
       LANGUAGE
    ===================================================== */

    const languageButtons =
        document.querySelectorAll(".lang-btn");


    function setLanguage(language) {

        if (!translations[language]) {
            language = "en";
        }

        const dictionary =
            translations[language];


        /* Translate all data-i18n elements */

        document
            .querySelectorAll("[data-i18n]")
            .forEach(element => {

                const key =
                    element.dataset.i18n;

                if (
                    Object.prototype.hasOwnProperty.call(
                        dictionary,
                        key
                    )
                ) {
                    /*
                       innerHTML is used because some headings
                       intentionally contain <br>.
                    */

                    element.innerHTML =
                        dictionary[key];
                }

            });


        /* HTML language */

        document.documentElement.lang =
            language;


        /* Page title */

        document.title =
            language === "fi"
                ? "SiNG BOX | Noraebang Helsinki"
                : "SiNG BOX | Noraebang Helsinki";


        /* Active FI / EN button */

        languageButtons.forEach(button => {

            const active =
                button.dataset.lang === language;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                active ? "true" : "false"
            );

        });


        /* Remember language */

        try {

            localStorage.setItem(
                "singbox-language",
                language
            );

        } catch (error) {
            /* Site still works without localStorage */
        }
    }


    /* Language buttons */

    languageButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.lang
                );

            }
        );

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


    let initialLanguage = "en";


    if (
        savedLanguage === "fi" ||
        savedLanguage === "en"
    ) {

        initialLanguage =
            savedLanguage;

    } else {

        const browserLanguage =
            (
                navigator.language ||
                "en"
            ).toLowerCase();


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


    function closeMenu() {

        if (!header || !menuToggle) {
            return;
        }

        header.classList.remove(
            "menu-open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );
    }


    function openMenu() {

        if (!header || !menuToggle) {
            return;
        }

        header.classList.add(
            "menu-open"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            event => {

                event.stopPropagation();

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
        );
    }


    /* Close after clicking nav link */

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


    /* Close with ESC */

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* Close when clicking outside */

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
                !header.contains(
                    event.target
                )
            ) {
                closeMenu();
            }

        }
    );


    /* Close if switching back to desktop */

    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 950) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const href =
                        link.getAttribute("href");


                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".main-nav a"
        );

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function setActiveNavigation(id) {

        navLinks.forEach(link => {

            const linkTarget =
                link.getAttribute("href");


            link.classList.toggle(
                "current",
                linkTarget === "#" + id
            );

        });
    }


    if (
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            /*
                               room-selection belongs
                               to Rooms navigation.
                            */

                            let id =
                                entry.target.id;


                            if (
                                id === "room-selection"
                            ) {
                                id = "rooms";
                            }


                            /*
                               Menu belongs to
                               Food & Drinks.
                            */

                            if (
                                id === "menu"
                            ) {
                                id = "food";
                            }


                            setActiveNavigation(id);
                        }

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
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );
    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".room-card, " +
            ".menu-category, " +
            ".room-selection-heading, " +
            ".menu-heading, " +
            ".experience-inner, " +
            ".about-inner"
        );


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

                            entry.target.classList.add(
                                "revealed"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.1,

                    rootMargin:
                        "0px 0px -35px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "revealed"
            );

        });
    }

});
