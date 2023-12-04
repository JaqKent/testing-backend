
## Introduccion

Backend App realizada con Node.js, Express & MongoDB + Mongoose

## Librerias usadas:

|Library|Link|
|--|--|
|bcryptjs|https://www.npmjs.com/package/bcryptjs|
|connect-mongodb-session|https://github.com/mongodb-js/connect-mongodb-session|
|dotenv|https://github.com/motdotla/dotenv|
|express|https://expressjs.com/es/|
|express-session|https://github.com/expressjs/session|
|mongoose|https://mongoosejs.com/|

## Routes

    BASELINE_URL = /api
---

 - `{BASELINE_URL}/usuarios`
 - `{BASELINE_URL}/auth`
 - `{BASELINE_URL}/weeks`
 - `{BASELINE_URL}/ventanas`
 - `{BASELINE_URL}/onlyVentanasOld`

 USUARIOS Path
---

 - POST - `/` 
	 - `{
	"name": string,
	"email": string,
	"password": string
}`

-	GET - `/`

 AUTH Path
---

 - POST - `/` 
	 - `{
	"email": string,
	"password": string
}`

-	GET - `/`

SEMANAS Path
---

-	GET - `/`
-	GET - `//:id`
-	POST - `/`
	-	`{
	"week": string,
	"usuarioCreador": string,
	"fechaCreacion": date,
	"ventana": string[],
	
}`
-	PUT - `/:id`
	-	`{
"week": string,
	
}`
-	DELETE - `/:id`
	
VENTANAS Path
---

-	GET - `/`
-	GET - `/:id`
-	POST - `/`
	-	`{
	"ventanas": [
		{
            "solicitante": string,
            "descripcion": string,
            "estado": string,
            "fechaImplementacion": string,
            "urgencia":string,
            "critica": string,
            "crq": string,
            "ejecutaTarea": string,
            "controla": string,
            "pruebasPost": string,
            "afectaIdp": string,
            "impactoNotificacion": string,
            "semana": string,
		}]

}`
-	PUT - `/:id`
	-	`{
	"ventanas": [
		{
			"solicitante": string,
            "descripcion": string,
            "estado": string,
            "fechaImplementacion": string,
            "urgencia":string,
            "critica": string,
            "crq": string,
            "ejecutaTarea": string,
            "controla": string,
            "pruebasPost": string,
            "afectaIdp": string,
            "impactoNotificacion": string,
		}
	
}`
-	DELETE - `/:id`

## Requerimientos
Este proyecto utiliza variables de entorno para conectarse a la base de datos. Puede agregar la siguiente línea a un archivo .env para realizar esta conexión

    STRING_SERVER_MONGO=MongoDB STRING
    SECRETA=palabra secreta de jwt para verificar el user
    PORT=puerto local donde se ejecuta la app

