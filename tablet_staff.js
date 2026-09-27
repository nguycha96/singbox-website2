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

const {
    data: bookings,
    error: bookingsError
} = await supabaseClient
    .rpc("get_staff_bookings");


if (bookingsError) {

    console.error(
        "Could not load bookings:",
        bookingsError
    );

    return;
}
   
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

        content.appendChild(bookingBlock);
    });
}


        card.appendChild(header);
        card.appendChild(content);

        roomsContainer.appendChild(card);
    });
}


/* =========================================================
   START
========================================================= */

loadRooms();
