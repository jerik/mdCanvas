# Documentation 

## Browser compatibility
|Browser|Local access|Webserver access|
|---|---|---|
|Firefox|Yes|Yes|
|Chrome|No|Yes|
|Safari|No|No|

## showing the canvas - css grids
To show the canvas on the html page, mdCanvas uses the css grid feature. This features is not yet supported by all browsers. For more informatin please have a look at https://gridbyexample.com/browsers/.

## Default markdown file
When starting ``mdCanvas.html`` it will look by default for the markdown file ``mdCanvas.md`` and if present show the contents. 

## How to run mdCanvas
You can run mdCanvas localy by file:// url or within a webserver by http(s)://. In each case there are some points to consider

### Local access with file://
You can run mdCanvas.html by open it with your browser. Then it will look for the *default mdfile*. If you have several markdown files available, you have to run the ``list-md.bat`` or ``list-md.sh`` script, so that mdCanvas is aware of these files. In the local-mode browsers have limitation, for security reasons. To overcome this limitations I have created these 2 scripts. They basically creates the ``mdfiles.js`` which states all markdown files. 

If you add or remove markdownfiles you have to run one of the scripts again, otherwise mdCanvas is not up to date.

### Webserver access with http(s)://
To run mdCanvas with a webserver, you need to have a webserver running. Depending on your operating system you have serveral options to get an webserver up and running. But this is a whole book on its own. For
quick and easy access to a webserver I use [shttp](https://github.com/lucindo/shttp) - Simple zero-config HTTP Server.

By using a webserver, you have not to worry about the markdown files in your folder. mdCanvas will detect all mdfiles and present them in the sidebar so that you can access them easily.
