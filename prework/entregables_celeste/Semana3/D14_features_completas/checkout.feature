
Feature: Proceso de checkout
  Como usuario registrado
  Quiero finalizar la compra de los productos de mi carrito
  Para completar la adquisición de los productos seleccionados

  Background:
    Given el sistema de compras se encuentra disponible
    And existe un usuario registrado en el sistema
    And el usuario posee credenciales válidas
    And el usuario ha iniciado sesión en el sistema
    And el sistema dispone de un catálogo de productos disponibles
    And el usuario puede agregar productos al carrito de compras
    And el usuario posee al menos un producto agregado en el carrito
    And el sistema permite iniciar el proceso de checkout
    And el sistema permite ingresar datos para completar la compra
    And el sistema permite seleccionar un método de pago

  Scenario: Usuario inicia el proceso de checkout
    Given el usuario posee productos en el carrito de compras
    When el usuario decide iniciar el proceso de compra
    Then el sistema inicia el proceso de checkout
    And el sistema solicita los datos necesarios para completar la compra

  Scenario: Usuario completa los datos requeridos para la compra
    Given el usuario ha iniciado el proceso de checkout
    And el sistema solicita los datos de compra
    When el usuario ingresa la información requerida
    And el usuario confirma los datos ingresados
    Then el sistema valida la información proporcionada
    And el sistema permite continuar con el proceso de compra

  Scenario: Usuario confirma la compra de los productos
    Given el usuario ha completado los datos necesarios para la compra
    And el usuario ha seleccionado un método de pago válido
    When el usuario confirma la compra
    Then el sistema procesa la solicitud de compra
    And el sistema registra la orden de compra
    And el sistema informa al usuario que la compra fue realizada con éxito

  Scenario: Usuario intenta finalizar la compra con el carrito vacío
    Given el carrito de compras del usuario se encuentra vacío
    When el usuario intenta iniciar el proceso de checkout
    Then el sistema informa que no existen productos para comprar
    And el sistema impide continuar con el proceso de compra

  Scenario Outline: Usuario realiza el pago utilizando distintos métodos
    Given el usuario ha iniciado el proceso de checkout
    And el usuario ha completado los datos necesarios para la compra
    When el usuario selecciona el método de pago "<metodo_pago>"
    And el usuario confirma el pago
    Then el sistema procesa el pago utilizando el método seleccionado
    And el sistema confirma con un mensaje "<mensaje>" que el pago fue realizado correctamente

    Examples:
      | <metodo_pago>      | <mensaje>                                                 |
      | tarjeta de crédito | "Tu pago fue realizado correctamente"                     |
      | tarjeta de débito  | "Tu pago fue realizado correctamente"                     |
      | transferencia      | "Solo admitimos pagos con tarjeta o billeteras digitales" |
      | billetera digital  | "Tu pago fue realizado correctamente"                     |

