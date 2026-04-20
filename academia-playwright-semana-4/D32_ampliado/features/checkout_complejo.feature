Feature: Checkout E2E — validación matemática del Item total

  Scenario: El Item total es la suma de los precios de los productos en carrito
    Given inicio sesión con usuario válido desde datos
    When agrego los productos "Sauce Labs Backpack" y "Sauce Labs Bike Light" al carrito
    And navego al carrito desde navbar
    And completo datos de envío "Juan", "Pérez", "5000"
    Then el total mostrado coincide con la suma de precios de los ítems
