# geoMapping


### something I need to implement is how the directives and methods are stored.
As of right now, they are stored all over the place. What I should do instead is consolidate them into different files.

Example:

## BAD:

controllers/controllers.js

  has all the controllers in one file

directives/mapdirective.js

  has the mapping directive

directives/map_directive_html.html

  this is the html - which has to stay the html.


## GOOD

controllers/controllers.js

  has the main controller

modules/map.js

  has the directive, the controller, and any factory functions built in.

map_directive.html

  the html. 
