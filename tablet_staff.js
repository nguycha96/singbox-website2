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
    roomBookings.length > 0
        ? `${roomBookings.length} varausta`
        : "Ei varauksia";


        header.appendChild(name);
        header.appendChild(status);


        const content =
            document.createElement("div");

        content.className =
            "room-card-content";

        content.textContent =
            "Ei avoimia tilauksia tai kutsuja.";


        card.appendChild(header);
        card.appendChild(content);

        roomsContainer.appendChild(card);
    });
}


/* =========================================================
   START
========================================================= */

loadRooms();
