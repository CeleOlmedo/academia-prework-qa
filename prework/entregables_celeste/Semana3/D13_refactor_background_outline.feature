# Día 13 - Background, Scenario Outline y Examples - Agustin Quintana y Celeste Olmedo

#Parte A: Background
Feature: Inicio de sesión
  Como usuario registrado
  Quiero iniciar sesión en la plataforma
  Para acceder a mi cuenta y operar con mis datos de forma segura
 
  Background:
    Given existe un usuario registrado con email "juan@gmail.com" y contraseña "Clave123"
    And la cuenta se encuentra habilitada
    And el usuario no tiene sesión iniciada
    And el sistema se encuentra disponible
    And el usuario tiene acceso al sistema
    And el usuario no deja campos vacíos

#Parte B: Scenario Outline + Examples 
  Scenario: Iniciar sesión con credenciales válidas
    When el usuario ingresa el email "juan@gmail.com" y la contraseña "Clave123"
    Then el sistema permite el acceso al área principal
    And el sistema muestra el mensaje "Bienvenido Juan"
 
  Scenario Outline: Intentar iniciar sesión con credenciales inválidas
    When el usuario ingresa el email "<email>" y la contraseña "<contraseña>"
    Then el sistema no permite el acceso
    And muestra el mensaje "<mensaje>"
 
 Examples:
    | email                        | contraseña   | mensaje                           |
    | juan@gmail.com               | Clave999     | Credenciales inválidas            |
    | a@mail.com                   | Clave123     | Credenciales inválidas            |
    |                              | Clave123     | El email es obligatorio           |
    | juan@gmail.com               |              | La contraseña es obligatoria      |
    | $$$@mail.com                 | Clave123     | Ingrese un email válido           |
 
# Notas:
# - Se eliminaron 6 precondiciones repetidas usando Background.
# - Se unificaron 5 escenarios negativos en un solo Scenario Outline.
# - Ahora los datos son concretos (email y contraseña reales).
# - Los resultados son verificables (mensaje exacto mostrado).


