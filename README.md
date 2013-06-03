TODO
===

* Multiple contributors
* Spec out pagination
* Spec out basic Admin UI
* Spec out static pages & content management of them
* Spec out plugin system (for adding more admin pages)
  * Posts, Categories, Archives, Pages are starting plugins

Routes
===

/posts/:id
- show a single post

/posts
- shows all posts

/categories/:id
- shows all posts in category

/archives/:id
- shows all posts by the archive

Directives
===

Tag Based
* eco-cms - put this on the outermost tag, usually the html tag
* eco - apply attributes to this tag, generates a div

Attribute Based

* title - page title
* include - includes an html file, use a relative url
* repeat - wrapper around ngRepeat
(post.url, post.title, post.time, post.content)
* no="resource" - yields only if there are no #resource
* paginate="resource" - shows pagination links for the resource based on
the current page and the number of posts per page

