Feature: Login SauceDemo (wording exacto con tilde en sesión)

  @audit
  Scenario: Login válido con usuario estándar
    Given que navego a la página de login de SauceDemo
    When inicio sesión con el usuario "standard_user" y la contraseña "secret_sauce"
    Then accedo al catálogo de productos
