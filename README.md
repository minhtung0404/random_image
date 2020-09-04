# Random image

## Description
This project is used to show a random image, video or manga in your chosen folders.

## Requirement
- Node.js

## How to use
- Clone this repository
- Create `config.json` file contains an array PATH contains your paths of your folders.
Example:
```json
{
    "Path" : [
        "Path_1",
        "Path_2"
    ]
}
```
- Run `npm install` to install all package from `package.json`
- Run `node index.js`
- Your image will be showed on port `8080`.
- You can choose to show images, videos or mangas.
- You can click anywhere to show another random image.

## Note

- You need to put your manga in a folder with prefix `manga` and the manga pages must be sort alphabetically.
