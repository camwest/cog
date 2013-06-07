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

### Installation

1. Checkout the repository

Take a look at the theme folder in the root.

![file structure](http://f.cl.ly/items/1V2X2J3U0z0P2k2q0C0u/files.png)

* `includes` - html includes like a header/footer that should persist
on all pages.
* `pages` - static content pages
* `stylesheets` - less or css, everything is merged together
automatically
* `theme.html` - theme layout file. required.

#### TODO

* Setting up mongo locally
* Setting up node
* Installing dependencies

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

This is a fully working example. By declaring the
`cog-editable="greeting"`
section and the `{{ t('name') }}` field the admin interface
will automatically be generated to look like this:

![cog-editable
example](http://f.cl.ly/items/0w3f3d2o10122n3f1d0o/Screen%20Shot%202013-06-07%20at%2012.40.30%20PM.png)

You can edit the field and see it update on the site in realtime. Once
you are happy and save the changes, visitors to your website will see
the newest content.

## TODO

* Installation
* Cog Editable
* Cog Admin
* Cog Include
* Cog Pages
* Stylesheets

https://trello.com/board/cog/51ad38c71bb704bb47001070
