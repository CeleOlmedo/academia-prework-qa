Feature: Login

  Background:
    Given que navego a la página "https://www.saucedemo.com/"   

  Scenario: Login válido
    When inicio sesión con el usuario "standard_user" y la contraseña "secret_sauce"
    Then accedo al catálogo de productos
    And veo el listado de productos

  Scenario: Usuario bloqueado
    When inicio sesión con el usuario "locked_out_user" y la contraseña "secret_sauce"
    Then veo el mensaje de error "Epic sadface: Sorry, this user has been locked out."
    And permanezco en la pantalla de login