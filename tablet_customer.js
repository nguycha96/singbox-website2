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


let activeCategory = "snacks";


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
        button.textContent = category.name;


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
        category.name;

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
            product.name_fi;


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
   START
========================================================= */

loadProducts();
