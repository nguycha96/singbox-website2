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
   CUSTOMER TABLET — PRODUCTS
========================================================= */

let products = [];


const categories = [
    {
        id: "snacks",
        name: "Naposteltavat"
    },
    {
        id: "sweets",
        name: "Makeat"
    },
    {
        id: "combos",
        name: "Combot"
    },
    {
        id: "non_alcoholic",
        name: "Alkoholittomat"
    },
    {
        id: "alcohol",
        name: "Alkoholijuomat"
    },
    {
        id: "hot_drinks",
        name: "Kuumat juomat"
    }
];


/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadProducts() {

    const { data, error } = await supabaseClient
        .from("products")
        .select(
            "id, category, price, name_fi, available, sort_order"
        )
        .eq("available", true)
        .order("sort_order", {
            ascending: true
        });


    if (error) {

        console.error(
            "Could not load products:",
            error
        );

        return;
    }


    products = data;

    renderProducts();
}


/* =========================================================
   RENDER PRODUCTS
========================================================= */

function renderProducts(activeCategory = "snacks") {

    const menu =
        document.getElementById("tabletMenu");

    if (!menu) {
        return;
    }


    menu.replaceChildren();


    /* =====================================================
       CATEGORY NAVIGATION
    ===================================================== */

    const navigation =
        document.createElement("nav");

    navigation.className =
        "category-navigation";


    categories.forEach((category) => {

        const button =
            document.createElement("button");

        button.type =
            "button";

        button.className =
            "category-button";

        button.textContent =
            category.name;


        if (category.id === activeCategory) {

            button.classList.add(
                "active"
            );

        }


        button.addEventListener(
            "click",
            () => {

                renderProducts(
                    category.id
                );

            }
        );


        navigation.appendChild(
            button
        );

    });


    menu.appendChild(
        navigation
    );


    /* =====================================================
       ACTIVE CATEGORY
    ===================================================== */

    const category =
        categories.find(
            (item) =>
                item.id === activeCategory
        );


    if (!category) {
        return;
    }


    const categoryProducts =
        products.filter(
            (product) =>
                product.category === category.id
        );


    const section =
        document.createElement("section");

    section.className =
        "product-category";


    const heading =
        document.createElement("h2");

    heading.textContent =
        category.name;


    section.appendChild(
        heading
    );


    /* =====================================================
       PRODUCT GRID
    ===================================================== */

    const grid =
        document.createElement("div");

    grid.className =
        "product-grid";


    categoryProducts.forEach(
        (product) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "product-card";


            /* PRODUCT NAME */

            const name =
                document.createElement(
                    "h3"
                );

            name.textContent =
                product.name_fi;


            /* PRICE */

            const price =
                document.createElement(
                    "div"
                );

            price.className =
                "product-price";

            price.textContent =
                `${Number(product.price).toFixed(2)} €`;


            /* ADD BUTTON */

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "add-product";

            button.type =
                "button";

            button.textContent =
                "Lisää";


            card.appendChild(
                name
            );

            card.appendChild(
                price
            );

            card.appendChild(
                button
            );


            grid.appendChild(
                card
            );

        }
    );


    section.appendChild(
        grid
    );

    menu.appendChild(
        section
    );

}


/* =========================================================
   START
========================================================= */

loadProducts();
