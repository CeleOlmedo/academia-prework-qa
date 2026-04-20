import axios from "../../academia-playwright-semana-4/node_modules/axios/index.js";
import assert from "node:assert/strict";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

async function testGetPostById() {
  const response = await axios.get(`${BASE_URL}/1`);

  assert.equal(response.status, 200, "GET /posts/1 debe responder 200");
  assert.equal(typeof response.data, "object", "GET /posts/1 debe devolver objeto");
  assert.equal(typeof response.data.userId, "number", "userId debe ser number");
  assert.equal(typeof response.data.id, "number", "id debe ser number");
  assert.equal(typeof response.data.title, "string", "title debe ser string");
  assert.equal(typeof response.data.body, "string", "body debe ser string");
}

async function testPostPosts() {
  const payload = {
    title: "entrega d33",
    body: "prueba de creacion con axios",
    userId: 7,
  };

  const response = await axios.post(BASE_URL, payload, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  assert.equal(response.status, 201, "POST /posts debe responder 201");
  assert.equal(typeof response.data, "object", "La respuesta debe ser JSON objeto");
  assert.equal(typeof response.data.id, "number", "id creado debe ser number");
  assert.equal(response.data.title, payload.title, "title debe coincidir con request");
}

async function testPutPostById() {
  const payload = {
    id: 1,
    title: "post actualizado",
    body: "contenido actualizado",
    userId: 1,
  };

  const response = await axios.put(`${BASE_URL}/1`, payload, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  assert.equal(response.status, 200, "PUT /posts/1 debe responder 200");
  assert.equal(typeof response.data, "object", "PUT /posts/1 debe devolver objeto");
  assert.equal(typeof response.data.id, "number", "id actualizado debe ser number");
  assert.equal(response.data.id, payload.id, "id debe coincidir con request");
  assert.equal(response.data.title, payload.title, "title debe coincidir con request");
}

async function testDeletePostById() {
  const response = await axios.delete(`${BASE_URL}/1`);

  assert.equal(response.status, 200, "DELETE /posts/1 debe responder 200");
  assert.equal(typeof response.data, "object", "DELETE /posts/1 debe devolver objeto");
  assert.equal(
    Object.keys(response.data).length,
    0,
    "DELETE /posts/1 debe devolver objeto vacio"
  );
}

async function testGetInvalidEndpoint() {
  const response = await axios.get(`${BASE_URL}/invalido`, {
    validateStatus: () => true,
  });

  assert.equal(response.status, 404, "GET /posts/invalido debe responder 404");
}

async function runSmokeApiTests() {
  console.log("Iniciando smoke API (GET + POST + PUT + DELETE + ERROR) con Axios...");
  await testGetPostById();
  console.log("OK GET /posts/1");

  await testPostPosts();
  console.log("OK POST /posts");

  await testPutPostById();
  console.log("OK PUT /posts/1");

  await testDeletePostById();
  console.log("OK DELETE /posts/1");

  await testGetInvalidEndpoint();
  console.log("OK ERROR GET /posts/invalido (404)");

  console.log("Smoke API finalizado correctamente.");
}

runSmokeApiTests().catch((error) => {
  if (error.response) {
    console.error("Request fallo:", {
      status: error.response.status,
      data: error.response.data,
    });
  } else {
    console.error("Error inesperado:", error.message);
  }

  process.exitCode = 1;
});
