import { Given, When, Then } from "@cucumber/cucumber";
import axios from "axios";
import assert from "node:assert";

const BASE_URL = "https://restful-booker.herokuapp.com";

let token;
let bookingId;
let response;

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
    const res = await axios.post(`${BASE_URL}/auth`, {
        username: "admin",
        password: "password123"
    });

    assert.strictEqual(res.status, 200);
    assert.ok(res.data);
    assert.strictEqual(typeof res.data.token, "string");
    token = res.data.token;
});

// ➕ CREATE
When("creo un booking", async function () {
    response = await axios.post(`${BASE_URL}/booking`, {
        firstname: "Agustin",
        lastname: "Quintana",
        totalprice: 150,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2024-01-10"
        },
        additionalneeds: "Breakfast"
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
    const res = await axios.post(`${BASE_URL}/booking`, {
        firstname: "Test",
        lastname: "User",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-01-01",
            checkout: "2024-01-05"
        }
    });

    assert.strictEqual(res.status, 200);
    assert.ok(res.data.bookingid);
    bookingId = res.data.bookingid;

    const auth = await axios.post(`${BASE_URL}/auth`, {
        username: "admin",
        password: "password123"
    });

    assert.strictEqual(auth.status, 200);
    assert.strictEqual(typeof auth.data.token, "string");
    token = auth.data.token;
});

// ✏️ UPDATE
When("actualizo el booking", async function () {
    response = await axios.put(
        `${BASE_URL}/booking/${bookingId}`,
        {
            firstname: "Editado",
            lastname: "User",
            totalprice: 200,
            depositpaid: false,
            bookingdates: {
                checkin: "2024-02-01",
                checkout: "2024-02-10"
            }
        },
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );
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
    response = await axios.delete(
        `${BASE_URL}/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            }
        }
    );
});

Then("el booking se elimina correctamente", function () {
    assert.strictEqual(response.status, 201);
    assert.strictEqual(response.data, "Created");
});