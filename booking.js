/* =========================================================
   SiNG BOX NORAEBANG
   BOOKING
========================================================= */


/* =========================================================
   BOOKING DATA
========================================================= */

const roomPrices = {

    gangnam: {
        weekdayBefore18: 55,
        weekdayAfter18: 60,
        weekendBefore18: 65,
        weekendAfter18: 70
    },

    seoul: {
        weekdayBefore18: 55,
        weekdayAfter18: 60,
        weekendBefore18: 65,
        weekendAfter18: 70
    },

    hongdae: {
        weekdayBefore18: 45,
        weekdayAfter18: 50,
        weekendBefore18: 55,
        weekendAfter18: 60
    },

    itaewon: {
        weekdayBefore18: 45,
        weekdayAfter18: 50,
        weekendBefore18: 55,
        weekendAfter18: 60
    }

};


const rooms = [

    {
        id: "gangnam",
        title: "Gangnam",
        guests: 6,
        startingPrice: 55,
        image: "images/gangnam.png"
    },

    {
        id: "seoul",
        title: "Seoul",
        guests: 6,
        startingPrice: 55,
        image: "images/seoul.png"
    },

    {
        id: "hongdae",
        title: "Hongdae",
        guests: 4,
        startingPrice: 45,
        image: "images/hongdae.png"
    },

    {
        id: "itaewon",
        title: "Itaewon",
        guests: 4,
        startingPrice: 45,
        image: "images/itaewon.png"
    }

];



/* =========================================================
   TRANSLATIONS
========================================================= */

const translations = {

    fi: {

        "header.back":
            "Takaisin etusivulle",

        "intro.eyebrow":
            "VARAA KARAOKEHUONE",

        "intro.title":
            "Valitse<br>päivä.",

        "intro.text":
            "Valitse päivä nähdäksesi vapaat karaokehuoneet ja ajat.",


        "calendar.previous":
            "Edellinen kuukausi",

        "calendar.next":
            "Seuraava kuukausi",


        "legend.title":
            "SAATAVUUS",

        "legend.available":
            "Vapaa",

        "legend.selected":
            "Valittu",

        "legend.booked":
            "Varattu",

        "legend.help":
            "Valitse päivä nähdäksesi vapaat huoneet ja ajat.",


        "rooms.eyebrow":
            "VALITSE HUONE JA AIKA",

        "rooms.description":
            "Valitse vähintään yhden tunnin varaus. Varausten välissä on vähintään 15 minuutin siivousaika.",


        "footer.text":
            "Korealainen yksityishuonekaraoke Helsingissä.",


        "selectDate":
            "Valitse päivä",

        "availableTimes":
            "VAPAAT AJAT",

        "total":
            "Yhteensä",

        "upTo":
            "Enintään",

        "guests":
            "henkilöä",

        "from":
            "Alkaen",

        "hour":
            "h"
    },


    en: {

        "header.back":
            "Back to home",

        "intro.eyebrow":
            "BOOK A KARAOKE ROOM",

        "intro.title":
            "Choose<br>your date.",

        "intro.text":
            "Choose a date to see available karaoke rooms and times.",


        "calendar.previous":
            "Previous month",

        "calendar.next":
            "Next month",


        "legend.title":
            "AVAILABILITY",

        "legend.available":
            "Available",

        "legend.selected":
            "Selected",

        "legend.booked":
            "Booked",

        "legend.help":
            "Choose a date to see available rooms and times.",


        "rooms.eyebrow":
            "CHOOSE A ROOM AND TIME",

        "rooms.description":
            "Choose a minimum booking of one hour. There is at least 15 minutes of cleaning time between bookings.",


        "footer.text":
            "Korean private-room karaoke in Helsinki.",


        "selectDate":
            "Select a date",

        "availableTimes":
            "AVAILABLE TIMES",

        "total":
            "Total",

        "upTo":
            "Up to",

        "guests":
            "guests",

        "from":
            "From",

        "hour":
            "hour"
    }

};



/* =========================================================
   LANGUAGE
========================================================= */

let currentLanguage = "fi";


