/* =========================================================
   STAFF TABLET — DEVICE PAIRING
========================================================= */

const STAFF_SUPABASE_URL =
    "https://tikatiahzawstvrdqfix.supabase.co";

const STAFF_SUPABASE_KEY =
    "sb_publishable_ZfYe1fy7Dxu59HfTLSQ7Cw_EK0xGl34";


const staffSupabaseClient =
    supabase.createClient(
        STAFF_SUPABASE_URL,
        STAFF_SUPABASE_KEY
    );


const STAFF_DEVICE_STORAGE_KEY =
    "singbox-staff-device-uuid";


const staffApp =
    document.getElementById(
        "staffApp"
    );

const staffPairingScreen =
    document.getElementById(
        "staffPairingScreen"
    );

const staffPairingCode =
    document.getElementById(
        "staffPairingCode"
    );

const pairStaffDeviceButton =
    document.getElementById(
        "pairStaffDevice"
    );

const staffPairingMessage =
    document.getElementById(
        "staffPairingMessage"
    );


function showPairingScreen() {

    if (staffApp) {
        staffApp.hidden = true;
    }

    if (staffPairingScreen) {
        staffPairingScreen.hidden = false;
    }
}


function showStaffApp() {

    if (staffPairingScreen) {
        staffPairingScreen.hidden = true;
    }

    if (staffApp) {
        staffApp.hidden = false;
    }
}


async function validateStoredStaffDevice() {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    if (!deviceUuid) {

        showPairingScreen();
        return;
    }


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "validate_staff_device",
            {
                p_device_uuid:
                    deviceUuid
            }
        );


    if (
        error ||
        data !== true
    ) {

        localStorage.removeItem(
            STAFF_DEVICE_STORAGE_KEY
        );

        showPairingScreen();

        return;
    }


    showStaffApp();
}


async function pairStaffDevice() {

    const pairingCode =
        staffPairingCode
            ?.value
            .trim();


    if (!pairingCode) {

        staffPairingMessage.hidden =
            false;

        staffPairingMessage.textContent =
            "Syötä parituskoodi.";

        return;
    }


    pairStaffDeviceButton.disabled =
        true;


    staffPairingMessage.hidden =
        false;

    staffPairingMessage.textContent =
        "Yhdistetään...";


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "pair_staff_device",
            {
                p_pairing_code:
                    pairingCode
            }
        );


    if (
        error ||
        !data
    ) {

        pairStaffDeviceButton.disabled =
            false;

        staffPairingMessage.textContent =
            "Parituskoodi ei kelpaa tai se on jo käytetty.";

        return;
    }


    localStorage.setItem(
        STAFF_DEVICE_STORAGE_KEY,
        data
    );


    staffPairingMessage.textContent =
        "Tabletti yhdistetty.";


    staffPairingCode.value =
        "";


    setTimeout(
        () => {

            showStaffApp();

        },
        500
    );
}


pairStaffDeviceButton
    ?.addEventListener(
        "click",
        pairStaffDevice
    );


if (staffApp) {
    staffApp.hidden = true;
}


validateStoredStaffDevice();

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
   CLOCK
========================================================= */

function updateClock() {

    const clock =
        document.getElementById("staffClock");

    if (!clock) {
        return;
    }

    clock.textContent =
        new Intl.DateTimeFormat(
            "fi-FI",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        ).format(new Date());
}


updateClock();

setInterval(
    updateClock,
    30000
);

/* =========================================================
   VIEW SWITCH
========================================================= */

const staffViewButtons =
    document.querySelectorAll(
        ".staff-view-button"
    );


const roomsView =
    document.getElementById(
        "roomsView"
    );


const commonView =
    document.getElementById(
        "commonView"
    );


const staffViewTitle =
    document.getElementById(
        "staffViewTitle"
    );


const staffViewDescription =
    document.getElementById(
        "staffViewDescription"
    );


staffViewButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const view =
                button.dataset.view;


            staffViewButtons.forEach(
                (item) => {

                    item.classList.toggle(
                        "active",
                        item === button
                    );

                }
            );


            const showRooms =
                view === "rooms";


            roomsView.hidden =
                !showRooms;

            commonView.hidden =
                showRooms;


            if (showRooms) {

                staffViewTitle.textContent =
                    "Huoneet";

                staffViewDescription.textContent =
                    "Varaukset, tilaukset ja henkilökuntakutsut";

            } else {

                staffViewTitle.textContent =
                    "Yhteistila";

                staffViewDescription.textContent =
                    "Pöytätilaukset ja henkilökuntakutsut";
            }

        }
    );

});

