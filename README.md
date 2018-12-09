# htmldom2

Parsing html on top of [xmldom](https://www.npmjs.com/package/xmldom) and [htmlparser2](https://www.npmjs.com/package/htmlparser2)


## Usage


### Parse html from a string

```js
const source = `
<html>
  <head>
    <title>Hello World</title>
  <body>
    <h1>Hello World</h1>
  </body>
</html>
`;
const document = DOMParser.parseFromString(source, 'text/html');
```
