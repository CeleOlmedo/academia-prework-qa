Feature: Ordenar productos en SauceDemo

  Background:
    Given estoy logueado en SauceDemo como "standard_user" con clave "secret_sauce"

  Scenario: Ordenar por nombre de Z a A
    When ordeno los productos por "Name (Z to A)"
    Then el primer producto es "Test.allTheThings() T-Shirt (Red)"

  Scenario: Ordenar por precio de menor a mayor
    When ordeno los productos por "Price (low to high)"
    Then el primer precio es "$7.99"