/* =========================================================
   LOAD ROOMS
========================================================= */

async function loadRooms() {

    const roomsContainer =
        document.getElementById("staffRooms");

    if (!roomsContainer) {
        return;
    }


    roomsContainer.textContent =
        "Ladataan huoneita...";


    /* ROOMS */

    const {
        data: rooms,
        error: roomsError
    } =
        await supabaseClient
            .from("rooms")
            .select("id, name")
            .order(
                "id",
                {
                    ascending: true
                }
            );


    if (roomsError) {

        console.error(
            "Could not load rooms:",
            roomsError
        );

        roomsContainer.textContent =
            "Huoneiden lataus epäonnistui.";

        return;
    }


    /* BOOKINGS
       Huoneet piirretään silti, vaikka varausten haku epäonnistuisi.
    */

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    let bookings = [];


    if (deviceUuid) {

        const {
            data: bookingsData,
            error: bookingsError
        } =
            await supabaseClient.rpc(
                "staff_get_bookings",
                {
                    p_device_uuid:
                        deviceUuid
                }
            );


        if (bookingsError) {

            console.error(
                "Could not load bookings:",
                bookingsError
            );

        } else {

            bookings =
                bookingsData || [];
        }
    }

/* ROOM ORDERS */

let roomOrders = [];


if (deviceUuid) {

    const {
        data: roomOrdersData,
        error: roomOrdersError
    } =
        await supabaseClient.rpc(
            "staff_get_room_orders",
            {
                p_device_uuid:
                    deviceUuid
            }
        );


    if (roomOrdersError) {

        console.error(
            "Could not load room orders:",
            roomOrdersError
        );

    } else {

        roomOrders =
            roomOrdersData || [];
    }
}
   
    const now =
        new Date();


    roomsContainer.replaceChildren();


    /* =====================================================
       HELPERS
    ===================================================== */

    function bookingStartDate(
        booking
    ) {

        return new Date(
            `${booking.booking_date}T${booking.start_time}`
        );
    }


    function bookingEndDate(
        booking
    ) {

        const start =
            bookingStartDate(
                booking
            );

        const end =
            new Date(
                `${booking.booking_date}T${booking.end_time}`
            );


        /*
           Jos varaus jatkuu keskiyön yli,
           loppuaika kuuluu seuraavalle päivälle.
        */

        if (end <= start) {

            end.setDate(
                end.getDate() + 1
            );
        }


        return end;
    }


    function formatBookingDate(
        booking
    ) {

        return new Date(
            `${booking.booking_date}T00:00:00`
        ).toLocaleDateString(
            "fi-FI",
            {
                weekday: "short",
                day: "numeric",
                month: "numeric"
            }
        );
    }


    function createBookingSummary(
        booking,
        labelText
    ) {

        const block =
            document.createElement(
                "div"
            );

        block.className =
            "staff-booking-summary";


        if (labelText) {

            const label =
                document.createElement(
                    "div"
                );

            label.className =
                "staff-booking-label";

            label.textContent =
                labelText;


            block.appendChild(
                label
            );
        }


        const date =
            document.createElement(
                "div"
            );

        date.className =
            "staff-booking-date";

        date.textContent =
            formatBookingDate(
                booking
            );


        const time =
            document.createElement(
                "div"
            );

        time.className =
            "staff-booking-time";

        time.textContent =
            `${booking.start_time.slice(0, 5)}–${booking.end_time.slice(0, 5)}`;


        const customer =
            document.createElement(
                "div"
            );

        customer.className =
            "staff-booking-customer";

        customer.textContent =
            booking.customer_name ||
            "Ei nimeä";


        block.appendChild(
            date
        );

        block.appendChild(
            time
        );

        block.appendChild(
            customer
        );


        return block;
    }


    /* =====================================================
       ROOM CARDS
    ===================================================== */

    rooms.forEach(
        (room) => {

            const roomBookings =
                bookings
                    .filter(
                        booking =>
                            Number(
                                booking.room_id
                            ) ===
                            Number(
                                room.id
                            )
                    )
                    .sort(
                        (a, b) =>
                            bookingStartDate(a) -
                            bookingStartDate(b)
                    );


            /*
               Vanhat varaukset eivät täytä
               henkilökunnan näkymää.
            */

            const relevantBookings =
                roomBookings.filter(
                    booking =>
                        bookingEndDate(
                            booking
                        ) > now
                );


            const currentBooking =
                relevantBookings.find(
                    booking => {

                        const start =
                            bookingStartDate(
                                booking
                            );

                        const end =
                            bookingEndDate(
                                booking
                            );


                        return (
                            now >= start &&
                            now < end
                        );
                    }
                ) || null;


            const futureBookings =
                relevantBookings.filter(
                    booking =>
                        bookingStartDate(
                            booking
                        ) > now
                );


            const nextBooking =
                futureBookings[0] ||
                null;


            const hiddenBookings =
                futureBookings.slice(1);

           /* ORDERS FOR CURRENT CUSTOMER */

const currentRoomOrders =
    currentBooking
        ? roomOrders.filter(
            (order) =>
                Number(order.room_id) ===
                    Number(room.id) &&
                Number(order.booking_id) ===
                    Number(currentBooking.booking_id)
        )
        : [];


/* Combine same products */

const aggregatedRoomOrders =
    [];


currentRoomOrders.forEach(
    (order) => {

        const key =
            `${order.product_id}-${order.unit_price}`;


        const existing =
            aggregatedRoomOrders.find(
                (item) =>
                    item.key === key
            );


        if (existing) {

            existing.quantity +=
                Number(order.quantity);

        } else {

            aggregatedRoomOrders.push({
                key: key,

                productName:
                    order.product_name,

                quantity:
                    Number(order.quantity),

                unitPrice:
                    Number(order.unit_price)
            });
        }
    }
);


const roomOrderTotal =
    aggregatedRoomOrders.reduce(
        (sum, item) =>
            sum +
            (
                item.quantity *
                item.unitPrice
            ),
        0
    );

            /* CARD */

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "staff-room-card";


            /* HEADER */

            const header =
                document.createElement(
                    "div"
                );

            header.className =
                "room-card-header";


            const name =
                document.createElement(
                    "h2"
                );

            name.textContent =
                room.name;


            const status =
                document.createElement(
                    "span"
                );

            status.className =
                "room-status";


            if (
                relevantBookings.length ===
                0
            ) {

                status.textContent =
                    "Ei tulevia varauksia";

            } else if (
                relevantBookings.length ===
                1
            ) {

                status.textContent =
                    "1 varaus";

            } else {

                status.textContent =
                    `${relevantBookings.length} varausta`;
            }


            header.appendChild(
                name
            );

            header.appendChild(
                status
            );


            /* BODY */

            const body =
                document.createElement(
                    "div"
                );

            body.className =
                "staff-room-body";


            /* ================================
               LEFT — BOOKINGS
            ================================ */

            const bookingColumn =
                document.createElement(
                    "div"
                );

            bookingColumn.className =
                "staff-room-bookings";


            if (currentBooking) {

                bookingColumn.appendChild(
                    createBookingSummary(
                        currentBooking,
                        "NYT"
                    )
                );

            } else {

                const free =
                    document.createElement(
                        "div"
                    );

                free.className =
                    "staff-room-free";

                free.textContent =
                    "Huone vapaa";


                bookingColumn.appendChild(
                    free
                );
            }


            if (nextBooking) {

                bookingColumn.appendChild(
                    createBookingSummary(
                        nextBooking,
                        "SEURAAVA"
                    )
                );
            }


            if (
                hiddenBookings.length >
                0
            ) {

                const details =
                    document.createElement(
                        "details"
                    );

                details.className =
                    "staff-more-bookings";


                const summary =
                    document.createElement(
                        "summary"
                    );

                summary.textContent =
                    `Muut varaukset (${hiddenBookings.length})`;


                details.appendChild(
                    summary
                );


                hiddenBookings.forEach(
                    booking => {

                        const block =
                            createBookingSummary(
                                booking,
                                ""
                            );

                        block.classList.add(
                            "compact"
                        );


                        details.appendChild(
                            block
                        );
                    }
                );


                bookingColumn.appendChild(
                    details
                );
            }


/* ================================
   RIGHT — ROOM ORDERS
================================ */

const ordersColumn =
    document.createElement(
        "div"
    );

ordersColumn.className =
    "staff-room-orders";


const ordersHeading =
    document.createElement(
        "div"
    );

ordersHeading.className =
    "staff-room-orders-heading";

ordersHeading.textContent =
    "HUONETILAUKSET";


ordersColumn.appendChild(
    ordersHeading
);


/* NO ACTIVE CUSTOMER */

if (!currentBooking) {

    const message =
        document.createElement(
            "div"
        );

    message.className =
        "staff-no-orders";

    message.textContent =
        "Ei aktiivista asiakasta";


    ordersColumn.appendChild(
        message
    );


/* ACTIVE CUSTOMER, NO ORDERS */

} else if (
    aggregatedRoomOrders.length === 0
) {

    const message =
        document.createElement(
            "div"
        );

    message.className =
        "staff-no-orders";

    message.textContent =
        "Ei avoimia tilauksia";


    ordersColumn.appendChild(
        message
    );


/* ACTIVE CUSTOMER + ORDERS */

} else {

    const orderList =
        document.createElement(
            "div"
        );

    orderList.className =
        "staff-room-order-list";


    aggregatedRoomOrders.forEach(
        (item) => {

            const row =
                document.createElement(
                    "div"
                );

            row.className =
                "staff-room-order-row";


            const product =
                document.createElement(
                    "span"
                );

            product.textContent =
                `${item.quantity} × ${item.productName}`;


            const price =
                document.createElement(
                    "strong"
                );

            price.textContent =
                `${(
                    item.quantity *
                    item.unitPrice
                ).toFixed(2)} €`;


            row.appendChild(
                product
            );

            row.appendChild(
                price
            );


            orderList.appendChild(
                row
            );
        }
    );


    const total =
        document.createElement(
            "div"
        );

    total.className =
        "staff-room-order-total";


    const totalLabel =
        document.createElement(
            "span"
        );

    totalLabel.textContent =
        "Yhteensä";


    const totalPrice =
        document.createElement(
            "strong"
        );

    totalPrice.textContent =
        `${roomOrderTotal.toFixed(2)} €`;


    total.appendChild(
        totalLabel
    );

    total.appendChild(
        totalPrice
    );


    orderList.appendChild(
        total
    );

    ordersColumn.appendChild(
        orderList
    );
}


            /* BUILD */

            body.appendChild(
                bookingColumn
            );

            body.appendChild(
                ordersColumn
            );


            card.appendChild(
                header
            );

            card.appendChild(
                body
            );


            roomsContainer.appendChild(
                card
            );
        }
    );
}


