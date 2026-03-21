Feature: Carrito de compras

  Background:
    Given estoy logueado en SauceDemo como "standard_user" con clave "secret_sauce"

  Scenario Outline: Agregar un producto al carrito
    When agrego el producto "<producto>" al carrito
    Then el carrito muestra el producto "<producto>" con su precio "<precio>"

    Examples:
      | producto              | precio |
      | Sauce Labs Backpack   | 29.99  |
      | Sauce Labs Bike Light | 9.99   |