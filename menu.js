/* =========================================================
   SUPABASE
========================================================= */

const SUPABASE_URL =
    "https://tikatiahzawstvrdqfix.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_ZfYe1fy7Dxu59HfTLSQ7Cw_EK0xGl34";

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage = "fi";


const translations = {

    fi: {

        "nav.home": "Etusivu",
        "nav.rooms": "Huoneet",
        "nav.food": "Ruoka & juomat",
        "nav.about": "Meistä",
        "nav.contact": "Yhteystiedot",

        "common.bookNow": "Varaa nyt",

        "menu.eyebrow":
            "Jotain pöytään",

        "menu.title":
            "Menu",

        "menu.text":
            "Ruokaa, juomia ja jotain makeaa.",

        snacks:
            "Naposteltavat",

        sweets:
            "Makeat",

        combos:
            "Combot",

        non_alcoholic:
            "Alkoholittomat",

        alcohol:
            "Alkoholijuomat",

        hot_drinks:
            "Kuumat juomat"
    },


    en: {

        "nav.home": "Home",
        "nav.rooms": "Rooms",
        "nav.food": "Food & Drinks",
        "nav.about": "About Us",
        "nav.contact": "Contact",

        "common.bookNow": "Book now",

        "menu.eyebrow":
            "Something for the table",

        "menu.title":
            "Menu",

        "menu.text":
            "Food, drinks and something sweet.",

        snacks:
            "Snacks",

        sweets:
            "Sweets",

        combos:
            "Combos",

        non_alcoholic:
            "Non-alcoholic",

        alcohol:
            "Alcohol",

        hot_drinks:
            "Hot drinks"
    }
};


function getInitialLanguage() {

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

        /* Continue */
    }


    const browserLanguage =
        (
            navigator.language ||
            ""
        ).toLowerCase();


    return browserLanguage.startsWith("fi")
        ? "fi"
        : "en";
}


function setLanguage(language) {

    if (!translations[language]) {
        return;
    }


    currentLanguage =
        language;


    document.documentElement.lang =
        language;


    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach((element) => {

            const key =
                element.dataset.i18n;

            const translation =
                translations[language][key];


            if (
                translation !== undefined
            ) {

                element.textContent =
                    translation;
            }

        });


    document
        .querySelectorAll(
            ".lang-btn"
        )
        .forEach((button) => {

            const active =
                button.dataset.lang ===
                language;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-pressed",
                active
                    ? "true"
                    : "false"
            );

        });


    try {

        localStorage.setItem(
            "singbox-language",
            language
        );

    } catch (error) {

        /* Continue */
    }


    renderProducts();
    renderOffers();
}



/* =========================================================
   LANGUAGE BUTTONS
========================================================= */

document
    .querySelectorAll(
        ".lang-btn"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                setLanguage(
                    button.dataset.lang
                );

            }
        );

    });



/* =========================================================
   MOBILE MENU
========================================================= */

const header =
    document.querySelector(
        ".site-header"
    );

const menuToggle =
    document.querySelector(
        ".menu-toggle"
    );


if (
    header &&
    menuToggle
) {

    menuToggle.addEventListener(
        "click",
        () => {

            const open =
                header.classList.toggle(
                    "menu-open"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                open
                    ? "true"
                    : "false"
            );

        }
    );
}



/* =========================================================
   PRODUCTS
========================================================= */

let products = [];


const categoryOrder = [

    "snacks",
    "sweets",
    "combos",
    "non_alcoholic",
    "alcohol",
    "hot_drinks"

];


async function loadProducts() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("products")
            .select(
                "id, category, price, name_fi, name_en, available, sort_order"
            )
            .eq(
                "available",
                true
            )
            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Could not load products:",
            error
        );

        return;
    }


    products =
        data || [];


    renderProducts();
}


function formatPrice(price) {

    if (
        price === null ||
        price === undefined
    ) {

        return "—";
    }


    return (
        new Intl.NumberFormat(
            currentLanguage === "fi"
                ? "fi-FI"
                : "en-GB",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ).format(
            Number(price)
        ) +
        " €"
    );
}