/* =========================================================
   START
========================================================= */

loadRooms();

/* =========================================================
   STOCK MOVEMENTS
========================================================= */

const stockProduct =
    document.getElementById(
        "stockProduct"
    );

const stockMovementType =
    document.getElementById(
        "stockMovementType"
    );

const stockQuantity =
    document.getElementById(
        "stockQuantity"
    );

const stockNote =
    document.getElementById(
        "stockNote"
    );

const saveStockMovementButton =
    document.getElementById(
        "saveStockMovement"
    );

const stockMessage =
    document.getElementById(
        "stockMessage"
    );


/* =========================================================
   LOAD PRODUCTS
========================================================= */

async function loadStockProducts() {

    if (!stockProduct) {
        return;
    }


    const {
        data,
        error
    } =
        await staffSupabaseClient
            .from(
                "customer_products"
            )
            .select(
                "id, name_fi, category, available"
            )
            .order(
                "name_fi",
                {
                    ascending: true
                }
            );


    if (error) {

        console.error(
            "Could not load stock products:",
            error
        );

        return;
    }


    stockProduct.innerHTML = `
        <option value="">
            Valitse tuote
        </option>
    `;


    (data || []).forEach(
        (product) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                product.id;


            option.textContent =
                product.available
                    ? product.name_fi
                    : `${product.name_fi} (ei myynnissä)`;


            stockProduct.appendChild(
                option
            );

        }
    );
}


