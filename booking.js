/* =====================
   BOOKING DATA
===================== */

const roomPrices = {

    gangnam: {
        weekdayBefore18: 40,
        weekdayAfter18: 45,
        weekendBefore18: 50,
        weekendAfter18: 55
    },

    seoul: {
        weekdayBefore18: 40,
        weekdayAfter18: 45,
        weekendBefore18: 50,
        weekendAfter18: 55
    },

    hongdae: {
        weekdayBefore18: 30,
        weekdayAfter18: 35,
        weekendBefore18: 40,
        weekendAfter18: 45
    },

    itaewon: {
        weekdayBefore18: 30,
        weekdayAfter18: 35,
        weekendBefore18: 40,
        weekendAfter18: 45
    }

};

const rooms = [
    {
        id: "gangnam",
        title: "Gangnam Lounge",
        size: "👥 1–6 Guests",
        price: "From €40 / hour",
        image: "images/gangnam.png"
    },
    {
        id: "seoul",
        title: "Seoul Lounge",
        size: "👥 1–6 Guests",
        price: "From €40 / hour",
        image: "images/seoul.png"
    },
    {
        id: "hongdae",
        title: "Hongdae Neon",
        size: "👥 1–4 Guests",
        price: "From €30 / hour",
        image: "images/hongdae.png"
    },
    {
        id: "itaewon",
        title: "Itaewon Gold",
        size: "👥 1–4 Guests",
        price: "From €30 / hour",
        image: "images/itaewon.png"
    }
];


/* =====================
   ELEMENTS
===================== */

const calendarDays =
    document.getElementById("calendarDays");

const monthTitle =
    document.getElementById("monthTitle");

const previousMonth =
    document.getElementById("previousMonth");

const nextMonth =
    document.getElementById("nextMonth");

const selectedDateTitle =
    document.getElementById("selectedDateTitle");

const roomsGrid =
    document.getElementById("roomsGrid");


/* =====================
   DATE
===================== */

const today = new Date();

today.setHours(0, 0, 0, 0);

let displayedDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
);

let selectedDate = null;


/* =====================
   MONTH NAMES
===================== */

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];


/* =====================
   CALENDAR
===================== */

function drawCalendar(){

    calendarDays.innerHTML = "";

    const year =
        displayedDate.getFullYear();

    const month =
        displayedDate.getMonth();

    monthTitle.textContent =
        `${monthNames[month]} ${year}`;


    /*
       JavaScript Sunday = 0.
       We want Monday = 0.
    */

    const firstDay =
        new Date(year, month, 1).getDay();

    const mondayFirst =
        firstDay === 0
            ? 6
            : firstDay - 1;


    const daysInMonth =
        new Date(year, month + 1, 0).getDate();


    /*
       Empty cells before the
       first day of the month.
    */

    for(let i = 0; i < mondayFirst; i++){

        const empty =
            document.createElement("div");

        empty.className =
            "calendar-day empty";

        calendarDays.appendChild(empty);
    }


    /*
       Actual days.
    */

    for(let day = 1; day <= daysInMonth; day++){

        const button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "calendar-day";

        button.textContent = day;


        const date =
            new Date(year, month, day);

        date.setHours(0, 0, 0, 0);


        /*
           Today
        */

        if(date.getTime() === today.getTime()){

            button.classList.add("today");
        }


        /*
           Past dates
        */

        if(date < today){

            button.classList.add("past");

            button.disabled = true;
        }


        /*
           Selected date
        */

        if(
            selectedDate &&
            date.getTime() === selectedDate.getTime()
        ){

            button.classList.add("selected");
        }


        /*
           Click
        */

        if(date >= today){

            button.addEventListener(
                "click",
                () => {

                    selectedDate =
                        new Date(date);

                    drawCalendar();

                    drawRooms();
                }
            );
        }


        calendarDays.appendChild(button);
    }
}


