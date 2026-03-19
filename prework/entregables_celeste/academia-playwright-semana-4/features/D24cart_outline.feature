Feature: Carrito de compras
  Como usuario de SauceDemo
  Quiero agregar distintos productos al carrito
  Para verificar que el carrito muestra correctamente el producto y su precio

  Background:
    Given estoy logueado en SauceDemo "https://www.saucedemo.com/"
    
  Scenario Outline: Agregar un producto al carrito con su precio
    When agrego el producto "<producto>" al carrito
    Then el carrito muestra el producto "<producto>" con su precio "<precio>"
    Examples:
      | producto                         | precio |
      | Sauce Labs Backpack              | 29.99  |
      | Sauce Labs Bike Light            | 9.99   |
      | Sauce Labs Bolt T-Shirt          | 15.99  |
      | Sauce Labs Fleece Jacket         | 49.99  |
      | Sauce Labs Onesie                | 7.99   |