# Día 19 - Analizar tests y mejorar selectores - Celeste Olmedo

## Parte A: checklist de "selector robusto"

- Priorizar selectores con data-testid cuando existen, porque son estables y pensados para testing.
- Preferir getByRole() cuando el elemento tiene un rol accesible (button, textbox, link).
- Utilizar getByLabel() para inputs asociados a etiquetas visibles.
- Usar getByText() solo cuando el texto es estable y no cambia con frecuencia.
- Evitar usar clases CSS genéricas como .btn, .container, .row.
- Evitar usar índices o nth-child, porque la estructura del DOM puede cambiar.
- Evitar XPaths largos o absolutos que dependen de la estructura completa del DOM.
- Validar el selector en DevTools antes de usarlo en el test.
- Elegir selectores que representen cómo interactúa un usuario real con la interfaz.
- Preferir locators legibles y mantenibles para facilitar la comprensión del test.

## Ejemplos de selectores frágiles y alternativas robustas

1. Selector frágil: ".btn-primary:nth-child(2)"  
   - Problema: depende del orden y de una clase genérica que podría reutilizarse en otros botones.  
   - Alternativa robusta: "[data-testid=\"login-submit\"]" o "getByRole('button', { name: /iniciar sesión/i })".

2. Selector frágil: "#root > div > main > div:nth-child(3) > button"  
   - Problema: es un XPath/CSS muy específico a la estructura del DOM; cualquier cambio de contenedor lo rompe.  
   - Alternativa robusta: "getByRole('button', { name: /añadir al carrito/i })" o un "locator('[data-testid=\"add-to-cart\"]')".

3. Selector frágil: ".form input[type=\"text\"]:nth-child(1)"  
   - Problema: se apoya en la posición del input dentro del formulario.  
   - Alternativa robusta: "getByLabel('Email')" o "[data-testid=\"email-input\"]".

4. Selector frágil: ".nav-item.active a"  
   - Problema: depende de clases de estado ("active") que pueden cambiar según la implementación del CSS.  
   - Alternativa robusta: "getByRole('link', { name: /inicio/i })" o 
   "[data-testid=\"nav-home-link\"]".

5. Selector frágil: ".product-card .price"  
   - Problema: clases genéricas que podrían repetirse en otros componentes 
   (".product-card", ".price").  
   - Alternativa robusta: "[data-testid=\"product-price\"]" o 
   "getByRole('spinbutton', { name: /precio/i })" si es un input numérico.