/* =====================
   MONTH NAVIGATION
===================== */

previousMonth.addEventListener(
    "click",
    () => {

        const previous =
            new Date(
                displayedDate.getFullYear(),
                displayedDate.getMonth() - 1,
                1
            );


        /*
           Don't allow going before
           the current month.
        */

        const currentMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        if(previous < currentMonth){

            return;
        }


        displayedDate = previous;

        drawCalendar();
    }
);


nextMonth.addEventListener(
    "click",
    () => {

        displayedDate =
            new Date(
                displayedDate.getFullYear(),
                displayedDate.getMonth() + 1,
                1
            );

        drawCalendar();
    }
);


/* =====================
   TIME GENERATION
===================== */

function createTimeSlots(){

    const slots = [];

    if(!selectedDate){
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

    if(day >= 1 && day <= 4){

        closingMinutes =
            23 * 60;

    }

    /*
       Friday–Sunday
       14:00–02:00
    */

    else{

        closingMinutes =
            26 * 60;

    }

    /*
       One-hour booking.

       The last possible starting time is
       exactly one hour before closing.

       No extra cleaning time is deducted
       at the end of the opening hours.
    */

    const latestStart =
        closingMinutes - 15;

    for(
        let minutes = openingMinutes;
        minutes <= latestStart;
        minutes += 15
    ){

        let displayMinutes =
            minutes;

        /*
           Convert times after midnight:

           24:00 → 00:00
           24:15 → 00:15
           01:00 → 01:00
        */

        if(displayMinutes >= 24 * 60){

            displayMinutes -= 24 * 60;

        }

        const hours =
            Math.floor(displayMinutes / 60);

        const mins =
            displayMinutes % 60;

        const hourText =
            String(hours).padStart(2, "0");

        const minuteText =
            String(mins).padStart(2, "0");

        slots.push(
            `${hourText}:${minuteText}`
        );
    }

    return slots;
}

function getHourlyPrice(roomId, date, startTime){

    const prices =
        roomPrices[roomId];

    if(!prices){
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
       The hour's starting time
       determines the price.
    */

    const isBefore18 =
        hours < 18;


    if(isWeekend){

        return isBefore18
            ? prices.weekendBefore18
            : prices.weekendAfter18;

    }


    return isBefore18
        ? prices.weekdayBefore18
        : prices.weekdayAfter18;
}

/* =====================
   DEMO BOOKED TIMES
===================== */

function isBooked(roomId, time){

    /*
       This is ONLY temporary demo data.

       Later these values will come
       from the real booking database.
    */

    if(!selectedDate){

        return false;
    }


    const day =
        selectedDate.getDate();


    /*
       Different demo bookings for
       different rooms.
    */

    if(
        roomId === "gangnam" &&
        day % 3 === 0 &&
        (
            time === "18:00" ||
            time === "18:15" ||
            time === "18:30" ||
            time === "18:45"
        )
    ){

        return true;
    }


    if(
        roomId === "seoul" &&
        day % 4 === 0 &&
        (
            time === "16:00" ||
            time === "16:15" ||
            time === "16:30" ||
            time === "16:45"
        )
    ){

        return true;
    }


    if(
        roomId === "hongdae" &&
        day % 5 === 0 &&
        (
            time === "20:00" ||
            time === "20:15" ||
            time === "20:30" ||
            time === "20:45"
        )
    ){

        return true;
    }


    if(
        roomId === "itaewon" &&
        day % 6 === 0 &&
        (
            time === "14:00" ||
            time === "14:15" ||
            time === "14:30" ||
            time === "14:45"
        )
    ){

        return true;
    }


    return false;
}


/* =====================
   ROOMS
===================== */

function drawRooms(){

    if(!selectedDate){

        selectedDateTitle.textContent =
            "Select a date";

        roomsGrid.innerHTML = "";

        return;
    }


    const dateText =
        selectedDate.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );


    selectedDateTitle.textContent =
        dateText;


    roomsGrid.innerHTML = "";


    rooms.forEach(room => {

        const card =
            document.createElement("article");

        card.className =
            "room-card";

        card.dataset.roomId =
            room.id;


        card.innerHTML = `

            <img
                class="room-image"
                src="${room.image}"
                alt="${room.title}"
            >

            <div class="room-info">

                <h3>${room.title}</h3>

                <div class="room-meta">
                    ${room.size}
                </div>

                <div class="room-price">
                    ${room.price}
                </div>

            </div>

            <div class="time-slots">

                <div class="time-header">

                    <h4>
                        Available times
                    </h4>

                    <div class="selected-total">
                        Total €0
                    </div>

                </div>

                <div class="time-grid"></div>

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

            button.className =
                "time-slot";


            button.textContent =
                time;


            button.dataset.time =
                time;


            /*
               HINTA EI NÄY TÄSSÄ VAIHEESSA.
               Hinta lisätään vasta kun asiakas
               valitsee ajan.
            */


            /*
               Temporary booked state
            */

            if(isBooked(room.id, time)){

                button.classList.add("booked");

                button.textContent = "×";

                button.disabled = true;

            }


            /*
               Available time
            */

            else{

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

function updateRoomSelection(roomId){

    const roomCard =
        document.querySelector(
            `.room-card[data-room-id="${roomId}"]`
        );

    if(!roomCard || !selectedDate){
        return;
    }

    const timeButtons =
        Array.from(
            roomCard.querySelectorAll(".time-slot")
        );

    /*
       Poistetaan vanhat hinnat.
    */

    timeButtons.forEach(button => {

        const oldPrice =
            button.querySelector(".selected-price");

        if(oldPrice){
            oldPrice.remove();
        }

    });


    /*
       Haetaan valitut vartit siinä
       järjestyksessä kuin ne näkyvät.
    */

    const selectedButtons =
        timeButtons.filter(button =>
            button.classList.contains("selected")
        );


    let total = 0;


    /*
       Jokainen 4 vartin ryhmä = 1 tunti.

       Hinta määräytyy ensimmäisen
       vartin alkamisajan perusteella.
    */

    for(
        let i = 0;
        i < selectedButtons.length;
        i += 4
    ){

        const hourButtons =
            selectedButtons.slice(i, i + 4);

        if(hourButtons.length !== 4){
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

        total += price;


        /*
           Näytetään hinta vain tunnin
           ensimmäisessä vartissa.
        */

        const priceElement =
            document.createElement("small");

        priceElement.className =
            "selected-price";

        priceElement.textContent =
            `€${price}`;

        firstButton.appendChild(
            priceElement
        );
    }


    /*
       Päivitetään Total.
    */

    const totalElement =
        roomCard.querySelector(
            ".selected-total"
        );

    if(totalElement){

        totalElement.textContent =
            `Total €${total}`;

    }
}

/* =====================
   SELECT TIME
===================== */

function selectTime(room, time, button){

    const roomCard =
        button.closest(".room-card");

    const timeButtons =
        Array.from(
            roomCard.querySelectorAll(".time-slot")
        );

    const clickedIndex =
        timeButtons.indexOf(button);


    /*
       JOS KLIKATTU RUUTU ON JO VALITTU:

       Selvitetään mihin 1 tunnin
       eli neljän vartin ryhmään
       klikattu ruutu kuuluu.
    */

    if(button.classList.contains("selected")){

        const selectedButtons =
            timeButtons.filter(slot =>
                slot.classList.contains("selected")
            );

        const selectedIndex =
            selectedButtons.indexOf(button);

        const hourStartIndex =
            Math.floor(selectedIndex / 4) * 4;

        const hourToRemove =
            selectedButtons.slice(
                hourStartIndex,
                hourStartIndex + 4
            );

        hourToRemove.forEach(slot => {
            slot.classList.remove("selected");
        });

        updateRoomSelection(room.id);

        return;
    }


    /*
       KATSOTAAN NYKYINEN VALINTA
    */

    const selectedButtons =
        timeButtons.filter(slot =>
            slot.classList.contains("selected")
        );


    /*
       JOS MITÄÄN EI OLE VALITTU:

       valitaan klikatusta kohdasta
       seuraavat 4 varttia = 1 tunti.
    */

    if(selectedButtons.length === 0){

        const newHour =
            timeButtons.slice(
                clickedIndex,
                clickedIndex + 4
            );

        if(newHour.length !== 4){
            return;
        }

        if(
            newHour.some(slot =>
                slot.classList.contains("booked")
            )
        ){
            return;
        }

        newHour.forEach(slot => {
            slot.classList.add("selected");
        });

        updateRoomSelection(room.id);

        return;
    }


    /*
       LISÄTÄÄN TUNTI VARAUKSEN LOPPUUN
    */

    const lastSelected =
        selectedButtons[
            selectedButtons.length - 1
        ];

    const lastIndex =
        timeButtons.indexOf(lastSelected);

    if(clickedIndex === lastIndex + 1){

        const newHour =
            timeButtons.slice(
                clickedIndex,
                clickedIndex + 4
            );

        if(newHour.length !== 4){
            return;
        }

        if(
            newHour.some(slot =>
                slot.classList.contains("booked")
            )
        ){
            return;
        }

        newHour.forEach(slot => {
            slot.classList.add("selected");
        });

        updateRoomSelection(room.id);

        return;
    }


    /*
       LISÄTÄÄN TUNTI VARAUKSEN ALKUUN
    */

    const firstSelected =
        selectedButtons[0];

    const firstIndex =
        timeButtons.indexOf(firstSelected);

    if(clickedIndex === firstIndex - 1){

        const newStart =
            firstIndex - 4;

        if(newStart < 0){
            return;
        }

        const newHour =
            timeButtons.slice(
                newStart,
                firstIndex
            );

        if(newHour.length !== 4){
            return;
        }

        if(
            newHour.some(slot =>
                slot.classList.contains("booked")
            )
        ){
            return;
        }

        newHour.forEach(slot => {
            slot.classList.add("selected");
        });

        updateRoomSelection(room.id);

        return;
    }


    /*
       JOS KLIKATAAN JOTAKIN MUUTA AIKAA:

       poistetaan vanha valinta ja
       aloitetaan uusi tunti siitä kohdasta.
    */

    selectedButtons.forEach(slot => {
        slot.classList.remove("selected");
    });

    const newHour =
        timeButtons.slice(
            clickedIndex,
            clickedIndex + 4
        );

    if(newHour.length !== 4){

        updateRoomSelection(room.id);

        return;
    }

    if(
        newHour.some(slot =>
            slot.classList.contains("booked")
        )
    ){

        updateRoomSelection(room.id);

        return;
    }

    newHour.forEach(slot => {
        slot.classList.add("selected");
    });

    updateRoomSelection(room.id);
}

function selectOneHour(
    roomCard,
    startMinutes
){

    const timeButtons =
        roomCard.querySelectorAll(
            ".time-slot"
        );


    for(
        let minutes = startMinutes;
        minutes < startMinutes + 60;
        minutes += 15
    ){

        const slot =
            findTimeButton(
                timeButtons,
                minutes
            );

        if(!slot){
            return;
        }

        slot.classList.add("selected");
    }
}


function findTimeButton(
    buttons,
    minutes
){

    const hours =
        Math.floor(minutes / 60);

    const mins =
        minutes % 60;


    const time =
        `${String(hours).padStart(2,"0")}:${String(mins).padStart(2,"0")}`;


    return Array.from(buttons)
        .find(button =>
            button.dataset.time === time
        );
}

/* =====================
   INITIAL DRAW
===================== */

drawCalendar();

drawRooms();
