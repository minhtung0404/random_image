# Random image

## Description
This project is used to show a random image in your chosen folders

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
- Your image will be showed on port `8080`. You can click anywhere to show another random image.