function getTranslation(key) {

    return translations[currentLanguage][key] || key;

}


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


    if (
        browserLanguage.startsWith("fi")
    ) {
        return "fi";
    }


    return "en";
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
        .querySelectorAll("[data-i18n]")
        .forEach(element => {

            const key =
                element.dataset.i18n;

            const value =
                translations[language][key];

            if (value !== undefined) {
                element.innerHTML = value;
            }

        });


    document
        .querySelectorAll("[data-i18n-aria]")
        .forEach(element => {

            const key =
                element.dataset.i18nAria;

            const value =
                translations[language][key];

            if (value !== undefined) {
                element.setAttribute(
                    "aria-label",
                    value
                );
            }

        });


    document
        .querySelectorAll(".lang-btn")
        .forEach(button => {

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
            );

        });


    updateWeekdays();


    try {

        localStorage.setItem(
            "singbox-language",
            language
        );

    } catch (error) {
        /* Site works without localStorage */
    }


    /*
        Redraw dynamic content in the
        newly selected language.
    */

    drawCalendar();
    drawRooms();

}



function updateWeekdays() {

    const weekdayTranslations = {

        fi: {
            mon: "Ma",
            tue: "Ti",
            wed: "Ke",
            thu: "To",
            fri: "Pe",
            sat: "La",
            sun: "Su"
        },

        en: {
            mon: "Mon",
            tue: "Tue",
            wed: "Wed",
            thu: "Thu",
            fri: "Fri",
            sat: "Sat",
            sun: "Sun"
        }

    };


    document
        .querySelectorAll("[data-weekday]")
        .forEach(element => {

            const day =
                element.dataset.weekday;

            element.textContent =
                weekdayTranslations[
                    currentLanguage
                ][day];

        });

}



/* =========================================================
   ELEMENTS
========================================================= */

const calendarDays =
    document.getElementById(
        "calendarDays"
    );

const monthTitle =
    document.getElementById(
        "monthTitle"
    );

const previousMonth =
    document.getElementById(
        "previousMonth"
    );

const nextMonth =
    document.getElementById(
        "nextMonth"
    );

const selectedDateTitle =
    document.getElementById(
        "selectedDateTitle"
    );

const roomsGrid =
    document.getElementById(
        "roomsGrid"
    );



/* =========================================================
   DATE
========================================================= */

const today =
    new Date();


today.setHours(
    0,
    0,
    0,
    0
);


let displayedDate =
    new Date(
        today.getFullYear(),
        today.getMonth(),
        1
    );


let selectedDate =
    null;



/* =========================================================
   DATE FORMATTERS
========================================================= */

function getLocale() {

    return currentLanguage === "fi"
        ? "fi-FI"
        : "en-US";

}


function getMonthTitle(
    year,
    month
) {

    const date =
        new Date(
            year,
            month,
            1
        );


    let title =
        date.toLocaleDateString(
            getLocale(),
            {
                month: "long",
                year: "numeric"
            }
        );


    /*
        Finnish month names normally begin
        with a lowercase letter.
        Capitalize for the visual heading.
    */

    return title.charAt(0).toUpperCase()
        + title.slice(1);

}



/* =========================================================
   CALENDAR
========================================================= */

function drawCalendar() {

    calendarDays.innerHTML =
        "";


    const year =
        displayedDate.getFullYear();


    const month =
        displayedDate.getMonth();


    monthTitle.textContent =
        getMonthTitle(
            year,
            month
        );


    /*
        JavaScript Sunday = 0.
        We want Monday = 0.
    */

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const mondayFirst =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();



    /*
        Empty cells before first day.
    */

    for (
        let i = 0;
        i < mondayFirst;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(
            empty
        );

    }



    /*
        Actual days.
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "calendar-day";


        button.textContent =
            day;


        const date =
            new Date(
                year,
                month,
                day
            );


        date.setHours(
            0,
            0,
            0,
            0
        );



        /*
            Today
        */

        if (
            date.getTime() ===
            today.getTime()
        ) {

            button.classList.add(
                "today"
            );

        }



        /*
            Past dates
        */

        if (
            date < today
        ) {

            button.classList.add(
                "past"
            );

            button.disabled =
                true;

        }



        /*
            Selected date
        */

        if (
            selectedDate &&
            date.getTime() ===
            selectedDate.getTime()
        ) {

            button.classList.add(
                "selected"
            );

        }



        /*
            Click
        */

        if (
            date >= today
        ) {

            button.addEventListener(
                "click",
                () => {

                    selectedDate =
                        new Date(
                            date
                        );

                    drawCalendar();

                    drawRooms();

                }
            );

        }


        calendarDays.appendChild(
            button
        );

    }

}



