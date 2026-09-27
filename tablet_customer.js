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
let cart = [];


const categories = [
    {
        id: "snacks",
        fi: "Naposteltavat",
        en: "Snacks"
    },
    {
        id: "sweets",
        fi: "Makeat",
        en: "Sweets"
    },
    {
        id: "combos",
        fi: "Combot",
        en: "Combos"
    },
    {
        id: "non_alcoholic",
        fi: "Alkoholittomat",
        en: "Non-alcoholic"
    },
    {
        id: "alcohol",
        fi: "Alkoholijuomat",
        en: "Alcohol"
    },
    {
        id: "hot_drinks",
        fi: "Kuumat juomat",
        en: "Hot drinks"
    }
];


let currentLanguage = "fi";


let activeCategory = "snacks";


/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadProducts() {

    const { data, error } = await supabaseClient
        .from("products")
.select(
    "id, category, price, name_fi, name_en, available, sort_order"
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

function renderProducts(
    categoryId = activeCategory
) {

    activeCategory = categoryId;


    const menu =
        document.getElementById("tabletMenu");

    if (!menu) {
        return;
    }


    menu.replaceChildren();


    /* CATEGORY NAVIGATION */

    const navigation =
        document.createElement("nav");

    navigation.className =
        "category-navigation";


    categories.forEach((category) => {

        const button =
            document.createElement("button");

        button.type = "button";
        button.className = "category-button";
        button.textContent = category[currentLanguage];


        if (category.id === activeCategory) {
            button.classList.add("active");
        }


        button.addEventListener(
            "click",
            () => {
                renderProducts(category.id);
            }
        );


        navigation.appendChild(button);

    });


    menu.appendChild(navigation);


    /* ACTIVE CATEGORY */

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
    category[currentLanguage];

    section.appendChild(heading);


    const grid =
        document.createElement("div");

    grid.className =
        "product-grid";


    categoryProducts.forEach((product) => {

        const card =
            document.createElement("article");

        card.className =
            "product-card";


        const name =
            document.createElement("h3");

        name.textContent =
    currentLanguage === "fi"
        ? product.name_fi
        : product.name_en;


        const price =
            document.createElement("div");

        price.className =
            "product-price";

        price.textContent =
            `${Number(product.price).toFixed(2)} €`;


        card.appendChild(name);
        card.appendChild(price);


        /* PRODUCT'S OWN CART CONTROL */

        const cartItem =
            cart.find(
                (item) =>
                    item.product.id === product.id
            );


        if (!cartItem) {

            const addButton =
                document.createElement("button");

            addButton.type = "button";
            addButton.className = "add-product";
            addButton.textContent = "Lisää";


            addButton.addEventListener(
                "click",
                () => {
                    addToCart(product);
                }
            );


            card.appendChild(addButton);

        } else {

            const controls =
                document.createElement("div");

            controls.className =
                "quantity-controls";


            const minus =
                document.createElement("button");

            minus.type = "button";
            minus.className = "quantity-button";
            minus.textContent = "−";


            const quantity =
                document.createElement("span");

            quantity.className =
                "selected-quantity";

            quantity.textContent =
                `${cartItem.quantity} valittu`;


            const plus =
                document.createElement("button");

            plus.type = "button";
            plus.className = "quantity-button";
            plus.textContent = "+";


            minus.addEventListener(
                "click",
                () => {
                    removeFromCart(product);
                }
            );


            plus.addEventListener(
                "click",
                () => {
                    addToCart(product);
                }
            );


            controls.appendChild(minus);
            controls.appendChild(quantity);
            controls.appendChild(plus);

            card.appendChild(controls);

        }


        grid.appendChild(card);

    });


    section.appendChild(grid);
    menu.appendChild(section);

}


/* =========================================================
   CART
========================================================= */

function addToCart(product) {

    const existingItem =
        cart.find(
            (item) =>
                item.product.id === product.id
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            product: product,
            quantity: 1
        });

    }


    updateCartCount();
    renderProducts();
    renderCart();
}


function removeFromCart(product) {

    const existingItem =
        cart.find(
            (item) =>
                item.product.id === product.id
        );


    if (!existingItem) {
        return;
    }


    existingItem.quantity -= 1;


    if (existingItem.quantity <= 0) {

        cart =
            cart.filter(
                (item) =>
                    item.product.id !== product.id
            );

    }


    updateCartCount();
    renderProducts();
    renderCart();
}


function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    const totalQuantity =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    cartCount.textContent =
        totalQuantity;
}

/* =========================================================
   CART PANEL
========================================================= */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (!overlay) {
        return;
    }

    renderCart();

    overlay.hidden = false;
}


function closeCart() {

    const overlay =
        document.getElementById("cartOverlay");

    if (!overlay) {
        return;
    }

    overlay.hidden = true;
}


function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    if (!cartItems || !cartTotal) {
        return;
    }


    cartItems.replaceChildren();


    if (cart.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.className =
            "cart-empty";

        emptyMessage.textContent =
            "Ostoskori on tyhjä.";

        cartItems.appendChild(
            emptyMessage
        );

    } else {

        cart.forEach((item) => {

            const row =
                document.createElement("div");

            row.className =
                "cart-item";


            const info =
                document.createElement("div");

            info.className =
                "cart-item-info";


            const name =
                document.createElement("strong");

            name.textContent =
                item.product.name_fi;


            const details =
                document.createElement("span");

            const rowTotal =
                Number(item.product.price) *
                item.quantity;

            details.textContent =
                `${item.quantity} × ${Number(item.product.price).toFixed(2)} €`;


            info.appendChild(name);
            info.appendChild(details);


            const price =
                document.createElement("strong");

            price.className =
                "cart-item-price";

            price.textContent =
                `${rowTotal.toFixed(2)} €`;


            row.appendChild(info);
            row.appendChild(price);

            cartItems.appendChild(row);

        });

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                (
                    Number(item.product.price) *
                    item.quantity
                ),
            0
        );


    cartTotal.textContent =
        `${total.toFixed(2)} €`;
}


/* =========================================================
   CART EVENTS
========================================================= */

const cartButton =
    document.getElementById("cartButton");

const cartClose =
    document.getElementById("cartClose");


if (cartButton) {

    cartButton.addEventListener(
        "click",
        openCart
    );

}


if (cartClose) {

    cartClose.addEventListener(
        "click",
        closeCart
    );

}

/* =========================================================
   LANGUAGE SWITCHER
========================================================= */

const languageFi =
    document.getElementById("languageFi");

const languageEn =
    document.getElementById("languageEn");


function setLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
        currentLanguage;


    languageFi.classList.toggle(
        "active",
        currentLanguage === "fi"
    );

    languageEn.classList.toggle(
        "active",
        currentLanguage === "en"
    );


    renderProducts();
    renderCart();
}


languageFi.addEventListener(
    "click",
    () => setLanguage("fi")
);


languageEn.addEventListener(
    "click",
    () => setLanguage("en")
);


/* =========================================================
   START
========================================================= */

loadProducts();
