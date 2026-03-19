Feature: Login
  Como usuario de SauceDemo
  Quiero iniciar sesión en la aplicación
  Para acceder al catálogo de productos si mis credenciales son válidas
 
  Background:
    Given tengo conexión estable a internet y un navegador funcional
    And no tengo una sesión iniciada
    And estoy en la pantalla de login de SauceDemo "https://www.saucedemo.com/"
    And el formulario de login es visible
 
  Scenario: Login válido
    Given existe el usuario "standard_user"
    And su password es "secret_sauce"
    And el usuario está habilitado para iniciar sesión
    When inicio sesion con usuario "standard_user" y password "secret_sauce"
    Then veo la pagina de productos
    And se muestra el listado de productos
 
  Scenario: Login inválido por bloqueo
    Given existe el usuario "locked_out_user"
    And su password es "secret_sauce"
    And el usuario está bloqueado para iniciar sesión
    When inicio sesion con usuario "locked_out_user" y password "secret_sauce"
    Then veo un mensaje de error de login "Epic sadface: Sorry, this user has been locked out."
    And continúo en la pantalla de login
    And no se crea una sesión válida