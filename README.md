# Cog


## TODO

* Multiple contributors
* Spec out pagination
* Spec out basic Admin UI
* Spec out static pages & content management of them
* Spec out plugin system (for adding more admin pages)
  * Posts, Categories, Archives, Pages are starting plugins

## Routes

/posts/:id
- show a single post

/posts
- shows all posts

/categories/:id
- shows all posts in category

/archives/:id
- shows all posts by the archive

## Directives

Tag Based
* cog-cms - put this on the outermost tag, usually the html tag
* cog - apply attributes to this tag, generates a div

## Attribute Based (Add onto `cog` tag)

* title - page title
* include - includes an html file, use a relative url
* repeat - wrapper around ngRepeat
(post.url, post.title, post.time, post.content)
* no="resource" - yields only if there are no #resource
* paginate="resource" - shows pagination links for the resource based on
the current page and the number of posts per page

## Other Attribute Directives

* cog-editable - declares an editable section

Example: 

```html
<div cog-editable="contact">
  <p>{{ contact.message1 }}</p>
</div>
```

When this page renders the first time in the admin view, it will create
an editable section called 'contact' which will contain a single field
'message1'. camelCase variable names will be switched to Title Case.

## Filters

* cogMap - a filter which converts a field into a map type. By default
fields are strings

```html
<div cog-editable="location">
  {{ location.address | cogMap }}
</div>
```

When the page renders the first time in the admin view, it will create
an editable section called "Location" which will contain a single field
'address', clicking in this field however will display a "map picker"
which will allow us to store a complex hash representing an address
instead of simply a string. We can then feed the object to the cogMap
filter which can output the map visually (depending on user preferences)
