# create a javascript file which contains all mdfiles of the current folder
# http://stackoverflow.com/a/23189786/1933185

filename="mdfiles.js"

# create the js function needed
# ^ must be escape with ^^
echo 'function mlString(f) {' > $filename
echo   'return f.toString().' >> $filename
echo   'replace(/^[^\/]+\/\*!?/, "").' >> $filename
echo   'replace(/\*\/[^\/]+$/, "");' >> $filename
echo '}' >> $filename

# list the folder content
echo 'var g_FOLDER_CONTENTS = mlString(function() { /*!' >> $filename
ls *.md >> $filename
echo '*/});' >> $filename

# open mdCanvas
#mdCanvas.html
