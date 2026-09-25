/* =========================================================
   SiNG BOX NORAEBANG
   script-new.js
   ========================================================= */


/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    /* =========================
       ENGLISH
    ========================= */

    en: {

        /* NAVIGATION */

        "nav.home": "Home",
        "nav.rooms": "Rooms",
        "nav.food": "Food & Drinks",
        "nav.experience": "Experience",
        "nav.about": "About",
        "nav.contact": "Contact",


        /* COMMON */

        "common.bookNow": "Book now",
        "common.bookRoom": "Book a room",
        "common.finland": "Finland",


        /* HERO */

        "hero.eyebrow":
            "Premium Korean Karaoke in Helsinki",

        "hero.title":
            "A little Seoul<br>in your day.",

        "hero.tags":
            "Karaoke · Food · Drinks · Friends",

        "hero.scroll":
            "Scroll",


        /* ROOMS INTRO */

        "rooms.eyebrow":
            "Private Karaoke Rooms",

        "rooms.title":
            "Find your<br>vibe.",

        "rooms.text":
            "Different rooms. Same great feeling.",

        "rooms.cta":
            "Explore rooms",


        /* ROOM LIST */

        "roomList.eyebrow":
            "Choose your space",

        "roomList.title":
            "Our rooms",

        "roomList.text":
            "Four private rooms. Four different atmospheres.",


        /* ROOM DETAILS */

        "room.fourGuests":
            "Up to 4 guests",

        "room.sixGuests":
            "Up to 6 guests",

        "room.from":
            "From",

        "room.hongdae.text":
            "An intimate room inspired by the energy of Hongdae.",

        "room.itaewon.text":
            "A stylish private room made for singing and spending time together.",

        "room.gangnam.text":
            "A spacious room with a polished atmosphere for bigger groups.",

        "room.seoul.text":
            "A spacious private room with modern Seoul energy.",


        /* PRICING */

        "pricing.eyebrow":
            "Karaoke pricing",

        "pricing.title":
            "Choose your<br>time.",

        "pricing.intro":
            "Room prices are per hour.",

        "pricing.scroll":
            "← Swipe to see all rooms →",

        "pricing.time":
            "Time",

        "pricing.fourPeople":
            "Up to 4 guests",

        "pricing.sixPeople":
            "Up to 6 guests",

        "pricing.monThu":
            "Mon–Thu",

        "pricing.friSat":
            "Fri–Sat",

        "pricing.sun":
            "Sun",

        "pricing.discount":
            "Mon–Thu 14–18: Students, pensioners and unemployed customers receive 10% off with a valid card.",

        "pricing.private":
            "Private events: ask us for availability and pricing.",


        /* FOOD */

        "food.eyebrow":
            "Food & Drinks",

        "food.title":
            "Good food.<br>Better company.",

        "food.text":
            "Korean flavours, creative drinks and the perfect karaoke vibe.",

        "food.cta":
            "View menu",


       /* MENU */

"menu.eyebrow":
    "Something for the table",

"menu.title":
    "Menu",

"menu.text":
    "Food, drinks and something sweet for your karaoke night.",

"menu.snacks":
    "Snacks",

"menu.sweets":
    "Sweets",

"menu.combos":
    "Combos",

"menu.soft":
    "Non-alcoholic",

"menu.alcohol":
    "Alcohol",

"menu.hot":
    "Hot drinks",


/* FOOD ITEMS */

"menu.yakitori":
    "Yakitori – Japanese chicken skewers",

"menu.karaage":
    "Karaage – Japanese fried chicken",

"menu.pizza":
    "Pizza slice",

"menu.kimbap":
    "Kimbap – Korean seaweed rolls",

"menu.springrolls":
    "Vietnamese spring rolls",

"menu.fries":
    "French fries",

"menu.vegetables":
    "Vegetable sticks – carrot, cucumber & cauliflower",

"menu.dips":
    "Mayo dips, incl. gochujang",

"menu.popcorn":
    "Popcorn 0.5 l",

"menu.nachos":
    "Nachos + salsa",


/* SWEETS */

"menu.koreanIceCream":
    "Korean marshmallow stick ice cream",

"menu.iceCream":
    "Ice cream portions",

"menu.blueberryPie":
    "Blueberry pie + vanilla sauce",

"menu.caramelCake":
    "Caramel cake",

"menu.sacherCake":
    "Sacher cake",


/* COMBOS */

"menu.sodaSnack":
    "Soda drink + snack",

"menu.shotTray":
    "Shot tray (6 shots)",


/* DRINKS */

"menu.jaffa":
    "Jaffa Orange Sugar Free 0.5 l",

"menu.salmiakkiShot":
    "Salmiakki shot 4 cl",

"menu.coffee":
    "Coffee",

       
        /* EXPERIENCE */

        "experience.eyebrow":
            "More than karaoke",

        "experience.title":
            "Your room.<br>Your night.",

        "experience.text":
            "Sing, eat, drink and spend the evening together in your own private karaoke room.",


        /* ABOUT US */

        "about.eyebrow":
            "A little Seoul in Helsinki",

        "about.title":
            "Korean noraebang.<br>Your way.",

        "about.text":
            "SiNG BOX brings Korean private-room karaoke culture to Helsinki with music, food, drinks and a space made for spending time together.",


        /* FINAL CTA */

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

        /* NAVIGATION */

        "nav.home": "Etusivu",
        "nav.rooms": "Huoneet",
        "nav.food": "Ruoka & juomat",
        "nav.experience": "Elämys",
        "nav.about us": "Meistä",
        "nav.contact": "Yhteystiedot",


        /* COMMON */

        "common.bookNow": "Varaa nyt",
        "common.bookRoom": "Varaa huone",
        "common.finland": "Suomi",


        /* HERO */

        "hero.eyebrow":
            "Premium korealainen karaoke Helsingissä",

        "hero.title":
            "Pala Soulia<br>päivääsi.",

        "hero.tags":
            "Karaoke · Ruoka · Juomat · Ystävät",

        "hero.scroll":
            "Selaa",


        /* ROOMS INTRO */

        "rooms.eyebrow":
            "Yksityiset karaokehuoneet",

        "rooms.title":
            "Löydä oma<br>tunnelmasi.",

        "rooms.text":
            "Erilaiset huoneet. Sama hyvä fiilis.",

        "rooms.cta":
            "Tutustu huoneisiin",


        /* ROOM LIST */

        "roomList.eyebrow":
            "Valitse oma tilasi",

        "roomList.title":
            "Huoneemme",

        "roomList.text":
            "Neljä yksityistä huonetta. Neljä erilaista tunnelmaa.",


        /* ROOM DETAILS */

        "room.fourGuests":
            "Enintään 4 henkilöä",

        "room.sixGuests":
            "Enintään 6 henkilöä",

        "room.from":
            "Alkaen",

        "room.hongdae.text":
            "Intiimi karaokehuone, jonka tunnelma on saanut inspiraationsa Hongdaesta.",

        "room.itaewon.text":
            "Tyylikäs yksityinen huone laulamiseen ja yhteiseen illanviettoon.",

        "room.gangnam.text":
            "Tilava ja viimeistelty karaokehuone suuremmalle seurueelle.",

        "room.seoul.text":
            "Tilava yksityinen karaokehuone modernilla Soul-tunnelmalla.",


        /* PRICING */

        "pricing.eyebrow":
            "Karaokehuoneiden hinnasto",

        "pricing.title":
            "Valitse<br>aikasi.",

        "pricing.intro":
            "Hinnat ovat huonekohtaisia tuntihintoja.",

        "pricing.scroll":
            "← Pyyhkäise nähdäksesi kaikki huoneet →",

        "pricing.time":
            "Aika",

        "pricing.fourPeople":
            "Enintään 4 henkilöä",

        "pricing.sixPeople":
            "Enintään 6 henkilöä",

        "pricing.monThu":
            "Ma–To",

        "pricing.friSat":
            "Pe–La",

        "pricing.sun":
            "Su",

        "pricing.discount":
            "Ma–To klo 14–18: opiskelija-, eläkeläis- ja työttömyyskortilla −10 %.",

        "pricing.private":
            "Yksityistilaisuudet: kysy saatavuutta ja hintaa.",


        /* FOOD */

        "food.eyebrow":
            "Ruoka & juomat",

        "food.title":
            "Hyvää ruokaa.<br>Parempaa seuraa.",

        "food.text":
            "Korealaisia makuja, juomia ja täydellinen karaoketunnelma.",

        "food.cta":
            "Katso menu",


        /* MENU */

        "menu.eyebrow":
            "Jotain pöytään",

        "menu.title":
            "Menu",

        "menu.text":
            "Juomia ja naposteltavaa karaokeiltaan.",

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


        /* EXPERIENCE */

        "experience.eyebrow":
            "Enemmän kuin karaokea",

        "experience.title":
            "Teidän huone.<br>Teidän ilta.",

        "experience.text":
            "Laula, syö, juo ja vietä iltaa yhdessä omassa yksityisessä karaokehuoneessa.",


        /* ABOUT US */

        "about.eyebrow":
            "Pala Soulia Helsingissä",

        "about us.title":
            "Korealainen noraebang.<br>Teidän tavallanne.",

        "about us.text":
            "SiNG BOX tuo korealaisen yksityishuonekaraoken Helsinkiin – musiikkia, ruokaa, juomia ja oma tila yhteiseen illanviettoon.",


        /* FINAL CTA */

        "cta.eyebrow":
            "Enemmän kuin karaokea",

        "cta.title":
            "Valmiina laulamaan?",

        "cta.button":
            "Varaa huone"
    }
};