/* =========================================================
   SAVE STOCK MOVEMENT
========================================================= */

async function saveStockMovement() {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    if (!deviceUuid) {

        showPairingScreen();
        return;
    }


    const productId =
        Number(
            stockProduct.value
        );


    const quantity =
        Number(
            stockQuantity.value
        );


    const movementType =
        stockMovementType.value;


    const note =
        stockNote.value.trim();


    if (!productId) {

        stockMessage.hidden =
            false;

        stockMessage.textContent =
            "Valitse tuote.";

        return;
    }


    if (
        !Number.isInteger(quantity) ||
        quantity < 1
    ) {

        stockMessage.hidden =
            false;

        stockMessage.textContent =
            "Määrän täytyy olla vähintään 1.";

        return;
    }


    saveStockMovementButton.disabled =
        true;


    stockMessage.hidden =
        false;

    stockMessage.textContent =
        "Tallennetaan...";


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_log_stock_movement",
            {
                p_device_uuid:
                    deviceUuid,

                p_product_id:
                    productId,

                p_quantity:
                    quantity,

                p_movement_type:
                    movementType,

                p_note:
                    note || null
            }
        );


    saveStockMovementButton.disabled =
        false;


    if (error) {

        console.error(
            "Could not save stock movement:",
            error
        );


        if (
            error.message
                ?.toLowerCase()
                .includes(
                    "unauthorized staff device"
                )
        ) {

            localStorage.removeItem(
                STAFF_DEVICE_STORAGE_KEY
            );

            showPairingScreen();

            return;
        }


        stockMessage.textContent =
            "Tallennus epäonnistui.";

        return;
    }


    stockMessage.textContent =
        "Poistuma kirjattu ✓";


    stockProduct.value =
        "";

    stockMovementType.value =
        "waste";

    stockQuantity.value =
        "1";

    stockNote.value =
        "";


    setTimeout(
        () => {

            stockMessage.hidden =
                true;

        },
        3000
    );
}


