# node-template-dev-env
Need a fast template development environment? You're in the right place ^_^

You will have these when using it;
- **Twig** Template Engine
- **SASS** to **CSS** Compiler

### Installation

**1-** Clone the repo; 

`git clone https://github.com/gurkanbicer/node-template-dev-env.git`

**2-** Install packages;

`npm install`

**3-** Run;

`npm start`

### Documentations
- ExpressJS 4 ([documentation](https://expressjs.com/en/guide/routing.html))
- Twig ([documentation](https://twig.symfony.com/doc/2.x/))
- Sass ([documentation](https://sass-lang.com/documentation))

### Knowledge

When you need create an another page, you should write your code into **routes/index.js** file. Here an example;

```js
router.get('/books', function (req, res) {
  const params = {
    title: 'Page: /books',
    books: [
      {"name" : "Hello World!"}, 
      {"name" : "Hello JS!"}
    ]};
  res.render('books', params, function (err, output) {
    writeOutputToDist(req.path, output);
    res.send(output);
  });
});
```

Then, create a **twig** file into **views** directory.

```
<h1>{{ title}}</h1>
<ul>
    {% for book in books %}
        <li>{{ book.name }}</li>
    {% endfor %}
</ul>
```

Just, open the browser and check it. Your's default url is http://localhost:3000

###### Default Directories and Files
- **Assets directory:** public/assets
- **Dist (output) directory:** public/dist
- **Views directory:** views
- **Route file:** routes/index.js
- **Config file:** .env

###### Build Command
You should run the project before use it;

`npm run build-dist` 

When use this command **public/dist** directory will be emptied and re-generated. 

For further information please [contact](mailto:gurkan@grkn.co) or [create an issue](https://github.com/gurkanbicer/node-template-dev-env/issues/new).