/* =========================================================
   MONTH NAVIGATION
========================================================= */

previousMonth.addEventListener(
    "click",
    () => {

        const previous =
            new Date(
                displayedDate
                    .getFullYear(),

                displayedDate
                    .getMonth() - 1,

                1
            );


        const currentMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        if (
            previous <
            currentMonth
        ) {

            return;

        }


        displayedDate =
            previous;


        drawCalendar();

    }
);



nextMonth.addEventListener(
    "click",
    () => {

        displayedDate =
            new Date(
                displayedDate
                    .getFullYear(),

                displayedDate
                    .getMonth() + 1,

                1
            );


        drawCalendar();

    }
);



/* =========================================================
   TIME GENERATION
========================================================= */

function createTimeSlots() {

    const slots = [];


    if (!selectedDate) {
        return slots;
    }


    const day =
        selectedDate.getDay();


    const openingMinutes =
        14 * 60;


    let closingMinutes;



    /*
        Monday–Thursday
        14:00–23:00
    */

    if (
        day >= 1 &&
        day <= 4
    ) {

        closingMinutes =
            23 * 60;

    }


    /*
        Friday–Sunday
        14:00–02:00
    */

    else {

        closingMinutes =
            26 * 60;

    }



    /*
        Keep the original booking logic.
    */

    const latestStart =
        closingMinutes - 15;


    for (
        let minutes =
            openingMinutes;

        minutes <=
            latestStart;

        minutes += 15
    ) {

        let displayMinutes =
            minutes;


        if (
            displayMinutes >=
            24 * 60
        ) {

            displayMinutes -=
                24 * 60;

        }


        const hours =
            Math.floor(
                displayMinutes / 60
            );


        const mins =
            displayMinutes % 60;


        const hourText =
            String(hours)
                .padStart(
                    2,
                    "0"
                );


        const minuteText =
            String(mins)
                .padStart(
                    2,
                    "0"
                );


        slots.push(
            `${hourText}:${minuteText}`
        );

    }


    return slots;

}



/* =========================================================
   PRICE
========================================================= */

function getHourlyPrice(
    roomId,
    date,
    startTime
) {

    const prices =
        roomPrices[roomId];


    if (!prices) {
        return 0;
    }


    const [hours] =
        startTime
            .split(":")
            .map(Number);


    const day =
        date.getDay();


    /*
        Friday, Saturday and Sunday
        use weekend pricing.
    */

    const isWeekend =
        day === 5 ||
        day === 6 ||
        day === 0;


    /*
        Starting time determines
        the hourly price.
    */

    const isBefore18 =
        hours < 18;


    if (isWeekend) {

        return isBefore18
            ? prices.weekendBefore18
            : prices.weekendAfter18;

    }


    return isBefore18
        ? prices.weekdayBefore18
        : prices.weekdayAfter18;

}



/* =========================================================
   DEMO BOOKED TIMES
========================================================= */

/* =========================================================
   BOOKED TIMES + CLEANING BUFFER
========================================================= */

/*
    Demo bookings.

    start = booking start
    end   = booking end

    IMPORTANT:
    The end time itself is NOT part of the customer's
    booking, but 15 minutes after the booking is reserved
    for cleaning.

    We also block 15 minutes BEFORE an existing booking,
    because a previous customer must finish early enough
    to leave the required cleaning gap.
*/

