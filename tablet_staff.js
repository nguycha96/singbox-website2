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


    const { data, error } =
        await supabaseClient
            .from("rooms")
            .select("id, name")
            .order("id", {
                ascending: true
            });


    if (error) {

        console.error(
            "Could not load rooms:",
            error
        );

        return;
    }


    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    const {
    data: bookingsData,
    error: bookingsError
} =
    await supabaseClient
        .rpc(
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
}


const bookings =
    bookingsError
        ? []
        : (bookingsData || []);

    roomsContainer.replaceChildren();


    data.forEach((room) => {

        const card =
            document.createElement("article");

        card.className =
            "staff-room-card";


        const header =
            document.createElement("div");

        header.className =
            "room-card-header";


        const name =
            document.createElement("h2");

        name.textContent =
            room.name;


        const roomBookings =
            bookings.filter(
                (booking) =>
                    booking.room_id === room.id
            );


        const status =
            document.createElement("span");

        status.className =
            "room-status";

        status.textContent =
            roomBookings.length === 1
                ? "1 varaus"
                : roomBookings.length > 1
                    ? `${roomBookings.length} varausta`
                    : "Ei varauksia";


        header.appendChild(name);
        header.appendChild(status);


        const content =
            document.createElement("div");

        content.className =
            "room-card-content";


        if (roomBookings.length === 0) {

            content.textContent =
                "Ei varauksia.";

        } else {

            roomBookings.forEach((booking) => {

                const bookingBlock =
                    document.createElement("div");

                bookingBlock.className =
                    "staff-booking";


                const date =
                    document.createElement("div");

                date.className =
                    "staff-booking-date";

                date.textContent =
                    new Date(
                        `${booking.booking_date}T00:00:00`
                    ).toLocaleDateString(
                        "fi-FI",
                        {
                            weekday: "long",
                            day: "numeric",
                            month: "numeric"
                        }
                    );


                const time =
                    document.createElement("div");

                time.className =
                    "staff-booking-time";

                time.textContent =
                    `${booking.start_time.slice(0, 5)}–${booking.end_time.slice(0, 5)}`;


                const customer =
                    document.createElement("div");

                customer.className =
                    "staff-booking-customer";

                customer.textContent =
                    `Varaaja: ${booking.customer_name}`;


                bookingBlock.appendChild(date);
                bookingBlock.appendChild(time);
                bookingBlock.appendChild(customer);

                content.appendChild(
                    bookingBlock
                );
            });
        }


        card.appendChild(header);
        card.appendChild(content);

        roomsContainer.appendChild(card);
    });
}


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

        return new Date(
            `${booking.booking_date}T${booking.end_time}`
        );
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


        const label =
            document.createElement(
                "div"
            );

        label.className =
            "staff-booking-label";

        label.textContent =
            labelText;


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
            label
        );

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
                (bookings || [])
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
               Past bookings do not need
               to fill the staff screen.
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
                );


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
                futureBookings.filter(
                    booking =>
                        booking !==
                        nextBooking
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


            if (
                nextBooking &&
                nextBooking !==
                    currentBooking
            ) {

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
               Kytketään Supabaseen seuraavaksi.
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


            const noOrders =
                document.createElement(
                    "div"
                );

            noOrders.className =
                "staff-no-orders";

            noOrders.textContent =
                currentBooking
                    ? "Ei avoimia tilauksia"
                    : "Ei aktiivista asiakasta";


            ordersColumn.appendChild(
                ordersHeading
            );

            ordersColumn.appendChild(
                noOrders
            );


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
