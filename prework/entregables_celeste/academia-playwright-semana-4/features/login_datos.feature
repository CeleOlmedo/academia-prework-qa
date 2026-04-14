Feature: Login con datos JSON y mensajes centralizados

  Scenario: Login válido usando users.json
    When inicio sesión con credenciales válidas desde datos
    Then accedo al inventario

  Scenario: Usuario bloqueado — mensaje desde constants/messages.js
    When inicio sesión con usuario bloqueado desde datos
    Then veo el mensaje de error de usuario bloqueado desde constantes
