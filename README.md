# Herokuapp
Suite de tests E2E con Playwright sobre the-internet.herokuapp.com
(no está absolutamente todo, solo lo que no se ha cubierto con saucedemo.com)

## Setup
Clonar el repositorio: si has hecho un Fork, cambia el nombre de usuario en el path del repositorio, moverse al directorio, instalar las dependencias y descargar los navegadores en Playwright
```sh
git clone https://github.com/miriammz/Herokuapp.git
cd Herokuapp
npm install
npx playwright install
```

## Run tests and view report
```sh
npm run test
npm run report
```


## Structure
Dentro de la carpeta tests se encuentran los ficheros *spec.ts (organizados por área) y dos carpetas, fixtures y pages (también por área)

## GitHub Actions
Estos tests corren en CI con GitHub Actions, ya que existe el fichero playwright.yml dentro del repo