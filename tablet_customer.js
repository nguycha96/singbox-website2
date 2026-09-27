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


function renderProducts() {

    const menu =
        document.getElementById("tabletMenu");

    if (!menu) {
        return;
    }


    menu.replaceChildren();


    categories.forEach((category) => {

        const categoryProducts =
            products.filter(
                (product) =>
                    product.category === category.id
            );


        if (categoryProducts.length === 0) {
            return;
        }


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


            const button =
                document.createElement("button");

            button.className =
                "add-product";

            button.type =
                "button";

            button.textContent =
                "Lisää";


            card.appendChild(name);
            card.appendChild(price);
            card.appendChild(button);

            grid.appendChild(card);

        });


        section.appendChild(grid);
        menu.appendChild(section);

    });

}


loadProducts();
