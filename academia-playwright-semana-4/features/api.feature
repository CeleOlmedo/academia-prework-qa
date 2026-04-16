Feature: API Booking CRUD

  Scenario: Autenticar y crear una reserva
    Given estoy autenticado
    When creo un booking
    Then el booking se crea correctamente

  Scenario: Actualizar una reserva existente
    Given existe un booking
    When actualizo el booking
    Then el booking se actualiza correctamente

  Scenario: Eliminar una reserva existente
    Given existe un booking
    When elimino el booking
    Then el booking se elimina correctamente