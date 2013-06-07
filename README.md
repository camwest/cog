## Welcome to Cog

Cog is what you get when you re-imagine content management for simple
websites using modern technology. You can build simple static websites
(not blogs) using Cog and by simply declaring which fields are content
editable in the source, an administration panel is automatically
generated for your clients.

Cog was designed particularily for freelance web developers who don't
want to mess around with PHP, Ruby, or a large and complicated CMS like
Wordpress or Expression Engine for a simple website. It's similar in
philosophy to static site generators like Jekyll except it lets non
technical people edit the content on the site easily.

### Cog Editable

The most basic feature in Cog is editable fields. See the below example.

```html
<!doctype html>
<html cog-cms="1234567890">
  <head>
    <link rel="stylesheet" type="text/css" href="/cog.css" ></link>
    <script src="/cog.js"></script>
  </head>

  <body>
    <div cog-editable="greeting">
      <p>Hello {{ t('name') }}</p>
    </div>

    <cog admin>Admin</cog>
  </body>
</html>
```

This is a fully working example. By declaring the div as a
```greeting```
section and putting the ```name``` field inside it, the admin interface
will automatically be generated to look like this:

![cog-editable
example](http://f.cl.ly/items/0w3f3d2o10122n3f1d0o/Screen%20Shot%202013-06-07%20at%2012.40.30%20PM.png)


## TODO

* Installation
* Cog Editable
* Stylesheets
* Includes
* Pages

https://trello.com/board/cog/51ad38c71bb704bb47001070
