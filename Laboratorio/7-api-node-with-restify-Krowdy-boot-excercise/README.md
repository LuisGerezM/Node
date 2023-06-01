# Entregable Node: Bootcamp Krowdy

### Especificaciones:

    * Usar restify.
    * Usar ffmpeg, que es un conjunto de librerías y utilidades de código abierto para manipular videos.
    * Usar spawn para la comunicación con el OS.
    * Se tienen dos videos, uno con extension .mp4 y otro .webm. Los mismos se encuentran en una carpeta llamada "files".
    * Se debe crear 3 endpoints.
        - Uno para convertir de .mp4 a .webm.
        - Otro para convertir de .webm a .mp4.
        - Un tercero para mantener el formato original, pero se debe eliminar el sonido del mismo.
    * Los nuevos videos generados se almacenan en una carpeta "files-copy".
    * Se debe tener en cuenta los 3 primeros puntos de la metodología para construir aplicaciones SaaS "Twelve Factor":
        - Código base.
        - Dependencias.
        - Configuraciones.

## <u>**`Realizado`**</u>

#### <span style="color:skyblue">**Para probarlo:** </span>

    1. Cloná el proyecto.
    2. Instalá las dependencias. (npm o pnpm install)
    3. Creá un archivo .env en root, copia y pegá lo siguiente:
        # dev
        SERVER_PORT=5000
        TYPE_ENVIRONMENT=dev
    4- Ejecutá el script "dev", npm o pnpm dev.
    5- El SV se montará en localhost:5000.

### <span style="color:orange">Endpoints:</span>

<span style="color:orange">get convertFromWebmToMp4:</span>

    http://localhost:5000/v1/api/convert-webm-mp4/video1.webm

    response:
    {
        "status": "success",
        "message": "",
        "name": "new-video1.mp4",
        "codeMessage": "0",
        "outputFilePath": "ROOT_DIR/src/files-copy/new-video1.mp4"
    }

<span style="color:orange">get convertFromMp4ToWebm:</span>

    http://localhost:5000/v1/api/convert-mp4-webm/video2.mp4

    {
        "status": "success",
        "message": "",
        "name": "new-video2.webm",
        "codeMessage": "0",
        "outputFilePath": "ROOT_DIR/src/files-copy/new-video2.webm"
    }

<span style="color:orange">get videoWithoutSound:</span>

    http://localhost:5000/v1/api/video-without-sound/video2.mp4

    {
        "status": "success",
        "message": "",
        "name": "without-sound-video2.mp4",
        "codeMessage": 0,
        "outputFilePath": "ROOT_DIR/src/files-copy/without-sound-video2.mp4"
    }

    http://localhost:5000/v1/api/video-without-sound/video1.webm

    {
        "status": "success",
        "message": "",
        "name": "without-sound-video1.webm",
        "codeMessage": 0,
        "outputFilePath": "ROOT_DIR/src/files-copy/without-sound-video1.webm"
    }
