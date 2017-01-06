# mdCanvas
Create a Lean Canvas out of a markdown list 

## Examples
[Rendered lean canvas]( https://jerik.github.io/mdCanvas/mdCanvas.html ) based on this markdown file: [mdCanvas.md]( https://raw.githubusercontent.com/jerik/mdCanvas/master/mdCanvas.md )

## Getting started
1. Clone or download this git repository 
1. Edit `mdCanvas.md`
1. Fire up your browser and open `mdCanvas.html`

## How to use
### Write down your Lean Canvas in markdown
Create a markdown textfile `project.md` in the same directory as the `mdCanvas.html` file. 

### Fill the markdown file with content: 

	# Canvas
	Lean Canvas to save the earth

	# Problem
	1. How to save the earth

	# Customer-segment
	1. All people of the world
	1. Wildlife

	# Unique-Value-Proposition
	The time is **not in love** with us

	# Solution
	- Supply mankind with engouh food and housing
	- Create peace 
	- Dispose money and greed

	# Channels
	- Word of mouth

	# Cost-Structure
	- Smile and Conviction

	# Revenue-Stream
	- Better life
	- Peace and Harmony

	# Key-Metrics
	- Environmental pollution control
	- Food and housing control

	# Unfair-advantage
	- Goodlike status


### Optional todo list under the canvas
If you add a todo section in your markdown textfile it will show up under the canvas. 

	# Todo 
	- This headline is optional. If not stated it will not show up

### Open mdCanvas.html with your markdown textfile
URL: `/path/to/your/mdCanvas.html?md=project`

## Todos
- Make the todo section disapear when clicking on the headline. So that the canvas can be printed without todolist.
- Add Colors. Automatic highlights of pairs. 
- Link list has problems with filenames including spaces. They should be removed from list. Perhaps with Error-Message
- Get hint, if a md file does not exists, but there is a link in the sidebar
- Try simpel http server, to overcome the restriction, that I cannot read and save files with javascript!
- Try https://github.com/niklasvh/html2canvas to create a image of the page, and then convert this to pdf for printing. Problem, screenshot should be done, after the md content is loaded.
