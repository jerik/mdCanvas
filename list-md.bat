rem create a javascript file which contains all mdfiles of the current folder
rem http://stackoverflow.com/a/23189786/1933185

set filename="mdfiles.js"

rem create the js function needed
rem ^ must be escape with ^^
echo function mlString(f) { > %filename%
echo   return f.toString(). >> %filename%
echo   replace(/^^[^^\/]+\/\*!?/, ''). >> %filename%
echo   replace(/\*\/[^^\/]+$/, ''); >> %filename%
echo } >> %filename%

rem list the folder content
echo var g_FOLDER_CONTENTS = mlString(function() { /*! >> %filename%
dir /B *.md >> %filename%
echo */}); >> %filename%