function renderProducts() {

    const menuGrid =
        document.getElementById(
            "menuGrid"
        );


    if (!menuGrid) {
        return;
    }


    menuGrid.replaceChildren();


    categoryOrder.forEach(
        (categoryId) => {

            const categoryProducts =
                products.filter(
                    (product) =>
                        product.category ===
                        categoryId
                );


            /*
                Empty categories don't show.
            */

            if (
                categoryProducts.length === 0
            ) {

                return;
            }


            const category =
                document.createElement(
                    "section"
                );

            category.className =
                "menu-category";


            const heading =
                document.createElement(
                    "h3"
                );

            heading.textContent =
                translations[
                    currentLanguage
                ][categoryId] ||
                categoryId;


            category.appendChild(
                heading
            );


            categoryProducts.forEach(
                (product) => {

                    const row =
                        document.createElement(
                            "div"
                        );

                    row.className =
                        "menu-item";


                    const name =
                        document.createElement(
                            "span"
                        );


                    name.textContent =
                        currentLanguage ===
                        "fi"
                            ? product.name_fi
                            : (
                                product.name_en ||
                                product.name_fi
                            );


                    const price =
                        document.createElement(
                            "strong"
                        );

                    price.textContent =
                        formatPrice(
                            product.price
                        );


                    row.appendChild(
                        name
                    );

                    row.appendChild(
                        price
                    );


                    category.appendChild(
                        row
                    );

                }
            );


            menuGrid.appendChild(
                category
            );

        }
    );

}



/* =========================================================
   OFFERS
========================================================= */

let offers = [];
let offerItems = [];


async function loadOffers() {

    const offersArea =
        document.getElementById(
            "offersArea"
        );


    if (!offersArea) {
        return;
    }


    const {
        data: offersData,
        error: offersError
    } =
        await supabaseClient
            .from("offers")
            .select(
                "id, title_fi, title_en, description_fi, description_en, starts_at, ends_at, active, sort_order"
            )
            .eq(
                "active",
                true
            )
            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


    if (offersError) {

        console.error(
            "Could not load offers:",
            offersError
        );

        offersArea.hidden = true;

        return;
    }


    offers =
        offersData || [];


    if (
        offers.length === 0
    ) {

        offersArea.hidden = true;

        return;
    }


    const offerIds =
        offers.map(
            offer => offer.id
        );


    const {
        data: itemsData,
        error: itemsError
    } =
        await supabaseClient
            .from("offer_items")
            .select(
                "id, offer_id, name_fi, name_en, price, active, sort_order"
            )
            .in(
                "offer_id",
                offerIds
            )
            .eq(
                "active",
                true
            )
            .order(
                "sort_order",
                {
                    ascending: true
                }
            );


    if (itemsError) {

        console.error(
            "Could not load offer items:",
            itemsError
        );

        offersArea.hidden = true;

        return;
    }


    offerItems =
        itemsData || [];


    renderOffers();
}


function formatOfferTime(time) {

    if (!time) {
        return "";
    }


    return time.slice(
        0,
        5
    );
}


function renderOffers() {

    const offersArea =
        document.getElementById(
            "offersArea"
        );


    if (!offersArea) {
        return;
    }


    offersArea.replaceChildren();


    offers.forEach((offer) => {

        const items =
            offerItems.filter(
                (item) =>
                    item.offer_id ===
                    offer.id
            );


        if (
            items.length === 0
        ) {

            return;
        }


        const card =
            document.createElement(
                "article"
            );

        card.className =
            "offer-card";


        const title =
            document.createElement(
                "h2"
            );

        title.className =
            "offer-title";


        const titleText =
            currentLanguage === "fi"
                ? offer.title_fi
                : (
                    offer.title_en ||
                    offer.title_fi
                );


        const startTime =
            formatOfferTime(
                offer.starts_at
            );

        const endTime =
            formatOfferTime(
                offer.ends_at
            );


        title.textContent =
            startTime && endTime
                ? `${titleText} · ${startTime}–${endTime}`
                : titleText;


        card.appendChild(
            title
        );


        const descriptionText =
            currentLanguage === "fi"
                ? offer.description_fi
                : offer.description_en;


        if (descriptionText) {

            const description =
                document.createElement(
                    "p"
                );

            description.className =
                "offer-description";

            description.textContent =
                descriptionText;


            card.appendChild(
                description
            );
        }


        const itemsContainer =
            document.createElement(
                "div"
            );

        itemsContainer.className =
            "offer-items";


        items.forEach((item) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "offer-item";


            const name =
                document.createElement(
                    "span"
                );

            name.textContent =
                currentLanguage === "fi"
                    ? item.name_fi
                    : (
                        item.name_en ||
                        item.name_fi
                    );


            const price =
                document.createElement(
                    "strong"
                );

            price.textContent =
                formatPrice(
                    item.price
                );


            row.appendChild(
                name
            );

            row.appendChild(
                price
            );


            itemsContainer.appendChild(
                row
            );

        });


        card.appendChild(
            itemsContainer
        );


        offersArea.appendChild(
            card
        );

    });


    offersArea.hidden =
        offersArea.children.length === 0;
}



/* =========================================================
   START
========================================================= */

async function initializeMenu() {

    currentLanguage =
        getInitialLanguage();


    setLanguage(
        currentLanguage
    );


    await Promise.all([
        loadProducts(),
        loadOffers()
    ]);
}


initializeMenu();
