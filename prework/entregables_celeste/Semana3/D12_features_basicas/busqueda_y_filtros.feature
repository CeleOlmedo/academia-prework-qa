# Dia 12 - Sintaxis Gherkin básica - Agustín Quintana y Celeste Olmedo

Feature: Búsqueda y filtrado de productos
  Como usuario del sistema
  Quiero buscar y filtrar productos
  Para encontrar fácilmente lo que quiero comprar
 
  Scenario: Buscar un producto existente
    Given existen productos disponibles en el catálogo
    When el usuario busca un producto por nombre válido
    Then el sistema muestra resultados relacionados con la búsqueda
 
  Scenario: Buscar un producto inexistente
    Given existen productos disponibles en el catálogo
    When el usuario busca un producto que no existe
    Then el sistema informa que no se encontraron resultados
 
  Scenario: Aplicar un filtro por categoría
    Given el usuario está visualizando el catálogo
    When aplica un filtro por una categoría específica
    Then el sistema muestra únicamente productos de esa categoría
 
  Scenario: Intentar buscar con criterio vacío
    Given el usuario se encuentra en el proceso de búsqueda
    When intenta buscar sin ingresar ningún criterio
    Then el sistema solicita ingresar un criterio de búsqueda


