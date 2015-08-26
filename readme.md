# React-Todo

Todo app: a react demo project made for learning.
The app is online here: http://nzonbi.github.io/react-todo/


MIT license

## Installation

Using a terminal, clone the repository and install dependencies.
Clone the repository:

    git clone git@github.com:nzonbi/react-todo.git

Go to project folder:

    cd react-todo

Install dependencies:

    npm install

## Project structure

The project contains the next folders:

* design: static files for design
* app/src: source files. This is the folder to work on and edit files.
* app/dev: Compiled development version. This folder contains the
  compiled source files in development version. (Non minified files)
  This is the folder to use as root for a development server.
* app/rel: Compiled release version. This folder contains the release build.

## Usage

The project provides grunt commands for most tasks.
Check the Gruntfile.js to view available tasks.
Some of the most useful are:

#### grunt builddev
Completely builds a development version of the app, on the app/dev folder.

#### grunt buildrel
Completely builds a release version of the app, on the app/rel folder.

#### grunt watchjs, grunt watchhtml
These tasks will watch the app/src folder for changes, and automatically build
the development folder. See the grunt file for more details.
