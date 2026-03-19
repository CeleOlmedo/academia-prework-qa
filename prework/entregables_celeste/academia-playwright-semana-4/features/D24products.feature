Feature: Ordenamiento de productos
  Como usuario de SauceDemo
  Quiero ordenar productos
  Para verificar que el orden sea correcto

  Background:
    Given estoy logueado en SauceDemo "https://www.saucedemo.com/"

  Scenario: Ordenar productos por precio de menor a mayor
    When selecciona ordenar por precio de menor a mayor
    Then los productos se muestran ordenados por precio ascendente

  Scenario: Ordenar productos por precio de mayor a menor
    When selecciona ordenar por precio de mayor a menor
    Then los productos se muestran ordenados por precio descendente

  Scenario: Ordenar productos alfabéticamente A-Z
    When selecciona ordenar por nombre A-Z
    Then los productos se muestran en orden alfabético ascendente

  Scenario: Ordenar productos alfabéticamente Z-A
    When selecciona ordenar por nombre Z-A
    Then los productos se muestran en orden alfabético descendente
 