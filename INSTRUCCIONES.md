# Instrucciones de Uso - App Calma

## Iniciar la aplicación

Para ejecutar la aplicación con persistencia de datos:

```bash
npm start
```

Esto iniciará:
- Servidor API Mock en http://localhost:3001
- Aplicación React en http://localhost:5173

## Verificar que funciona correctamente

1. **Al iniciar la app**, deberías ver:
   - 3 tareas en "Retos Diarios"
   - 3 hábitos con sus contadores
   - 1 entrada en el diario
   - Historial de chat con mensajes previos

2. **Para probar la persistencia**:
   - Crea un nuevo hábito
   - Marca una tarea como completada
   - Añade una entrada al diario
   - Envía un mensaje al chatbot
   - Recarga la página (F5)
   - **Todos los cambios deben persistir**

## Estructura de datos

Los datos se guardan en `cache/usuarios.json`:
- ID de usuario: 1129504032
- Nombre: Ayrgthon Soraca

## Solución de problemas

Si los datos no se guardan:
1. Verifica que el servidor esté corriendo en puerto 3001
2. Revisa la consola del navegador para errores
3. Asegúrate de que `cache/usuarios.json` existe y tiene la estructura correcta

## Notas importantes

- El servidor API debe estar corriendo para que funcione la persistencia
- Los cambios se guardan automáticamente al realizar cualquier acción
- El archivo `cache/usuarios.json` actúa como base de datos local 