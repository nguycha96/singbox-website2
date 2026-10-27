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
   ORDER ITEM ACTIONS
========================================================= */

async function deliverOrderItem(
    orderItemId,
    quantity
) {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_deliver_order_item",
            {
                p_device_uuid:
                    deviceUuid,

                p_order_item_id:
                    Number(orderItemId),

                p_quantity:
                    Number(quantity)
            }
        );


    if (
        error ||
        data !== true
    ) {

        console.error(
            "Could not deliver order item:",
            error
        );

        return false;
    }


    await loadRooms(true);

    return true;
}


async function cancelOrderItem(
    orderItemId,
    quantity
) {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_cancel_order_item",
            {
                p_device_uuid:
                    deviceUuid,

                p_order_item_id:
                    Number(orderItemId),

                p_quantity:
                    Number(quantity),

                p_note:
                    null
            }
        );


    if (
        error ||
        data !== true
    ) {

        console.error(
            "Could not cancel order item:",
            error
        );

        return false;
    }


    await loadRooms(true);

    return true;
}


async function restoreOrderItem(
    orderItemId,
    quantity
) {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_restore_order_item",
            {
                p_device_uuid:
                    deviceUuid,

                p_order_item_id:
                    Number(orderItemId),

                p_quantity:
                    Number(quantity),

                p_note:
                    "Peruutus palautettu staff-tabletilta"
            }
        );


    if (
        error ||
        data !== true
    ) {

        console.error(
            "Could not restore order item:",
            error
        );

        return false;
    }


    await loadRooms(true);

    return true;
}


/* =========================================================
   MARK ROOM ORDERS DELIVERED
========================================================= */

async function markRoomOrdersDelivered(orderIds) {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );

    if (!deviceUuid) {
        showPairingScreen();
        return false;
    }

    const uniqueOrderIds =
        [...new Set(orderIds.map(Number))];

    if (
        uniqueOrderIds.length === 0 ||
        uniqueOrderIds.some(
            id => !Number.isSafeInteger(id) || id <= 0
        )
    ) {
        return false;
    }

    for (const orderId of uniqueOrderIds) {

        const {
            data,
            error
        } =
            await staffSupabaseClient.rpc(
                "staff_mark_order_delivered",
                {
                    p_device_uuid:
                        deviceUuid,

                    p_order_id:
                        orderId
                }
            );

        if (
            error ||
            data !== true
        ) {
            console.error(
                "Could not deliver room order:",
                orderId,
                error
            );

            await loadRooms();
            return false;
        }
    }

    await loadRooms();

    return true;
}
  

/* =========================================================
   MARK BOOKING PAID
========================================================= */

async function markBookingPaid(
    bookingId
) {

    const deviceUuid =
        localStorage.getItem(
            STAFF_DEVICE_STORAGE_KEY
        );


    if (!deviceUuid) {

        showPairingScreen();
        return false;
    }


    const {
        data,
        error
    } =
        await staffSupabaseClient.rpc(
            "staff_mark_booking_paid",
            {
                p_device_uuid:
                    deviceUuid,

                p_booking_id:
                    Number(bookingId)
            }
        );


    if (
        error ||
        Number(data) < 1
    ) {

        console.error(
            "Could not mark booking paid:",
            bookingId,
            error
        );

        return false;
    }


    await loadRooms(true);

    return true;
}

let lastRoomsRenderKey =
    null;

let roomsLoadedOnce =
    false;

/* =========================================================
   LOAD ROOMS
========================================================= */

let roomsLoadRequestId = 0;

