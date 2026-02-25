# Día 7 - Técnicas de diseño de pruebas - Celeste Olmedo

============================================
## Sección A - Clases de equivalencia
============================================

**Regla elegida:** "El nombre debe tener mínimo 3 y máximo 10 letras"

- Válida: Cadena de letras de longitud entre 3 y 10 caracteres.
- Inválida: Longitud menor a 3 caracteres.
- Inválida: Longitud mayor a 10 caracteres.
- Inválida: Cadena con números.
- Inválida: Cadena con caracteres especiales.
- Inválida: Cadena con espacios.

## Tabla casos representativos

| Caso | Dato          | Clase    | Resultado<br>Esperado             |
|------|---------------|----------|-----------------------------------|
| 1    | Celeste       | Válida   | Se acepta                         |
| 2    | Cel           | Válida   | Se acepta                         |
| 3    | Celesteeee    | Válida   | Se acepta                         |
| 4    | Ce            | Inválida | Error: mínimo<br>3 letras.        |
| 5    | Celesteeeee   | Inválida | Error: máximo<br>10 letras.       |
| 6    | C3l3st3       | Inválida | Error: solo se<br>admiten letras. |
| 7    | C@l#s%_       | Inválida | Error: solo se<br>admiten letras. |
| 8    | C e l e s t e | Inválida | Error: solo se<br>admiten letras. |


============================================
## Sección B - Valores límite
============================================

**Regla elegida:** "Edad permitida de 18 a 120 años"

| Caso | Dato  | Clase    | Resultado<br>Esperado           |
|------|-------|----------|---------------------------------|
| 1    | '17'  | Inválida | Error: edad mínima<br>18 años.  |
| 2    | '18'  | Válida   | Se acepta                       |
| 3    | '19'  | Válida   | Se acepta                       |
| 4    | '119' | Válida   | Se acepta                       |
| 5    | '120' | Válida   | Se acepta                       |
| 6    | '121' | Inválida | Error: edad máxima<br>120 años. |
| 7    | '50'  | Válida   | Se acepta                       |
| 8    | '100' | Válida   | Se acepta                       |

============================================
## Sección C - Tabla de decisión
============================================

**Regla elegida:** Una persona puede jubilarse si:
- Tiene más de 65 años.
- Tiene 30 años o más de aportes.

**Condiciones**
- *Condición 1:* Edad >= 65
- *Condición 2:* Aportes >= 30

**Tabla de decisión**
| N° | ¿Edad >= 65? | ¿Aportes >= 30? | Resultado |
|----|--------------|-----------------|-----------|
| C1 | Si           | Si              | Aceptado  |
| C2 | Si           | No              | Rechazado |
| C3 | No           | Si              | Rechazado |
| C4 | No           | No              | Rechazado |

**Casos resultantes**

| Caso | Edad | Aportes | Resultado    |
|------|------|---------|--------------|
| 1    | *64* | 35      | No se jubila |
| 2    | *65* | 40      | Se jubila    |
| 3    | *66* | 45      | Se jubila    |
| 4    | 67   | *31*    | Se jubila    |
| 5    | 68   | *30*    | Se jubila    |
| 6    | 69   | *29*    | No se jubila |

