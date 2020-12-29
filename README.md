# Random image

## Description
This project is used to show a random image, video or manga in your chosen folders.

## Requirement
- Node.js

## How to use
- Clone this repository
- Create `config.json` file contains an array PATH contains your paths of your folders.
    + Path contains paths for images
    + Removed for images that you don't want to show in images
    + tmp for temporary removed images (you can put it to removed folder by your hand, and return them in case you accidentally touch it)
Example:
```json
{
    "Path" : [
        "Path_1",
        "Path_2"
    ],
    "removed" : "path",
    "tmp" : "path"
}
```
- Run `npm install` to install all package from `package.json`
- Run `node index.js`
- Your image will be showed on port `8080`.
- You can choose to show images, videos or mangas.
- You can click anywhere to show another random image.

## Note

- You need to put your manga in a folder with prefix `manga` and the manga pages must be sort alphabetically.
- Add removed folder to eliminate images that you don't want to show in image but you don't want to delete it.
