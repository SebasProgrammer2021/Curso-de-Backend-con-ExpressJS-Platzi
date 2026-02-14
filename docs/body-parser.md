# Uso de body-parser en Express

A partir de Express v4.16.0, ya no es necesario instalar el paquete body-parser para manejar JSON o formularios (urlencoded). Express ya incluye internamente los métodos `express.json()` y `express.urlencoded()` que cumplen la misma función. Esto simplifica el código y reduce dependencias externas. Solo usa body-parser si necesitas algo muy específico.

Ejemplo moderno recomendado:

```js
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

