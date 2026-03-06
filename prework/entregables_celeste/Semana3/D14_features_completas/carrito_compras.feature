
Feature: Gestión del carrito de compras
  Como usuario registrado
  Quiero gestionar los productos de mi carrito de compras
  Para decidir qué productos comprar

  Background:
    Given el sistema de compras se encuentra disponible
    And existe un usuario registrado en el sistema
    And el usuario posee credenciales válidas
    And el usuario ha iniciado sesión en el sistema
    And el sistema dispone de un catálogo de productos disponibles
    And cada producto del catálogo posee nombre, precio y disponibilidad
    And el usuario puede agregar productos al carrito de compras
    And el carrito de compras se encuentra inicialmente vacío

  Scenario: Usuario agrega un producto al carrito de compras
    Given el usuario se encuentra visualizando el catálogo de productos
    And existe al menos un producto disponible para agregar al carrito
    When el usuario selecciona un producto del catálogo
    And el usuario agrega el producto al carrito de compras
    Then el sistema agrega el producto al carrito
    And el carrito de compras contiene el producto agregado

  Scenario: Usuario agrega varios productos al carrito
    Given el usuario se encuentra visualizando el catálogo de productos
    And existen varios productos disponibles en el catálogo
    When el usuario selecciona diferentes productos
    And el usuario agrega los productos al carrito de compras
    Then el sistema registra todos los productos agregados
    And el carrito muestra todos los productos seleccionados por el usuario

  Scenario: Usuario elimina un producto del carrito
    Given el usuario posee productos previamente agregados en el carrito
    And el carrito contiene más de un producto
    When el usuario decide eliminar uno de los productos del carrito
    Then el sistema elimina el producto seleccionado
    And el carrito muestra únicamente los productos restantes

  Scenario: Usuario visualiza los productos de su carrito
    Given el usuario posee productos agregados en el carrito
    When el usuario consulta el contenido del carrito de compras
    Then el sistema muestra la lista de productos agregados
    And el sistema muestra el precio correspondiente de cada producto

  Scenario: Usuario intenta eliminar un producto inexistente del carrito
    Given el usuario posee productos en el carrito
    And el producto que desea eliminar no se encuentra en el carrito
    When el usuario solicita eliminar dicho producto
    Then el sistema informa que el producto no se encuentra en el carrito
    And el contenido del carrito permanece sin modificaciones


