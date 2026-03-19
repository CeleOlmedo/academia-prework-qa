Feature: Login negativo
  Como usuario de SauceDemo
  Quiero ver un mensaje de error cuando ingreso credenciales inválidas
  Para saber por qué no puedo iniciar sesión y corregir los datos

  Scenario Outline: Login con credenciales inválidas
    Given el usuario no está logueado
    And el usuario está en la página de login
    Given el usuario no está logueado
    And el usuario está en la página de login
    When ingresa username "<username>" y password "<password>"
    And hace click en login
    Then se muestra el mensaje de error "<error>"
 
    Examples:
      | username          | password       | error                                                                           |
      |                   | secret_sauce   | Epic sadface: Username is required                                              |
      | standard_user     |                | Epic sadface: Password is required                                              |
      | usuario_fake      | clave_fake     | Epic sadface: Username and password do not match any user in this service       |
      | locked_out_user   | secret_sauce   | Epic sadface: Sorry, this user has been locked out.                             |
      | standard_user     | wrong_pass     | Epic sadface: Username and password do not match any user in this service       |
