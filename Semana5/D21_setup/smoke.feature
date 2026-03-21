Feature: Smoke 
    Scenario: Abrir una página y ver un texto 
    Given abro la pagina "https://the-internet.herokuapp.com/" 
    Then veo el texto "Welcome to the-internet" 