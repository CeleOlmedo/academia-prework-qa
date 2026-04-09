# language: es

Característica: Checkout E2E con validación matemática de precios
  Como usuario de SauceDemo
  Quiero completar el proceso de compra con 2 productos
  Para verificar que el subtotal mostrado sea exactamente la suma de los precios individuales

  Background:
    Given estoy logueado en SauceDemo

  Escenario: El subtotal debe ser exactamente la suma de los productos seleccionados
    Cuando agrego "Sauce Labs Backpack" al carrito
    Y agrego "Sauce Labs Bike Light" al carrito
    Y navego al carrito
    Y presiono el botón de Checkout
    Y completo los datos de envío con nombre "Juan", apellido "Pérez" y zip "5000"
    Entonces el subtotal mostrado debe ser exactamente la suma de los precios de los productos
    Y el usuario completa la compra exitosamente
