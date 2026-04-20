import axios from "axios";
import assert from "node:assert";

const BASE_URL = "https://restful-booker.herokuapp.com";
const DEFAULT_HEADERS = {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (API-Test)"
};

let token = "";
let bookingId = "";

async function delay(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

async function requestWithRetry(config, retries = 2) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
            return await axios(config);
        } catch (error) {
            lastError = error;
            const status = error.response?.status;
            const canRetry = status === 418 && attempt < retries;

            if (!canRetry) {
                throw error;
            }

            await delay(500 * (attempt + 1));
        }
    }

    throw lastError;
}

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
    const response = await requestWithRetry({
        method: "post",
        url: `${BASE_URL}/auth`,
        data: {
            username: "admin",
            password: "password123"
        },
        headers: {
            ...DEFAULT_HEADERS,
            "Content-Type": "application/json"
        }
    });

    assert.strictEqual(response.status, 200);
    assert.ok(response.data);
    assert.strictEqual(typeof response.data.token, "string");
    token = response.data.token;

    console.log("TOKEN:", token);
}

async function createBooking() {
    const response = await requestWithRetry({
        method: "post",
        url: `${BASE_URL}/booking`,
        data: {
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
        headers: {
            ...DEFAULT_HEADERS,
            "Content-Type": "application/json"
        }
    });

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
    const response = await requestWithRetry({
        method: "get",
        url: `${BASE_URL}/booking/${bookingId}`,
        headers: {
            ...DEFAULT_HEADERS
        }
    });

    assert.strictEqual(response.status, 200);
    assertBookingShape(response.data);
    assert.strictEqual(response.data.firstname, "Agustin");
    assert.strictEqual(response.data.lastname, "Quintana");
    assert.strictEqual(response.data.bookingdates.checkin, "2026-04-16");
}

async function updateBooking() {
    const response = await requestWithRetry({
        method: "put",
        url: `${BASE_URL}/booking/${bookingId}`,
        data: {
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
        headers: {
            ...DEFAULT_HEADERS,
            "Content-Type": "application/json",
            "Cookie": `token=${token}`
        }
    });

    assert.strictEqual(response.status, 200);
    assertBookingShape(response.data);
    assert.strictEqual(response.data.firstname, "AgustinEditado");
    assert.strictEqual(response.data.lastname, "Quintana");
    assert.strictEqual(response.data.bookingdates.checkout, "2024-02-10");
}

async function deleteBooking() {
    const response = await requestWithRetry({
        method: "delete",
        url: `${BASE_URL}/booking/${bookingId}`,
        headers: {
            ...DEFAULT_HEADERS,
            "Cookie": `token=${token}`
        }
    });

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
        process.exit(1);
    }
})();