function getDemoBookings(roomId) {

    if (!selectedDate) {
        return [];
    }

    const day =
        selectedDate.getDate();


    const bookings = [];


    /*
        Same demo conditions as before,
        but bookings are now represented
        as actual start/end times.
    */

    if (
        roomId === "gangnam" &&
        day % 3 === 0
    ) {
        bookings.push({
            start: "18:00",
            end: "19:00"
        });
    }


    if (
        roomId === "seoul" &&
        day % 4 === 0
    ) {
        bookings.push({
            start: "16:00",
            end: "17:00"
        });
    }


    if (
        roomId === "hongdae" &&
        day % 5 === 0
    ) {
        bookings.push({
            start: "20:00",
            end: "21:00"
        });
    }


    if (
        roomId === "itaewon" &&
        day % 6 === 0
    ) {
        bookings.push({
            start: "14:00",
            end: "15:00"
        });
    }


    return bookings;
}



/* =========================================================
   TIME HELPERS
========================================================= */

function timeToMinutes(time) {

    const [hours, minutes] =
        time
            .split(":")
            .map(Number);

    return hours * 60 + minutes;
}


function normalizeMinutes(minutes) {

    /*
        Times after midnight belong to the same
        karaoke evening.

        Example:
        01:00 becomes 25:00 internally.
    */

    if (minutes < 14 * 60) {
        return minutes + 24 * 60;
    }

    return minutes;
}


function bookingTimeToMinutes(time) {

    return normalizeMinutes(
        timeToMinutes(time)
    );
}



/* =========================================================
   SLOT STATUS
========================================================= */

function getSlotStatus(
    roomId,
    time
) {

    const slotMinutes =
        bookingTimeToMinutes(time);


    const bookings =
        getDemoBookings(roomId);


    for (const booking of bookings) {

        const start =
            bookingTimeToMinutes(
                booking.start
            );

        let end =
            bookingTimeToMinutes(
                booking.end
            );


        if (end <= start) {
            end += 24 * 60;
        }


        /*
            Actual customer booking.
        */

        if (
            slotMinutes >= start &&
            slotMinutes < end
        ) {
            return "booked";
        }


        /*
            15-minute cleaning / changeover
            immediately BEFORE the booking.
        */

        if (
            slotMinutes >= start - 15 &&
            slotMinutes < start
        ) {
            return "cleaning";
        }


        /*
            15-minute cleaning / changeover
            immediately AFTER the booking.
        */

        if (
            slotMinutes >= end &&
            slotMinutes < end + 15
        ) {
            return "cleaning";
        }

    }


    return "available";
}



function isBooked(
    roomId,
    time
) {

    return getSlotStatus(
        roomId,
        time
    ) !== "available";
}




/* =========================================================
   ROOMS
========================================================= */

