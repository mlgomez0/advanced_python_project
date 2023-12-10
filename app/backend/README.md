# Similarity service

This project was create to allow TramiteX and ProcesoX compare sentences and notify users to avoid process several times the same request.

## Installation

1. Create a Python virtual environment
```bash
python -m venv .venv
```

2. Activate environment
```bash
.\.venv\Scripts\activate
```

3. Install requirements
```bash
pip install -r requirements.txt
```

## Run service

To run the serive, follow the next steps:

1. Activate the Python environment
```bash
.\.venv\Scripts\activate
```

2. Run the command
```bash
uvicorn main:app --reload
```

## Use

**Request**

```http

POST /calculate_similarity HTTP/1.1
Host: https://service-url
Content-Type: application/json

{
    "text": "8 de diciembre de 2023\nAsunto: Falta de Pago de Pensión\nA la atención del Departamento de Pensiones,\nSoy Juan Pérez, con DNI 12345678A. No he recibido el pago de mi pensión del mes de noviembre de 2023. Este retraso está afectando seriamente mi situación económica. Solicito una revisión urgente de mi caso y el pronto pago de la pensión adeudada.\nAtentamente,\nJuan Pérez",
    "items": [
        {
            "id": 1,
            "text": "8 de diciembre de 2023\nAsunto: Queja por No Pago de Pensión\nEstimados responsables de Pensiones,\nMi nombre es Ana Gómez, DNI 87654321B. Hasta la fecha, no he recibido el pago de mi pensión correspondiente a noviembre de 2023. Como pensionista, dependo de estos fondos para mis gastos mensuales. Ruego se solucione este inconveniente a la mayor brevedad.\nCordialmente,\nAna Gómez"
        },
        {
            "id": 2,
            "text": "8 de diciembre de 2023\nAsunto: Solicitud de Certificado de Pensión\nEstimado Departamento de Pensiones,\nSoy Carlos Martín, con DNI 11223344C. Solicito un certificado actualizado de mi estado de pensión para trámites personales. Agradecería su emisión a la brevedad y su envío al correo electrónico carlos.m@correo.com o a mi dirección postal en Calle Falsa 123, Madrid.\nGracias por su atención,\nCarlos Martín"
        },
        {
            "id": 3,
            "text": "8 de diciembre de 2023\nAsunto: Solicitud de Historia Laboral\n\nEstimado Departamento de Recursos Humanos,\n\nMe dirijo a ustedes con el fin de solicitar una copia completa de mi historia laboral en [Nombre de la Empresa o Entidad]. Mi \nombre es Laura Espinosa, con número de identificación 98765432E, y fui empleada en su empresa desde el 1 de marzo de 2010 hasta \nl 31 de agosto de 2023.\n\nDicha documentación es necesaria para trámites personales relacionados con mi desarrollo profesional. Les agradecería que la \nnformación incluya fechas de inicio y fin de mis periodos laborales, cargos desempeñados y cualquier otra información relevante.\n\nPor favor, envíen la documentación a mi dirección de correo electrónico laura.e@correo.com o a mi dirección postal en Av. \nrincipal 456, Barcelona.\n\nAgradezco de antemano su colaboración y pronta respuesta.\n\nAtentamente,\n\nLaura Espinosa"
        }
    ]
}

```

**Response**

```json
{
    "1": 0.9247782230377197,
    "2": 0.8549616932868958,
    "3": 0.8093454837799072
}
```

## Create and publish Docker image

1. Create a Docker image
    ```bash
    docker build -t "similarity-service" . --tag=similarity-service:1.0.0
    ```

2. Create a container. The parameter -p has the format hostport:dockerport
    ```bash
    docker create --name=similarity-service-ioip-test -p 5000:5000 similarity-service:latest
    ```

3. Push the image to Azure Container Registry
    ```bash
    docker push dockerioip.azurecr.io/similarity-service:latest
    ```


## Common issues

wsl --shutdown