/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

const languageButtons =
    document.querySelectorAll(".lang-btn");

const translatableElements =
    document.querySelectorAll("[data-i18n]");


/*
    Some translations contain <br>.
    For that reason innerHTML is used here intentionally.
*/

function setLanguage(language) {

    const selectedTranslations =
        translations[language];

    if (!selectedTranslations) {
        return;
    }


    /* Translate every data-i18n element */

    translatableElements.forEach((element) => {

        const key =
            element.getAttribute("data-i18n");

        const translatedText =
            selectedTranslations[key];

        if (translatedText !== undefined) {
            element.innerHTML = translatedText;
        }

    });


    /* Update language buttons */

    languageButtons.forEach((button) => {

        const buttonLanguage =
            button.getAttribute("data-lang");

        const isActive =
            buttonLanguage === language;

        button.classList.toggle(
            "active",
            isActive
        );

        button.setAttribute(
            "aria-pressed",
            isActive ? "true" : "false"
        );

    });


    /* Update HTML language */

    document.documentElement.lang =
        language;


    /* Save selected language */

    try {

        localStorage.setItem(
            "singbox-language",
            language
        );

    } catch (error) {

        /*
            Site still works if browser
            blocks localStorage.
        */

    }

}



/* =========================================================
   LANGUAGE BUTTON EVENTS
========================================================= */

languageButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const language =
                button.getAttribute("data-lang");

            setLanguage(language);

        }
    );

});



/* =========================================================
   INITIAL LANGUAGE
========================================================= */

function getInitialLanguage() {

    /*
        1. Previously selected language
    */

    try {

        const savedLanguage =
            localStorage.getItem(
                "singbox-language"
            );

        if (
            savedLanguage === "fi" ||
            savedLanguage === "en"
        ) {
            return savedLanguage;
        }

    } catch (error) {

        /*
            Continue to browser language.
        */

    }


    /*
        2. Browser language
    */

    const browserLanguage =
        (
            navigator.language ||
            navigator.userLanguage ||
            ""
        ).toLowerCase();

    if (
        browserLanguage.startsWith("fi")
    ) {
        return "fi";
    }


    /*
        3. English fallback
    */

    return "en";
}


setLanguage(
    getInitialLanguage()
);



/* =========================================================
   MOBILE MENU
========================================================= */

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


if (menuToggle && header) {

    menuToggle.addEventListener(
        "click",
        () => {

            const menuIsOpen =
                header.classList.contains(
                    "menu-open"
                );

            if (menuIsOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        }
    );

}



/* =========================================================
   CLOSE MOBILE MENU AFTER NAVIGATION
========================================================= */

if (mainNav) {

    mainNav
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

}



/* =========================================================
   CLOSE MENU WITH ESCAPE
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    }
);



/* =========================================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    (event) => {

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



/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
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



/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeaderOnScroll() {

    if (!header) {
        return;
    }

    if (window.scrollY > 20) {

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
    updateHeaderOnScroll,
    {
        passive: true
    }
);


updateHeaderOnScroll();



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const navigationLinks =
    document.querySelectorAll(
        '.main-nav a[href^="#"]'
    );


const navigationSections = [
    {
        id: "home",
        nav: "#home"
    },
    {
        id: "rooms",
        nav: "#rooms"
    },
    {
        id: "room-selection",
        nav: "#rooms"
    },
    {
        id: "pricing",
        nav: "#rooms"
    },
    {
        id: "food",
        nav: "#food"
    },
    {
        id: "menu",
        nav: "#food"
    },
    {
        id: "experience",
        nav: "#experience"
    },
    {
        id: "about",
        nav: "#about"
    },
    {
        id: "contact",
        nav: "#contact"
    }
];


function updateActiveNavigation() {

    const headerHeight =
        header
            ? header.offsetHeight
            : 0;


    const checkPoint =
        window.scrollY +
        headerHeight +
        120;


    let activeNav =
        "#home";


    navigationSections.forEach((item) => {

        const section =
            document.getElementById(
                item.id
            );


        if (!section) {
            return;
        }


        if (
            section.offsetTop <=
            checkPoint
        ) {
            activeNav = item.nav;
        }

    });


    /*
        Remove BOTH active classes
        from every navigation link first.
    */

    navigationLinks.forEach((link) => {

        link.classList.remove(
            "active",
            "current"
        );

    });


    /*
        Activate only the correct link.
    */

    navigationLinks.forEach((link) => {

        if (
            link.getAttribute("href") ===
            activeNav
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


window.addEventListener(
    "resize",
    updateActiveNavigation
);


window.addEventListener(
    "load",
    updateActiveNavigation
);


updateActiveNavigation();



/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        [
            ".room-card",
            ".menu-category",
            ".pricing-heading",
            ".pricing-table-scroll",
            ".pricing-notes"
        ].join(",")
    );


revealElements.forEach(
    (element) => {
        element.classList.add(
            "reveal-item"
        );
    }
);


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "revealed"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {
                threshold: 0.10,
                rootMargin:
                    "0px 0px -30px 0px"
            }

        );


    revealElements.forEach(
        (element) => {
            revealObserver.observe(
                element
            );
        }
    );

} else {

    /*
        Fallback for old browsers.
    */

    revealElements.forEach(
        (element) => {
            element.classList.add(
                "revealed"
            );
        }
    );

}



/* =========================================================
   WINDOW RESIZE
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
            If user rotates phone or moves
            from mobile to desktop, don't
            leave mobile menu open.
        */

        if (
            window.innerWidth > 950
        ) {
            closeMenu();
        }

    }
);
