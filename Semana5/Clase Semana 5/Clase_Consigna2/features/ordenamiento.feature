Feature: Ordenar productos en SauceDemo

  Background:
    Given el usuario está logueado en SauceDemo

  Scenario: Ordenar por nombre de Z a A
    When el usuario ordena los productos por "Name (Z to A)"
    Then el primer producto visible es "Test.allTheThings() T-Shirt (Red)"

  Scenario: Ordenar por precio de menor a mayor
    When el usuario ordena los productos por "Price (low to high)"
    Then el primer producto visible es "Sauce Labs Onesie"
    And el primer precio visible es "$7.99"