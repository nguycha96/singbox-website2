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
        "nav.about": "About Us",
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

       // GOOD TO KNOW
"info.eyebrow": "Good to know",
"info.title": "Your night.<br>Your way.",

"info.songs.label": "Songs",
"info.songs.title": "Songs for every mood.",
"info.songs.text": "Our karaoke selection runs through Singa and offers songs across different genres, decades and languages.",
"info.songs.link": "Browse Singa's song catalogue →",

"info.food.label": "Food & Drinks",
"info.food.title": "Order during the night.",
"info.food.text": "Food and drinks are just a few taps away. Order from the tablet in your room, and we'll bring everything directly to you.",

"info.room.label": "Private room",
"info.room.title": "Your people. Your space.",
"info.room.text": "Every karaoke room is private, so the space is exclusively yours for the duration of your booking.",

"info.karaoke.label": "Karaoke",
"info.karaoke.title": "An hour or the whole night.",
"info.karaoke.text": "Book a room for the time that suits you and enjoy the night at your own pace.",
       

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
        "nav.about": "Meistä",
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

       // HYVÄ TIETÄÄ
"info.eyebrow": "Hyvä tietää",
"info.title": "Teidän ilta.<br>Teidän tavalla.",

"info.songs.label": "Biisit",
"info.songs.title": "Biisejä jokaiseen fiilikseen.",
"info.songs.text": "Karaokevalikoimamme toimii Singan kautta ja tarjoaa kappaleita eri genreistä, vuosikymmeniltä ja kielillä.",
"info.songs.link": "Selaa Singan kappalevalikoimaa →",

"info.food.label": "Ruoka & juomat",
"info.food.title": "Tilaa kesken illan.",
"info.food.text": "Ruoat ja juomat ovat vain muutaman painalluksen päässä. Tilaa huoneen tabletilta, niin me tuomme tilauksesi suoraan huoneeseen.",

"info.room.label": "Oma huone",
"info.room.title": "Teidän porukka. Teidän tila.",
"info.room.text": "Jokainen karaokehuone on yksityinen, joten tila on varauksen ajan vain teidän seurueenne käytössä.",

"info.karaoke.label": "Karaoke",
"info.karaoke.title": "Tunti tai koko ilta.",
"info.karaoke.text": "Varaa huone sopivaksi ajaksi ja jatka iltaa oman porukan tahdissa.",
       

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
            "Ruokaa, juomia ja jotain makeaa karaokeiltaan.",

        "menu.snacks":
            "Naposteltavat",

        "menu.sweets":
            "Makeat",

        "menu.combos":
            "Combot",

        "menu.soft":
            "Alkoholittomat",

        "menu.alcohol":
            "Alkoholijuomat",

        "menu.hot":
            "Kuumat juomat",


        /* FOOD ITEMS */

        "menu.yakitori":
            "Yakitori – japanilaiset kanavartaat",

        "menu.karaage":
            "Karaage – japanilainen friteerattu kana",

        "menu.pizza":
            "Pizzapala",

        "menu.kimbap":
            "Kimbap – korealaiset merilevärullat",

        "menu.springrolls":
            "Vietnamilaiset rullat",

        "menu.fries":
            "Ranskalaiset",

        "menu.vegetables":
            "Kasvistikkuja – porkkana, kurkku & kukkakaali",

        "menu.dips":
            "Majodippejä, mm. gochujang",

        "menu.popcorn":
            "Popcorn 0,5 l",

        "menu.nachos":
            "Nachot + salsa",


        /* SWEETS */

        "menu.koreanIceCream":
            "Korealainen vaahtokarkkitikkujäätelö",

        "menu.iceCream":
            "Jäätelöannoksia",

        "menu.blueberryPie":
            "Mustikkapiirakka + vaniljakastike",

        "menu.caramelCake":
            "Kinuskikakku",

        "menu.sacherCake":
            "Sacherkakku",


        /* COMBOS */

        "menu.sodaSnack":
            "Virvoitusjuoma + snack",

        "menu.shotTray":
            "Shottilauta (6 shottia)",


        /* DRINKS */

        "menu.jaffa":
            "Jaffa appelsiini sokeriton 0,5 l",

        "menu.salmiakkiShot":
            "Salmiakkishotti 4 cl",

        "menu.coffee":
            "Kahvi",


        /* ABOUT US */

        "about.eyebrow":
            "Pala Soulia Helsingissä",

        "about.title":
            "Korealainen noraebang.<br>Teidän tavallanne.",

        "about.text":
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


    navigationLinks.forEach((link) => {

        link.classList.remove(
            "active",
            "current"
        );

    });


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
            ".room-selection-heading",
            ".room-card",
            ".pricing-heading",
            ".pricing-table-scroll",
            ".pricing-notes",
            ".info-heading",
            ".info-card",
            ".food-copy",
            ".menu-heading",
            ".menu-category",
            ".about-inner",
            ".cta-content"
        ].join(",")
    );


/*
    Add the base reveal class.
*/

revealElements.forEach((element) => {

    element.classList.add(
        "reveal-item"
    );

});


/*
    Stagger room cards.
*/

document
    .querySelectorAll(".room-card")
    .forEach((card, index) => {

        card.style.setProperty(
            "--reveal-delay",
            `${index * 110}ms`
        );

    });


/*
    Stagger Good to know cards.
*/

document
    .querySelectorAll(".info-card")
    .forEach((card, index) => {

        card.style.setProperty(
            "--reveal-delay",
            `${index * 100}ms`
        );

    });


/*
    Give menu categories a small stagger too.
*/

document
    .querySelectorAll(".menu-category")
    .forEach((category, index) => {

        category.style.setProperty(
            "--reveal-delay",
            `${(index % 3) * 90}ms`
        );

    });


/*
    Gold decorative lines.
*/

const revealLines =
    document.querySelectorAll(
        ".gold-line"
    );


revealLines.forEach((line) => {

    line.classList.add(
        "reveal-line"
    );

});


/*
    Reveal observer.
*/

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "revealed"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },

            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -45px 0px"
            }

        );


    revealElements.forEach((element) => {

        revealObserver.observe(
            element
        );

    });


    revealLines.forEach((line) => {

        revealObserver.observe(
            line
        );

    });

} else {

    /*
        Fallback for old browsers.
    */

    revealElements.forEach((element) => {

        element.classList.add(
            "revealed"
        );

    });


    revealLines.forEach((line) => {

        line.classList.add(
            "revealed"
        );

    });

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
