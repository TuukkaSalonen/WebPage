# Project details

## This is a repository for my personal website of tuukkasalonen.fi
It is only created for learning purposes to test full-stack web development techniques.

## Note
This site is not in active development but is used as a hobby.

## Running Docker compose
Run `docker-compose -f docker-compose.dev.yaml up` in the root directory.\
This runs the development version.

## Required environment variables for development setup
### Backend
BACKEND_PORT : Define what port the backend runs on (container and exposed port set as same)\
DB_PORT : Define database port\
DB_USER : Define database username\
DB_PASSWORD : Define database password\
DB_NAME : Define database name\
AI_KEY : Define Gemini AI key\
RECAPTCHA_SECRET_KEY: Define Google reCAPTCHA key to validate reCAPTCHA (defaulted as recaptchaSecret, which is invalid)\
ENV : development (set as default in development docker compose)\
FRONTEND_URL_DEV : Development frontend url for CORS\
ERROR_LOG : Custom error log name (defaulted as error)\
COMBINED_LOG : Custom combined log name (defaulted as combined)\
EMAIL_USER: Define email username\
EMAIL_PASSWORD : Define email password\
EMAIL_HOST: Define email host\
COOKIE_NAME: Define access token cookie name (token as default in code)\
COOKIE_EXPIRATION : Define access token cookie expiration (1h as default in code)\
REFRESH_COOKIE_EXPIRATION: Define refresh token cookie expiration (7d as default in code, name is coded as refresh_token)
JWT_SECRET : Define secure jwt secret key
SALT_ROUNDS : Define the amount of salt rounds (defaulted as 10 in code)

### Frontend
FRONTEND_PORT_DEV : Define what port frontend runs on\
These are set as default in the development docker compose for hot-reloads\
WDS_SOCKET_HOST=127.0.0.1\
CHOKIDAR_USEPOLLING=true\
WATCHPACK_POLLING=true

### Database
DB_PORT : Define what port the database runs on\
DB_USER : Define database username\
DB_PASSWORD : Define database password\
DB_NAME : Define database name
