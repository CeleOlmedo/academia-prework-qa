Feature: Checkout E2E con validación matemática de precios
  Como usuario de SauceDemo
  Quiero completar el proceso de compra con 2 productos
  Para verificar que el subtotal mostrado sea exactamente la suma de los precios individuales

  Background:
    Given estoy logueado en SauceDemo

  Scenario: El subtotal debe ser exactamente la suma de los productos seleccionados
    When agrego "Sauce Labs Backpack" al carrito
    And agrego "Sauce Labs Bike Light" al carrito
    And navego al carrito
    And presiono el botón de Checkout
    And completo los datos de envío con nombre "Juan", apellido "Pérez" y zip "5000"
    Then el subtotal mostrado debe ser exactamente la suma de los precios de los productos
    And el usuario completa la compra exitosamente
