Feature: Login
  Como usuario de SauceDemo
  Quiero iniciar sesión en la aplicación
  Para acceder al catálogo de productos si mis credenciales son válidas
 
  Background:
    And estoy en la pantalla de login de SauceDemo "https://www.saucedemo.com/"
    And el formulario de login es visible
 
  Scenario: Login válido
    When inicio sesion con usuario "standard_user" y password "secret_sauce"
    Then veo la pagina de productos
    And se muestra el listado de productos
 
  Scenario Outline: Login con credenciales inválidas
    When el usuario intenta ingresar con las credenciales username "<username>" y password "<password>" al sistema
    Then se muestra el mensaje de error "<error>"
 
    Examples:
      | username          | password       | error                                                                           |
      |                   | secret_sauce   | Epic sadface: Username is required                                              |
      | standard_user     |                | Epic sadface: Password is required                                              |
      | usuario_fake      | clave_fake     | Epic sadface: Username and password do not match any user in this service       |
      | locked_out_user   | secret_sauce   | Epic sadface: Sorry, this user has been locked out.                             |
      | standard_user     | wrong_pass     | Epic sadface: Username and password do not match any user in this service       |
