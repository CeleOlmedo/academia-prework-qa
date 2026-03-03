# Dia 12 - Sintaxis Gherkin básica - Agustín Quintana y Celeste Olmedo

Feature: Inicio de sesión
  Como usuario registrado
  Quiero iniciar sesión en la plataforma
  Para acceder a mi cuenta y operar con mis datos de forma segura
 
  Scenario: Iniciar sesión con credenciales válidas
    Given el usuario tiene una cuenta existente y habilitada
    And no tiene sesión iniciada
    When ingresa credenciales válidas
    Then inicia sesión y accede al área principal
 
  Scenario: Intentar iniciar sesión con credenciales inválidas
    Given el usuario tiene una cuenta registrada
    And no tiene sesión iniciada
    When ingresa una contraseña incorrecta
    Then no inicia sesión y el sistema informa que la contresa es incorrecta
 
  Scenario: Intentar iniciar sesión con email vacío
    Given el usuario se encuentra en el proceso de inicio de sesión
    When deja el email vacío y confirma
    Then el sistema bloquea el intento e informa que el email es obligatorio
 
  Scenario: Intentar iniciar sesión con contraseña vacía
    Given el usuario se encuentra en el proceso de inicio de sesión
    When deja la contraseña vacía y confirma
    Then el sistema bloquea el intento e informa que la contraseña es obligatoria

