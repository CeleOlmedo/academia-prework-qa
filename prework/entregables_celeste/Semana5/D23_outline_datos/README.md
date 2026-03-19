# Día 23 - Scenario Outline y datos - Quintana Agustín y Olmedo Celeste

## Ejecución de pruebas

Las pruebas se ejecutaron correctamente sin presentar fallos relacionados a los selectores. No fue necesario realizar modificaciones ni ajustes, ya que todos los elementos fueron identificados de manera estable durante la ejecución.

## Selectores utilizados

Se utilizaron selectores priorizando legibilidad y robustez:

- **getByPlaceholder**
  Se utilizó para identificar campos de entrada a través del texto del placeholder.
  Ejemplo:
  - getByPlaceholder('Username')
  - getByPlaceholder('Password')

Este tipo de selector es claro y fácil de mantener, ya que se basa en atributos visibles para el usuario.

- **getByRole**
  Se empleó para interactuar con elementos según su rol accesible.
  Ejemplo:
  - getByRole('button', { name: 'Login' })
  - getByRole('heading', { name: errorText })

Este selector es altamente recomendado porque refleja cómo los usuarios perciben la interfaz, aumentando la estabilidad de las pruebas.

## Conclusión sobre los selectores

Los selectores elegidos son de alto nivel y están orientados a la accesibilidad, lo que permitió que las pruebas fueran estables.