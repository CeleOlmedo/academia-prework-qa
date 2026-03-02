# Día 8 - Buenos vs Malos Bug Reports - Celeste Olmedo

## **Ejemplo Malo 1**
**Título:** No anda el registro

**Descripción:** Intenté registrarme y no funciona

- No explica qué no funciona.
- No hay pasos para reproducir.
- No diferencia esperado vs actual.
- No indica ambiente ni navegador.
- No permite reproducir el problema.

## **Ejemplo Malo 2**

**Título:** Error

**Descripción:** Da error cuando pongo cosas raras

- No es específico.
- No incluye datos concretos.
- No hay evidencia.
- No indica severidad ni prioridad.
- Es imposible de investigar.

## **Ejemplo Bueno 1**

**Título:** El sistema permite registrarse con contraseña de 3 caracteres

**Severidad:** Alta
**Prioridad:** Urgente
**Ambiente:** Demo

**Browser/Dispositivo:** Chrome - Windows 11

**Pasos:**
1) Ir a Registro.
2) Ingresar contraseña “123”.
3) Completar resto de campos válidos.
4) Hacer clic en Registrarse.

**Resultado esperado:**
El sistema debería bloquear contraseñas menores a 6 caracteres

**Resultado actual:**
El sistema permite el registro exitoso

**Evidencia:** Captura de pantalla con el ingreso de la contraseña y la aceptación del sistema

- Título específico.
- Pasos claros y numerados.
- Diferencia esperado vs actual.
- Se puede reproducir fácilmente.
- Impacto claro.

## **Ejemplo Bueno 2**

**Título:** El mensaje “Email inválido” no aparece

**Severidad:** Media
**Prioridad:** Normal
**Ambiente:** Demo

**Browser/Dispositivo:** Chrome - Windows 11

**Pasos:**
1) Ingresar al formulario
2) Dentro del campo "Email", ingresar un email inválido (ej. hola.com).
3) Salir del campo.
4) Enviar el formulario.

**Resultado esperado:**
El mensaje debería mostrarse inmediatamente (validación en tiempo real).

**Resultado actual:**
El mensaje aparece solo después de enviar el formulario.

- Describe comportamiento exacto.
- Especifica contexto.
- Está bien redactado.

-------------------------------------------------------------------------------
# **10 Reglas de Oro para Escribir Buenos Bug Reports**

- El título debe describir el problema específico.
- Siempre incluir pasos numerados y reproducibles.
- Separar claramente resultado esperado y resultado actual.
- Indicar ambiente y navegador.
- Adjuntar evidencia (captura, video, logs).
- No usar términos ambiguos (“no anda”, “raro”, “algo falla”).
- Ser objetivo y no emocional.
- Incluir datos concretos (ejemplo exacto ingresado).
- Pensar en quien lo va a leer: debe poder reproducir sin preguntarte nada.
- Diferenciar severidad (impacto) de prioridad (urgencia de negocio).


