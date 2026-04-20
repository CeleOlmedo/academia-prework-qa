import { Given, When, Then } from "@cucumber/cucumber";
import axios from "axios";
import assert from "node:assert";

const BASE_URL = "https://restful-booker.herokuapp.com";
const DEFAULT_HEADERS = {
    Accept: "application/json",
    "User-Agent": "Mozilla/5.0 (API-Test)"
};

let token;
let bookingId;
let response;
let seedBookingFirstName;
let seedBookingLastName;
let seedBookingCheckin;
let seedBookingCheckout;

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

// 🔐 AUTH
Given("estoy autenticado", async function () {
    const res = await requestWithRetry({
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

    assert.strictEqual(res.status, 200);
    assert.ok(res.data);
    assert.strictEqual(typeof res.data.token, "string");
    token = res.data.token;
});

// ➕ CREATE
When("creo un booking", async function () {
    response = await requestWithRetry({
        method: "post",
        url: `${BASE_URL}/booking`,
        data: {
            firstname: "Agustin",
            lastname: "Quintana",
            totalprice: 150,
            depositpaid: true,
            bookingdates: {
                checkin: "2024-01-01",
                checkout: "2024-01-10"
            },
            additionalneeds: "Breakfast"
        },
        headers: {
            ...DEFAULT_HEADERS,
            "Content-Type": "application/json"
        }
    });

    bookingId = response.data.bookingid;
});

Then("el booking se crea correctamente", function () {
    assert.strictEqual(response.status, 200);
    assert.ok(bookingId);
    assert.ok(response.data.booking);
    assertBookingShape(response.data.booking);
    assert.strictEqual(response.data.booking.firstname, "Agustin");
    assert.strictEqual(response.data.booking.lastname, "Quintana");
});

// 📌 EXISTE BOOKING
Given("existe un booking", async function () {
    seedBookingFirstName = "Test";
    seedBookingLastName = "User";
    seedBookingCheckin = "2024-01-01";
    seedBookingCheckout = "2024-01-05";

    const res = await requestWithRetry({
        method: "post",
        url: `${BASE_URL}/booking`,
        data: {
            firstname: seedBookingFirstName,
            lastname: seedBookingLastName,
            totalprice: 100,
            depositpaid: true,
            bookingdates: {
                checkin: seedBookingCheckin,
                checkout: seedBookingCheckout
            }
        },
        headers: {
            ...DEFAULT_HEADERS,
            "Content-Type": "application/json"
        }
    });

    assert.strictEqual(res.status, 200);
    assert.ok(res.data.bookingid);
    bookingId = res.data.bookingid;

    const auth = await requestWithRetry({
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

    assert.strictEqual(auth.status, 200);
    assert.strictEqual(typeof auth.data.token, "string");
    token = auth.data.token;
});

// 🔍 READ
When("consulto el booking", async function () {
    response = await requestWithRetry({
        method: "get",
        url: `${BASE_URL}/booking/${bookingId}`,
        headers: {
            ...DEFAULT_HEADERS
        }
    });
});

Then("el booking se obtiene correctamente", function () {
    assert.strictEqual(response.status, 200);
    assertBookingShape(response.data);
    assert.strictEqual(response.data.firstname, seedBookingFirstName);
    assert.strictEqual(response.data.lastname, seedBookingLastName);
    assert.strictEqual(response.data.bookingdates.checkin, seedBookingCheckin);
    assert.strictEqual(response.data.bookingdates.checkout, seedBookingCheckout);
});

// ✏️ UPDATE
When("actualizo el booking", async function () {
    response = await requestWithRetry({
        method: "put",
        url: `${BASE_URL}/booking/${bookingId}`,
        data: {
            firstname: "Editado",
            lastname: "User",
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: "2024-02-01",
                checkout: "2024-02-10"
            }
        },
        headers: {
            ...DEFAULT_HEADERS,
            "Content-Type": "application/json",
            Cookie: `token=${token}`
        }
    });
});

Then("el booking se actualiza correctamente", function () {
    assert.strictEqual(response.status, 200);
    assertBookingShape(response.data);
    assert.strictEqual(response.data.firstname, "Editado");
    assert.strictEqual(response.data.lastname, "User");
    assert.strictEqual(response.data.bookingdates.checkout, "2024-02-10");
});

// ❌ DELETE
When("elimino el booking", async function () {
    response = await requestWithRetry({
        method: "delete",
        url: `${BASE_URL}/booking/${bookingId}`,
        headers: {
            ...DEFAULT_HEADERS,
            Cookie: `token=${token}`
        }
    });
});

Then("el booking se elimina correctamente", function () {
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.data, "Created");
});