saveStockMovementButton
    ?.addEventListener(
        "click",
        saveStockMovement
    );


loadStockProducts();


/* =========================================================
   STAFF — SERVICE CALLS
========================================================= */

let serviceCallPanel = null;


function createServiceCallPanel() {

    if (serviceCallPanel) {
        return;
    }


    serviceCallPanel =
        document.createElement(
            "section"
        );


    serviceCallPanel.id =
        "serviceCallPanel";

    serviceCallPanel.className =
        "service-call-panel";

    serviceCallPanel.hidden =
        true;


    const staffIntro =
        document.querySelector(
            ".staff-intro"
        );


    if (staffIntro) {

        staffIntro.insertAdjacentElement(
            "afterend",
            serviceCallPanel
        );

    } else if (staffApp) {

        staffApp.prepend(
            serviceCallPanel
        );
    }
}


/* =========================================================
   LOAD OPEN SERVICE CALLS
========================================================= */

async function loadServiceCalls() {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    if (!deviceUuid) {
        return;
    }


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_get_service_calls",
            {
                p_device_uuid:
                    deviceUuid
            }
        );


    if (error) {

        console.error(
            "Could not load service calls:",
            error
        );


        if (
            error.message
                ?.toLowerCase()
                .includes(
                    "unauthorized staff device"
                )
        ) {

            localStorage.removeItem(
                STAFF_DEVICE_STORAGE_KEY
            );

            showPairingScreen();
        }


        return;
    }


    renderServiceCalls(
        data || []
    );
}


/* =========================================================
   RENDER CALLS
========================================================= */

function renderServiceCalls(calls) {

    createServiceCallPanel();


    if (!serviceCallPanel) {
        return;
    }


    serviceCallPanel.replaceChildren();


    if (calls.length === 0) {

        serviceCallPanel.hidden =
            true;

        return;
    }


    serviceCallPanel.hidden =
        false;


    calls.forEach(
        (call) => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "service-call-card";


            const info =
                document.createElement(
                    "div"
                );


            info.className =
                "service-call-info";


            const label =
                document.createElement(
                    "div"
                );


            label.className =
                "service-call-label";

            label.textContent =
                "HENKILÖKUNTAKUTSU";


            const title =
                document.createElement(
                    "strong"
                );


            title.className =
                "service-call-title";

            title.textContent =
                call.room_name;


            const time =
                document.createElement(
                    "span"
                );


            time.className =
                "service-call-time";


            time.textContent =
                new Date(
                    call.created_at
                ).toLocaleTimeString(
                    "fi-FI",
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";

            button.className =
                "resolve-service-call";

            button.textContent =
                "KUITTAA HOIDETUKSI";


            button.addEventListener(
                "click",
                async () => {

                    button.disabled =
                        true;

                    button.textContent =
                        "Kuitataan...";


                    const success =
                        await resolveServiceCall(
                            call.call_id
                        );


                    if (!success) {

                        button.disabled =
                            false;

                        button.textContent =
                            "YRITÄ UUDELLEEN";
                    }

                }
            );


            info.appendChild(
                label
            );

            info.appendChild(
                title
            );

            info.appendChild(
                time
            );


            card.appendChild(
                info
            );

            card.appendChild(
                button
            );


            serviceCallPanel.appendChild(
                card
            );

        }
    );
}


/* =========================================================
   RESOLVE CALL
========================================================= */

async function resolveServiceCall(
    callId
) {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    if (!deviceUuid) {
        return false;
    }


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_resolve_service_call",
            {
                p_device_uuid:
                    deviceUuid,

                p_call_id:
                    callId
            }
        );


    if (
        error ||
        data !== true
    ) {

        console.error(
            "Could not resolve service call:",
            error
        );

        return false;
    }


    await loadServiceCalls();

    return true;
}


/* =========================================================
   SERVICE CALL POLLING
========================================================= */

createServiceCallPanel();

loadServiceCalls();


setInterval(
    loadServiceCalls,
    3000
);
