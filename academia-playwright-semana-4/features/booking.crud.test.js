import axios from "axios";
import assert from "node:assert";

const BASE_URL = "https://restful-booker.herokuapp.com";

let token = "";
let bookingId = "";

function assertBookingShape(booking) {
    assert.ok(booking);
    assert.strictEqual(typeof booking.firstname, "string");
    assert.strictEqual(typeof booking.lastname, "string");
    assert.strictEqual(typeof booking.totalprice, "number");
    assert.strictEqual(typeof booking.depositpaid, "boolean");
    assert.ok(booking.bookingdates);
    assert.strictEqual(typeof booking.bookingdates.checkin, "string");
    assert.strictEqual(typeof booking.bookingdates.checkout, "string");
}

async function getToken() {
    const response = await axios.post(
        `${BASE_URL}/auth`,
        {
            username: "admin",
            password: "password123"
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    assert.strictEqual(typeof response.data.token, "string");
    token = response.data.token;

    console.log("TOKEN:", token);
}

async function createBooking() {
    const response = await axios.post(
        `${BASE_URL}/booking`,
        {
            firstname: "Agustin",
            lastname: "Quintana",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2026-04-16",
                checkout: "2026-04-20"
            },
            additionalneeds: "Breakfast"
        },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    assert.strictEqual(response.status, 200);
    assert.ok(response.data.bookingid);
    assert.ok(response.data.booking);
    assertBookingShape(response.data.booking);
    assert.strictEqual(response.data.booking.firstname, "Agustin");
    assert.strictEqual(response.data.booking.lastname, "Quintana");

    bookingId = response.data.bookingid;

    console.log("BOOKING ID:", bookingId);
}

async function getBooking() {
    const response = await axios.get(`${BASE_URL}/booking/${bookingId}`);

    assert.strictEqual(response.status, 200);
    assertBookingShape(response.data);
    assert.strictEqual(response.data.firstname, "Agustin");
    assert.strictEqual(response.data.lastname, "Quintana");
    assert.strictEqual(response.data.bookingdates.checkin, "2026-04-16");
}

async function updateBooking() {
    const response = await axios.put(
        `${BASE_URL}/booking/${bookingId}`,
        {
            firstname: "AgustinEditado",
            lastname: "Quintana",
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: "2024-02-01",
                checkout: "2024-02-10"
            },
            additionalneeds: "Lunch"
        },
        {
            headers: {
                "Content-Type": "application/json",
                "Cookie": `token=${token}`
            }
        }
    );

    assert.strictEqual(response.status, 200);
    assertBookingShape(response.data);
    assert.strictEqual(response.data.firstname, "AgustinEditado");
    assert.strictEqual(response.data.lastname, "Quintana");
    assert.strictEqual(response.data.bookingdates.checkout, "2024-02-10");
}

async function deleteBooking() {
    const response = await axios.delete(
        `${BASE_URL}/booking/${bookingId}`,
        {
            headers: {
                "Cookie": `token=${token}`
            }
        }
    );

    assert.strictEqual(response.status, 201);
}

(async () => {
    try {
        await getToken();
        await createBooking();
        await getBooking();
        await updateBooking();
        await deleteBooking();

        console.log("CRUD COMPLETO OK");
    } catch (error) {
        console.error("STATUS:", error.response?.status);
        console.error("DATA:", error.response?.data);
        console.error("ERROR:", error.message);
    }
})();