async function loadRooms(force = false) {

    const roomsContainer =
        document.getElementById("staffRooms");

    if (!roomsContainer) {
        return;
    }

    if (
        !force &&
        roomsContainer.querySelector("button:disabled")
    ) {
        return;
    }

    const requestId = ++roomsLoadRequestId;


    if (!roomsLoadedOnce) {

    roomsContainer.textContent =
        "Ladataan huoneita...";
}


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
    "staff_get_bookings_v2",
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
    "staff_get_unpaid_room_orders",
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
   
   if (
    requestId !== roomsLoadRequestId ||
    (
        !force &&
        roomsContainer.querySelector("button:disabled")
    )
) {
    return;
}


const bookingPhases = bookings.map(booking => {
    const start = new Date(
        `${booking.booking_date}T${booking.start_time}`
    );

    const end = new Date(
        `${booking.booking_date}T${booking.end_time}`
    );

    if (end <= start) {
        end.setDate(end.getDate() + 1);
    }

    return {
        id: booking.booking_id,
        phase:
            now < start
                ? "future"
                : now >= end
                    ? "past"
                    : "current"
    };
});

const renderKey = JSON.stringify({
    rooms: rooms || [],
    bookings: bookings || [],
    roomOrders: roomOrders || [],
    bookingPhases
});



if (
    roomsLoadedOnce &&
    renderKey === lastRoomsRenderKey
) {

    return;
}


lastRoomsRenderKey =
    renderKey;

roomsLoadedOnce =
    true;

   
const openDetailsKeys = new Set(
    Array.from(
        roomsContainer.querySelectorAll(
            "details[data-staff-key]"
        )
    )
        .filter(details => details.open)
        .map(details => details.dataset.staffKey)
);


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

       
        // HUONEVARAUKSEN MAKSU

        const roomFeeAmount =
            Number(booking.total_price);

        const roomFeePaid =
            booking.payment_status === "paid";

        const bookingCancelled =
            ["cancelled", "canceled"].includes(
                String(booking.status || "").toLowerCase()
            );

        if (!bookingCancelled) {

            const roomFeeInfo =
                document.createElement("div");

            roomFeeInfo.className =
                "staff-booking-label";

            if (
                !Number.isFinite(roomFeeAmount) ||
                roomFeeAmount <= 0
            ) {
                roomFeeInfo.textContent =
                    "Huonehinta puuttuu";

            } else {

                const formattedAmount =
                    roomFeeAmount.toLocaleString(
                        "fi-FI",
                        {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        }
                    );

                roomFeeInfo.textContent =
                    `HUONEMAKSU ${formattedAmount} € — ` +
                    (roomFeePaid ? "MAKSETTU" : "MAKSAMATTA");

                if (!roomFeePaid) {

                    const roomFeeButton =
                        document.createElement("button");

                    roomFeeButton.type = "button";

                    roomFeeButton.className =
                        "mark-order-delivered";

                    roomFeeButton.textContent =
                        "MERKITSE HUONE MAKSETUKSI";

                    roomFeeButton.addEventListener(
                        "click",
                        async () => {

                            const confirmed = window.confirm(
                                `Onko huoneen maksu ${formattedAmount} € ` +
                                `todella vastaanotettu?`
                            );

                            if (!confirmed) return;

                            const deviceUuid =
                                localStorage.getItem(
                                    STAFF_DEVICE_STORAGE_KEY
                                );

                            if (!deviceUuid) {
                                showPairingScreen();
                                return;
                            }

                            roomFeeButton.disabled = true;
                            roomFeeButton.textContent =
                                "MERKITÄÄN...";

                            try {

                                const { data, error } =
                                    await staffSupabaseClient.rpc(
                                        "staff_mark_room_fee_paid",
                                        {
                                            p_device_uuid: deviceUuid,
                                            p_booking_id: Number(
                                                booking.booking_id
                                            )
                                        }
                                    );

                                if (
                                    error ||
                                    Number(data) !== 1
                                ) {
                                    throw new Error(
                                        error?.message ||
                                        "Maksua ei voitu vahvistaa."
                                    );
                                }

                                await loadRooms();

                            } catch (error) {

                                console.error(
                                    "Huonemaksun vahvistus epäonnistui:",
                                    error
                                );

                                alert(
                                    "Huonemaksun vahvistus epäonnistui. " +
                                    "Tarkista maksutila ennen uutta yritystä."
                                );

                                roomFeeButton.disabled = false;
                                roomFeeButton.textContent =
                                    "MERKITSE HUONE MAKSETUKSI";
                            }
                        }
                    );

                    block.appendChild(roomFeeButton);
                }
            }

            block.appendChild(roomFeeInfo);
        }

        // HUONEVARAUKSEN MAKSU LOPPU


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

           /* UNPAID ORDERS FOR THIS ROOM */

const roomUnpaidOrders =
    roomOrders.filter(
        (order) =>
            Number(order.room_id) ===
            Number(room.id)
    );


const unpaidBookingsMap =
    new Map();


roomUnpaidOrders.forEach(
    (order) => {

        const bookingId =
            Number(order.booking_id);


        if (
            !unpaidBookingsMap.has(
                bookingId
            )
        ) {

            unpaidBookingsMap.set(
                bookingId,
                {
                    bookingId:
                        bookingId,

                    customerName:
                        order.customer_name ||
                        "Ei nimeä",

                    bookingDate:
                        order.booking_date,

                    startTime:
                        order.start_time,

                    endTime:
                        order.end_time,

                    items:
                        [],

                    orderIds:
                        [],

                    undeliveredOrderIds:
                        []
                }
            );
        }


        const group =
            unpaidBookingsMap.get(
                bookingId
            );

       
if (!group.orderItems) {
    group.orderItems = [];
}

group.orderItems.push({
    orderItemId: Number(order.order_item_id),
    productId: Number(order.product_id),
    productName: order.product_name,
    quantity: Number(order.quantity),
    deliveredQuantity: Number(order.delivered_quantity ?? 0),
    cancelledQuantity: Number(order.cancelled_quantity ?? 0),
    unitPrice: Number(order.unit_price)
});


        group.orderIds.push(
            Number(order.order_id)
        );


        if (
            order.order_status !==
            "delivered"
        ) {

            group.undeliveredOrderIds.push(
                Number(order.order_id)
            );
        }


        const itemKey =
            `${order.product_id}-${order.unit_price}`;


        const existingItem =
            group.items.find(
                (item) =>
                    item.key === itemKey
            );


        if (existingItem) {

            existingItem.quantity +=
                Number(order.quantity);

        } else {

            group.items.push({
                key:
                    itemKey,

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


const unpaidBookingGroups =
    [
        ...unpaidBookingsMap.values()
    ].sort(
        (a, b) => {

            const aCurrent =
                currentBooking &&
                Number(
                    currentBooking.booking_id
                ) ===
                a.bookingId;

            const bCurrent =
                currentBooking &&
                Number(
                    currentBooking.booking_id
                ) ===
                b.bookingId;


            if (
                aCurrent &&
                !bCurrent
            ) {
                return -1;
            }


            if (
                bCurrent &&
                !aCurrent
            ) {
                return 1;
            }


            return (
                new Date(
                    `${b.bookingDate}T${b.startTime}`
                ) -
                new Date(
                    `${a.bookingDate}T${a.startTime}`
                )
            );
        }
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

               
details.dataset.staffKey =
    `bookings:${room.id}`;

details.open = openDetailsKeys.has(
    details.dataset.staffKey
);



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


/* NO UNPAID BILLS */

if (
    unpaidBookingGroups.length === 0
) {

    const message =
        document.createElement(
            "div"
        );

    message.className =
        "staff-no-orders";

    message.textContent =
        currentBooking
            ? "Ei maksamattomia tilauksia"
            : "Ei maksamattomia laskuja";


    ordersColumn.appendChild(
        message
    );


/* UNPAID BILLS */

} else {

    unpaidBookingGroups.forEach(
        (group) => {

            const bill =
                document.createElement(
                    "section"
                );

            bill.className =
                "staff-room-order-list";


            const isCurrentBooking =
                currentBooking &&
                Number(
                    currentBooking.booking_id
                ) ===
                group.bookingId;


            const billStatus =
                document.createElement(
                    "div"
                );

            billStatus.className =
                "staff-room-orders-heading";

            billStatus.textContent =
                isCurrentBooking
                    ? "NYKYINEN ASIAKAS · MAKSAMATTA"
                    : "MAKSAMATTA";


            const customer =
                document.createElement(
                    "strong"
                );

            customer.textContent =
                group.customerName;


            const bookingTime =
                document.createElement(
                    "div"
                );

            bookingTime.className =
                "staff-booking-date";

            bookingTime.textContent =
                `${group.bookingDate} · ${group.startTime.slice(0, 5)}–${group.endTime.slice(0, 5)}`;


            bill.appendChild(
                billStatus
            );

            bill.appendChild(
                customer
            );

            bill.appendChild(
                bookingTime
            );


            let billTotal =
                0;
           
billTotal = group.orderItems.reduce(
    (sum, item) => {
        const payableQuantity =
            item.quantity - item.cancelledQuantity;

        return sum +
            payableQuantity * item.unitPrice;
    },
    0
);

           
const pendingItems =
    group.orderItems.filter(
        item =>
            item.quantity -
            item.deliveredQuantity -
            item.cancelledQuantity > 0
    );

const deliveredItems =
    group.orderItems.filter(
        item => item.deliveredQuantity > 0
    );

const cancelledItems =
    group.orderItems.filter(
        item => item.cancelledQuantity > 0
    );

           
const deliveredDetails =
    document.createElement("details");

           
deliveredDetails.dataset.staffKey =
    `delivered:${room.id}:${group.bookingId}`;

deliveredDetails.open = openDetailsKeys.has(
    deliveredDetails.dataset.staffKey
);


const deliveredSummary =
    document.createElement("summary");

deliveredSummary.textContent =
    `TOIMITETUT (${deliveredItems.reduce(
        (sum, item) => sum + item.deliveredQuantity, 0
    )})`;

deliveredDetails.appendChild(deliveredSummary);


const cancelledDetails =
    document.createElement("details");

           
cancelledDetails.dataset.staffKey =
    `cancelled:${room.id}:${group.bookingId}`;

cancelledDetails.open = openDetailsKeys.has(
    cancelledDetails.dataset.staffKey
);


const cancelledSummary =
    document.createElement("summary");

cancelledSummary.textContent =
    `PERUUTETUT (${cancelledItems.reduce(
        (sum, item) => sum + item.cancelledQuantity, 0
    )})`;

cancelledDetails.appendChild(cancelledSummary);




/* GROUP PRODUCTS FOR DISPLAY */

function renderGroupedRows(
    items,
    quantityField,
    destination,
    cancelled = false
) {

    const grouped = new Map();

    items.forEach((item) => {

        const count =
            quantityField === "pending"
                ? item.quantity -
                  item.deliveredQuantity -
                  item.cancelledQuantity
                : quantityField === "delivered"
                    ? item.deliveredQuantity
                    : item.cancelledQuantity;

        if (count <= 0) {
            return;
        }

        const key =
            `${item.productId}:${item.unitPrice}`;

        if (!grouped.has(key)) {
            grouped.set(key, {
                name: item.productName,
                quantity: 0,
                unitPrice: item.unitPrice,
                orderItems: []
            });
        }

        const entry = grouped.get(key);

        entry.quantity += count;

        entry.orderItems.push({
            orderItemId: item.orderItemId,
            quantity: count
        });
    });


    grouped.forEach((item) => {

        const row =
            document.createElement("div");

        row.className =
            "staff-room-order-row";

        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.gap = "8px";


        const product =
            document.createElement("span");

        product.textContent =
            `${item.quantity} × ${item.name}`;

        product.style.flex = "1";
        product.style.minWidth = "0";


        const price =
            document.createElement("strong");

        price.textContent =
            cancelled
                ? "PERUUTETTU"
                : `${(
                    item.quantity *
                    item.unitPrice
                ).toFixed(2)} €`;

        price.style.whiteSpace = "nowrap";


        row.appendChild(product);
        row.appendChild(price);


        const actions =
            document.createElement("div");

        actions.style.display = "flex";
        actions.style.gap = "6px";
        actions.style.flexShrink = "0";


        const actionButtons = [];

        function createActionButton(
            symbol,
            label,
            color,
            action,
            needsConfirmation = false
        ) {

            const button =
                document.createElement("button");

            button.type = "button";
            button.textContent = symbol;
            button.title = label;

            button.setAttribute(
                "aria-label",
                `${label}: ${item.name}`
            );

            button.style.width = "36px";
            button.style.height = "36px";
            button.style.padding = "0";
            button.style.borderRadius = "8px";
            button.style.border =
                `1px solid ${color}`;
            button.style.background =
                "transparent";
            button.style.color = color;
            button.style.fontSize = "20px";
            button.style.cursor = "pointer";

            actionButtons.push(button);

            button.addEventListener(
                "click",
                async () => {

                    const firstAvailable =
                        item.orderItems.find(
                            entry =>
                                entry.quantity > 0
                        );

                    if (!firstAvailable) {
                        return;
                    }

                    if (
                        needsConfirmation &&
                        !window.confirm(
                            `${label}: ${item.name}, 1 kpl?`
                        )
                    ) {
                        return;
                    }

                    actionButtons.forEach(
                        b => b.disabled = true
                    );

                    try {

                        const success =
                            await action(
                                firstAvailable.orderItemId,
                                1
                            );

                        if (!success) {
                            window.alert(
                                "Toiminto epäonnistui. " +
                                "Tarkista tilauksen tila."
                            );
                        }

                    } catch (error) {

                        console.error(
                            "Product action failed:",
                            error
                        );

                        window.alert(
                            "Toiminto epäonnistui."
                        );

                    } finally {

                        actionButtons.forEach(
                            b => b.disabled = false
                        );
                    }
                }
            );

            actions.appendChild(button);
        }


        if (quantityField === "pending") {

            createActionButton(
                "✓",
                "Toimita 1 kpl",
                "#38d88a",
                deliverOrderItem
            );

            createActionButton(
                "✕",
                "Peruuta 1 kpl",
                "#ff3b75",
                cancelOrderItem,
                true
            );
        }


        if (quantityField === "cancelled") {

            createActionButton(
                "↶",
                "Kumoa peruutus 1 kpl",
                "#38d88a",
                restoreOrderItem,
                true
            );
        }


        if (actions.children.length > 0) {
            row.appendChild(actions);
        }

        destination.appendChild(row);
    });
}



/* SHOW PRODUCTS IN CORRECT SECTIONS */

renderGroupedRows(
    pendingItems,
    "pending",
    bill
);

renderGroupedRows(
    deliveredItems,
    "delivered",
    deliveredDetails
);

renderGroupedRows(
    cancelledItems,
    "cancelled",
    cancelledDetails,
    true
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
                `${billTotal.toFixed(2)} €`;


            total.appendChild(
                totalLabel
            );

            total.appendChild(
                totalPrice
            );

           
if (deliveredItems.length > 0) {
    bill.appendChild(deliveredDetails);
}

if (cancelledItems.length > 0) {
    bill.appendChild(cancelledDetails);
}


            bill.appendChild(
                total
            );


            

/* =====================================================
   DELIVER ALL PENDING ITEMS
===================================================== */

if (pendingItems.length > 0) {

    const deliverAllButton =
        document.createElement("button");

    deliverAllButton.type = "button";

    deliverAllButton.className =
        "mark-order-delivered";

    deliverAllButton.textContent =
        "KUITTAA KAIKKI TOIMITETUKSI";

    let batchRunning = false;

    deliverAllButton.addEventListener(
        "click",
        async () => {

            if (batchRunning) {
                return;
            }

            if (!window.confirm(
                "Kuitataanko kaikki tämän asiakkaan " +
                "toimittamattomat tuotteet toimitetuiksi?"
            )) {
                return;
            }

            batchRunning = true;
            deliverAllButton.disabled = true;
            deliverAllButton.textContent =
                "TARKISTETAAN TILAUKSET...";

            let completed = 0;
            let total = 0;
            let failure = false;

            try {

                const deviceUuid =
                    localStorage.getItem(
                        STAFF_DEVICE_STORAGE_KEY
                    );

                if (!deviceUuid) {
                    throw new Error(
                        "Henkilökuntalaitetta ei ole yhdistetty."
                    );
                }

                /* GET FRESH ITEM QUANTITIES */

                const {
                    data: latestOrders,
                    error: fetchError
                } =
                    await staffSupabaseClient.rpc(
                        "staff_get_unpaid_room_orders",
                        {
                            p_device_uuid: deviceUuid
                        }
                    );

                if (fetchError) {
                    throw fetchError;
                }

                const itemsToDeliver =
                    (latestOrders || [])
                        .filter(
                            order =>
                                Number(order.booking_id) ===
                                Number(group.bookingId)
                        )
                        .map(order => ({
                            orderItemId:
                                Number(order.order_item_id),

                            quantity:
                                Number(order.quantity) -
                                Number(order.delivered_quantity) -
                                Number(order.cancelled_quantity)
                        }))
                        .filter(
                            item => item.quantity > 0
                        );

                total = itemsToDeliver.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                );

                if (total === 0) {
                    window.alert(
                        "Ei enää toimittamattomia tuotteita."
                    );
                    return;
                }

                /* DELIVER ITEMS ONE BY ONE */

                for (const item of itemsToDeliver) {

                    deliverAllButton.textContent =
                        `KUITATAAN ${completed}/${total}...`;

                    const {
                        data,
                        error
                    } =
                        await staffSupabaseClient.rpc(
                            "staff_deliver_order_item",
                            {
                                p_device_uuid:
                                    deviceUuid,

                                p_order_item_id:
                                    item.orderItemId,

                                p_quantity:
                                    item.quantity
                            }
                        );

                    if (error || data !== true) {

                        console.error(
                            "Bulk delivery failed:",
                            item.orderItemId,
                            error
                        );

                        failure = true;
                        break;
                    }

                    completed += item.quantity;
                }

                if (failure) {

                    window.alert(
                        "Kuittaus keskeytyi. " +
                        "Onnistuneita kirjauksia: " +
                        completed + "/" + total + " kpl. " +
                        "Tarkista tilanne ennen uutta yritystä."
                    );

                } else {

                    deliverAllButton.textContent =
                        "KAIKKI KUITATTU ✓";
                }

            } catch (error) {

                console.error(
                    "Bulk delivery error:",
                    error
                );

                window.alert(
                    "Kuittauksen tilaa ei voitu varmistaa. " +
                    "Tarkista toimitetut tuotteet " +
                    "ennen uutta yritystä."
                );

            } finally {

                try {
                    await loadRooms(true);
                } catch (error) {
                    console.error(
                        "Room refresh failed:",
                        error
                    );
                }

                batchRunning = false;
                deliverAllButton.disabled = false;

                deliverAllButton.textContent =
                    "KUITTAA KAIKKI TOIMITETUKSI";
            }
        }
    );

    bill.appendChild(deliverAllButton);
}


            /* PAYMENT */

            const paidButton =
                document.createElement(
                    "button"
                );

            paidButton.type =
                "button";

            paidButton.className =
                "mark-order-delivered";

            paidButton.textContent =
                "MERKITSE MAKSETUKSI";


            paidButton.addEventListener(
                "click",
                async () => {

                    paidButton.disabled =
                        true;

                    paidButton.textContent =
                        "MERKITÄÄN...";


                    const success =
                        await markBookingPaid(
                            group.bookingId
                        );


                    if (!success) {

                        paidButton.disabled =
                            false;

                        paidButton.textContent =
                            "YRITÄ UUDELLEEN";
                    }
                }
            );


            bill.appendChild(
                paidButton
            );


            ordersColumn.appendChild(
                bill
            );
        }
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

/* AUTOMATIC REFRESH */

let staffRefreshRunning = false;

setInterval(async () => {

    if (
        staffRefreshRunning ||
        document.hidden ||
        document.querySelector(
            "#staffRooms button:disabled"
        )
    ) {
        return;
    }

    staffRefreshRunning = true;

    try {
        await loadRooms();
        await loadServiceCalls();
    } catch (error) {
        console.error(
            "Staff automatic refresh failed:",
            error
        );
    } finally {
        staffRefreshRunning = false;
    }

}, 5000);


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

let lastServiceCallsRenderKey =
    null;


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


    const renderKey =
        JSON.stringify(
            (calls || [])
                .map(
                    call => ({
                        call_id:
                            Number(call.call_id),

                        room_name:
                            call.room_name,

                        created_at:
                            call.created_at
                    })
                )
                .sort(
                    (a, b) =>
                        a.call_id -
                        b.call_id
                )
        );


    if (
        renderKey ===
        lastServiceCallsRenderKey
    ) {

        return;
    }


    lastServiceCallsRenderKey =
        renderKey;


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


/*
setInterval(
    loadServiceCalls,
    3000
);
*/