function drawRooms() {

    if (!selectedDate) {

        selectedDateTitle.textContent =
            getTranslation("selectDate");

        roomsGrid.innerHTML = "";

        return;
    }


    const dateText =
        selectedDate.toLocaleDateString(
            getLocale(),
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    selectedDateTitle.textContent =
        dateText.charAt(0).toUpperCase()
        + dateText.slice(1);


    roomsGrid.innerHTML = "";


    rooms.forEach(room => {

        const card =
            document.createElement("article");


        card.className = "room-card";
        card.dataset.roomId = room.id;


        const capacityText =
            currentLanguage === "fi"
                ? `Enintään ${room.guests} henkilöä`
                : `Up to ${room.guests} guests`;


        const priceText =
            currentLanguage === "fi"
                ? `Alkaen ${room.startingPrice} €/h`
                : `From €${room.startingPrice} / hour`;


        card.innerHTML = `

            <img
                class="room-image"
                src="${room.image}"
                alt="${room.title}"
            >

            <div class="room-info">

                <h3>
                    ${room.title}
                </h3>

                <div class="room-meta">
                    ${capacityText}
                </div>

                <div class="room-price">
                    ${priceText}
                </div>

            </div>


            <div class="time-slots">

                <div class="time-header">

                    <h4>
                        ${getTranslation("availableTimes")}
                    </h4>

                    <div class="selected-total">
                        ${getTranslation("total")} €0
                    </div>

                </div>

                <div class="time-grid">
                </div>

            </div>
        `;


        const timeGrid =
            card.querySelector(".time-grid");


        const slots =
            createTimeSlots();


        slots.forEach(time => {

            const button =
                document.createElement("button");


            button.type = "button";
            button.className = "time-slot";
            button.textContent = time;
            button.dataset.time = time;


            const slotStatus =
                getSlotStatus(
                    room.id,
                    time
                );


            /*
                ACTUAL EXISTING BOOKING
            */

            if (slotStatus === "booked") {

                button.classList.add("booked");

                button.textContent = "×";

                button.disabled = true;
            }


            /*
                CLEANING / CHANGEOVER TIME
            */

            else if (slotStatus === "cleaning") {

                button.classList.add("cleaning");

                button.textContent = "○";

                button.disabled = true;
            }


            /*
                AVAILABLE TIME
            */

            else {

                button.addEventListener(
                    "click",
                    () => {

                        selectTime(
                            room,
                            time,
                            button
                        );

                        updateRoomSelection(
                            room.id
                        );
                    }
                );
            }


            timeGrid.appendChild(button);
        });


        roomsGrid.appendChild(card);
    });
}


/* =========================================================
   UPDATE ROOM SELECTION
========================================================= */

function updateRoomSelection(
    roomId
) {

    const roomCard =
        document.querySelector(
            `.room-card[data-room-id="${roomId}"]`
        );


    if (
        !roomCard ||
        !selectedDate
    ) {

        return;

    }


    const timeButtons =
        Array.from(
            roomCard.querySelectorAll(
                ".time-slot"
            )
        );



    /*
        Remove old displayed prices.
    */

    timeButtons.forEach(
        button => {

            const oldPrice =
                button.querySelector(
                    ".selected-price"
                );


            if (oldPrice) {
                oldPrice.remove();
            }

        }
    );



    /*
        Selected 15-minute slots.
    */

    const selectedButtons =
        timeButtons.filter(
            button =>
                button.classList.contains(
                    "selected"
                )
        );


    let total = 0;



    /*
        Every four selected 15-minute
        slots = one hour.
    */

    for (
        let i = 0;
        i < selectedButtons.length;
        i += 4
    ) {

        const hourButtons =
            selectedButtons.slice(
                i,
                i + 4
            );


        if (
            hourButtons.length !== 4
        ) {

            continue;

        }


        const firstButton =
            hourButtons[0];


        const startTime =
            firstButton.dataset.time;


        const price =
            getHourlyPrice(
                roomId,
                selectedDate,
                startTime
            );


        total +=
            price;



        const priceElement =
            document.createElement(
                "small"
            );


        priceElement.className =
            "selected-price";


        priceElement.textContent =
            `€${price}`;


        firstButton.appendChild(
            priceElement
        );

    }



    /*
        Update total.
    */

    const totalElement =
        roomCard.querySelector(
            ".selected-total"
        );


    if (totalElement) {

        totalElement.textContent =
            `${getTranslation("total")} €${total}`;

    }

}



/* =========================================================
   SELECT TIME

   Existing booking behaviour is retained:
   four 15-minute slots = one hour.
========================================================= */

function selectTime(
    room,
    time,
    button
) {

    const roomCard =
        button.closest(".room-card");


    const timeButtons =
        Array.from(
            roomCard.querySelectorAll(
                ".time-slot"
            )
        );


    const clickedIndex =
        timeButtons.indexOf(button);


    /*
        Helper:
        true = this slot cannot be part
        of a customer booking.
    */

    function slotIsBlocked(slot) {

        return (
            slot.classList.contains("booked") ||
            slot.classList.contains("cleaning")
        );
    }


    /*
        CLICKED SLOT IS ALREADY SELECTED
        -> remove that one-hour block
    */

    if (
        button.classList.contains("selected")
    ) {

        const selectedButtons =
            timeButtons.filter(
                slot =>
                    slot.classList.contains(
                        "selected"
                    )
            );


        const selectedIndex =
            selectedButtons.indexOf(button);


        const hourStartIndex =
            Math.floor(
                selectedIndex / 4
            ) * 4;


        const hourToRemove =
            selectedButtons.slice(
                hourStartIndex,
                hourStartIndex + 4
            );


        hourToRemove.forEach(
            slot => {

                slot.classList.remove(
                    "selected"
                );
            }
        );


        updateRoomSelection(room.id);

        return;
    }


    /*
        CURRENT SELECTION
    */

    const selectedButtons =
        timeButtons.filter(
            slot =>
                slot.classList.contains(
                    "selected"
                )
        );


    /*
        NOTHING SELECTED YET
        -> select one hour
    */

    if (selectedButtons.length === 0) {

        const newHour =
            timeButtons.slice(
                clickedIndex,
                clickedIndex + 4
            );


        if (newHour.length !== 4) {
            return;
        }


        if (
            newHour.some(slotIsBlocked)
        ) {
            return;
        }


        newHour.forEach(
            slot => {

                slot.classList.add(
                    "selected"
                );
            }
        );


        updateRoomSelection(room.id);

        return;
    }


    /*
        ADD ONE HOUR TO THE END
    */

    const lastSelected =
        selectedButtons[
            selectedButtons.length - 1
        ];


    const lastIndex =
        timeButtons.indexOf(
            lastSelected
        );


    if (
        clickedIndex ===
        lastIndex + 1
    ) {

        const newHour =
            timeButtons.slice(
                clickedIndex,
                clickedIndex + 4
            );


        if (newHour.length !== 4) {
            return;
        }


        if (
            newHour.some(slotIsBlocked)
        ) {
            return;
        }


        newHour.forEach(
            slot => {

                slot.classList.add(
                    "selected"
                );
            }
        );


        updateRoomSelection(room.id);

        return;
    }


    /*
        ADD ONE HOUR TO THE BEGINNING
    */

    const firstSelected =
        selectedButtons[0];


    const firstIndex =
        timeButtons.indexOf(
            firstSelected
        );


    if (
        clickedIndex ===
        firstIndex - 1
    ) {

        const newStart =
            firstIndex - 4;


        if (newStart < 0) {
            return;
        }


        const newHour =
            timeButtons.slice(
                newStart,
                firstIndex
            );


        if (newHour.length !== 4) {
            return;
        }


        if (
            newHour.some(slotIsBlocked)
        ) {
            return;
        }


        newHour.forEach(
            slot => {

                slot.classList.add(
                    "selected"
                );
            }
        );


        updateRoomSelection(room.id);

        return;
    }


    /*
        CLICK ANOTHER AVAILABLE TIME
        -> remove old selection and
        start a new one-hour booking
    */

    selectedButtons.forEach(
        slot => {

            slot.classList.remove(
                "selected"
            );
        }
    );


    const newHour =
        timeButtons.slice(
            clickedIndex,
            clickedIndex + 4
        );


    if (newHour.length !== 4) {

        updateRoomSelection(room.id);

        return;
    }


    if (
        newHour.some(slotIsBlocked)
    ) {

        updateRoomSelection(room.id);

        return;
    }


    newHour.forEach(
        slot => {

            slot.classList.add(
                "selected"
            );
        }
    );


    updateRoomSelection(room.id);
}


/* =========================================================
   ORIGINAL HELPER FUNCTIONS
========================================================= */

function selectOneHour(
    roomCard,
    startMinutes
) {

    const timeButtons =
        roomCard.querySelectorAll(
            ".time-slot"
        );


    for (
        let minutes =
            startMinutes;

        minutes <
            startMinutes + 60;

        minutes += 15
    ) {

        const slot =
            findTimeButton(
                timeButtons,
                minutes
            );


        if (!slot) {
            return;
        }


        slot.classList.add(
            "selected"
        );

    }

}



function findTimeButton(
    buttons,
    minutes
) {

    const hours =
        Math.floor(
            minutes / 60
        );


    const mins =
        minutes % 60;


    const time =
        `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;


    return Array.from(
        buttons
    ).find(
        button =>
            button.dataset.time ===
            time
    );

}



/* =========================================================
   LANGUAGE BUTTONS
========================================================= */

document
    .querySelectorAll(".lang-btn")
    .forEach(button => {

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
   INITIAL DRAW
========================================================= */

currentLanguage =
    getInitialLanguage();


setLanguage(
    currentLanguage
);
