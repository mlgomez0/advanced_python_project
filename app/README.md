# Advance python project

This project was create to allow allow user predict the rating of a movie.

## Installation

### Backend

1. Create a Python virtual environment in the root folder
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

### Frontend

1. Install requirements
```bash
npm i
```

## Run service

### Backend

1. Go to folder `./app/backend`
2. Run the command
    ```bash
    uvicorn main:app --reload
    ```

### Frontend

1. Open another terminal and go to the folder `./app/frontend`
2. Run the command
    ```bash
    npm run dev
    ```

## Use

**Request**

```http

POST /api/predict HTTP/1.1
Host: https://server-url
Content-Type: application/json

{
    "text": "This is a text"
}

```

**Response**

```json
{
    "rating": 1
}
```