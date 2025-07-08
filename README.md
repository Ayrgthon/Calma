# CALMA: Tu Compañero de Bienestar Emocional

![Capibara Sensei](public/sensei-D.png)

**CALMA** es una aplicación web interactiva diseñada para ser un refugio digital y una herramienta proactiva para el autocuidado y la gestión de la salud emocional en el día a día.

## Índice
1. [El Problema: La Crisis Silenciosa de la Salud Mental](#el-problema-la-crisis-silenciosa-de-la-salud-mental)
2. [Nuestra Solución: CALMA](#nuestra-solución-calma)
3. [Disclaimer Importante](#disclaimer-importante)
4. [Características Principales](#características-principales)
5. [Arquitectura y Flujo de Información](#arquitectura-y-flujo-de-información)
    - [Diagrama de Flujo](#diagrama-de-flujo)
    - [Descripción del Pipeline de Datos](#descripción-del-pipeline-de-datos)
6. [Stack Tecnológico](#stack-tecnológico)
7. [Instalación y Uso](#instalación-y-uso)
8. [Fuentes y Referencias](#fuentes-y-referencias)
9. [Próximos Pasos](#próximos-pasos)

---

## El Problema: La Crisis Silenciosa de la Salud Mental

> ¿Alguna vez han sentido que sus emociones se desbordan y no saben cómo reaccionar? Según la Organización Mundial de la Salud, 1 de cada 7 jóvenes de entre 10 y 19 años sufre de un trastorno emocional. El suicidio es la tercera causa de defunción en las personas de 15 a 29 años. Y esto no es todo: es una situación que va en aumento. En Colombia, un alarmante 66,3 % de la población ha experimentado algún problema de salud mental en algún momento de su vida. Esta cifra, revelada por una encuesta del Ministerio de Salud y Protección Social, muestra una tendencia preocupante en la salud mental del país.

El estado actual de las posibles soluciones en la era digital presenta un gran desafío: la baja adherencia. Estudios sugieren que solo un pequeño porcentaje de usuarios utiliza las aplicaciones de salud mental de forma consistente. Un estudio encontró que el 49% de los usuarios las usaron durante 7 días o menos. La falta de motivación o la dificultad para incorporar la aplicación a la rutina diaria son barreras significativas. Las aplicaciones de salud mental deben ser diseñadas para ser fáciles de usar, atractivas y personalizadas.

## Nuestra Solución: CALMA

> Ante esta situación, proponemos la aplicación CALMA.
>
> CALMA es una app gamificada que propone cuidar un capibara como reflejo del autocuidado personal. Integra un diario emocional (journal) que permite al usuario monitorear su estado de ánimo durante el mes. Además, este journal permite la creación de tareas diarias personalizadas, cuyas rachas otorgan al usuario puntos y recompensas utilizables en la mascota, motivando su uso frecuente para personalizar al capibara virtual. También cuenta con Capybara Sensei, un chatbot ético de salud mental que ofrece acompañamiento y consejos para sobrellevar situaciones emocionalmente desafiantes.

## Disclaimer Importante

⚠️ **Esta aplicación no pretende reemplazar a los profesionales en salud.** La participación de psicólogos, psiquiatras y terapeutas es fundamental e irremplazable para tratar problemáticas de salud mental. CALMA se propone como una opción de acompañamiento emocional y fomento del autocuidado en la vida cotidiana.

## Características Principales

✨ **¿Qué hace especial a CALMA?**

*   **Journal Emocional Inteligente:** Escribe tus pensamientos y deja que nuestra IA analice el sentimiento para colorear tu calendario emocional.
*   **Retos Diarios Adaptativos:** Basado en tus entradas del diario, la aplicación te sugiere tareas personalizadas para ayudarte a gestionar tus emociones.
*   **Capybara Sensei:** Un chatbot conversacional (impulsado por un LLM) que te ofrece un espacio seguro para hablar, escuchar y recibir consejos basados en técnicas de bienestar.
*   **Gamificación Sutil:** El concepto de cuidar de tu mascota (el Capibara) a través de tu propio autocuidado (completando retos) crea un ciclo de motivación positivo.
*   **Interfaz Limpia y Reactiva:** Construida con tecnologías web modernas para una experiencia de usuario fluida y relajante.

---

## Arquitectura y Flujo de Información

La arquitectura de CALMA está diseñada para ser modular y eficiente, permitiendo una interacción fluida entre el frontend, una API mock para la persistencia de datos y un servicio externo de IA para el análisis de sentimientos.

### Diagrama de Flujo

```mermaid
graph TD
    A[Usuario - React App] -->|1. Crea entrada en diario| B[Vite Dev Server]
    B -->|2. Proxy /api-db/*| C[API Mock Express]
    C -->|3. Lee/Escribe| D[cache/usuarios.json]
    
    B -->|4. Proxy /api-model/*| E[Modelo Llama 3B]
    E -->|5. Devuelve emoción y tarea| B
    B -->|6. Respuesta al frontend| A
    
    A -->|7. Actualiza UI| A
    C -->|8. Persiste cambios| D

    style A fill:#e0f2fe,stroke:#0891b2,stroke-width:2px
    style E fill:#fef3c7,stroke:#f59e0b,stroke-width:2px
    style D fill:#e5e7eb,stroke:#6b7280,stroke-width:2px
```

### Descripción del Pipeline de Datos

El corazón de la funcionalidad de CALMA reside en el pipeline que se activa cuando un usuario crea una nueva entrada en su diario. Este proceso orquestado desde el frontend (`RetosDiarios.jsx`) es el siguiente:

1.  **Creación de la Nota:** El usuario escribe y guarda una nueva entrada en el diario.
2.  **Llamada a la API del Modelo:** Inmediatamente, el frontend toma el contenido de la nota y realiza una petición `POST` a `/api-model/api`. Gracias al proxy de Vite, esta petición es redirigida al servidor del modelo de IA (`Llama 3B Instruct`) que corre en `localhost:5000`.
3.  **Análisis y Respuesta de la IA:** El modelo `Llama 3B Instruct` procesa el texto y devuelve un objeto JSON que contiene dos partes clave:
    *   `sentimiento_detectado`: Con la emoción (`Feliz`, `Ansioso`, etc.) y una explicación.
    *   `tarea_sugerida`: Con el nombre, descripción y justificación de una tarea de bienestar personalizada.
4.  **Actualización Atómica de la Base de Datos:** Una vez que el frontend recibe la respuesta de la IA, prepara un único objeto con toda la información nueva y actualizada:
    *   La lista de `entradasDiario` con la nueva nota añadida.
    *   El objeto `calendarioEmocional` actualizado con la emoción del día.
    *   La lista de `tareas` con la nueva tarea sugerida.
5.  **Persistencia de Datos:** El frontend envía este objeto completo en una petición `PUT` a `/api-db/usuarios/:id`. El proxy de Vite redirige esta llamada a la API Mock de Node.js/Express, que sobrescribe el archivo `cache/usuarios.json` con los nuevos datos.
6.  **Actualización de la UI:** Simultáneamente, el estado de React se actualiza, reflejando instantáneamente la nueva nota, la nueva tarea y el color actualizado en el calendario, todo sin necesidad de recargar la página.

---

## Stack Tecnológico

A diferencia de la propuesta inicial, el stack actual de la aplicación se basa en un ecosistema de JavaScript moderno:

*   **Frontend:**
    *   **React (con Vite):** Un framework de UI rápido y potente para construir la interfaz de usuario.
    *   **Tailwind CSS:** Un framework de CSS "utility-first" para un diseño rápido y consistente.
    *   **Framer Motion:** Para las animaciones fluidas y declarativas de la interfaz.

*   **Backend (Simulado):**
    *   **Node.js & Express.js:** Se utiliza para crear una API RESTful mock que simula un backend real. Gestiona la lectura y escritura de datos del usuario.
    *   **Vite Proxy Server:** Una herramienta clave en el desarrollo que redirige las llamadas a la API desde el cliente a los servidores correspondientes (la API mock y la API del modelo), evitando problemas de CORS y simplificando la configuración para el acceso en red local.

*   **Base de Datos (Simulada):**
    *   **Archivo JSON (`cache/usuarios.json`):** Actúa como una base de datos NoSQL simple y local para la persistencia de los datos del usuario durante el desarrollo.

*   **Inteligencia Artificial:**
    *   **Llama 3B Instruct:** Un Large Language Model (LLM) que se consume a través de una API externa (corriendo en `localhost:5000`) para realizar el análisis de sentimiento y la generación de tareas sugeridas.

---

## Instalación y Uso

Para ejecutar este proyecto en un entorno de desarrollo local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone https://...
    cd Calma
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecuta los servidores:**
    *   **IMPORTANTE:** Asegúrate de que la API del modelo **Llama 3B Instruct** esté corriendo en `http://localhost:5000`.
    *   Usa el siguiente comando para iniciar simultáneamente la API mock y el servidor de desarrollo de Vite:
    ```bash
    npm start
    ```

4.  **Accede a la aplicación:**
    *   Abre tu navegador y ve a `http://localhost:5173`.

5.  **Para acceso en red local (desde otro dispositivo):**
    *   Usa el comando:
    ```bash
    npm run start:host
    ```
    *   Accede a la aplicación usando la dirección de red que proporciona Vite en la terminal.

## Fuentes y Referencias

*   [66,3% de colombianos declara haber enfrentado algún problema de salud mental](https://www.minsalud.gov.co/Paginas/66-porciento-de-colombianos-declara-haber-enfrentado-algun-problema-de-salud-mental.aspx)
*   [Salud mental del adolescente (OMS)](https://www.who.int/es/news-room/fact-sheets/detail/adolescent-mental-health)
*   [User Engagement in Mental Health Apps: A Review of Reviews](https://pmc.ncbi.nlm.nih.gov/articles/PMC9409797/)
*   [La salud mental en la Unión Europea](https://www.mhe-sme.org/wp-content/uploads/2023/04/LASALU2.pdf)

## Próximos Pasos

🎯 El futuro de CALMA incluye la integración con *wearables* para obtener datos biométricos que enriquezcan el análisis emocional y el lanzamiento de un *marketplace* de bienestar con más contenido y herramientas personalizadas.
