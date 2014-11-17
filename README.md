# HTML Widget [![Build Status](http://devtools1.risevision.com:8080/view/Widgets%20and%20Components/job/Widget-HTML-Master-Build/badge/icon)](http://devtools1.risevision.com:8080/view/Widgets%20and%20Components/job/Widget-HTML-Master-Build/)

## Introduction

The HTML Widget allows you to embed HTML content directly into the Widget which will then be displayed in your Presentation. This can be content that you built yourself, or a snippet of HTML code that you copied from a website to embed into your Presentation. 

HTML Widget works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Built With
* NPM (node package manager)
* Gulp
* Bower
* Karma and Mocha for testing

## Development

### Local Development Environment Setup and Installation
* install the latest Node.js and NPM version

* clone the repo using Git to your local:
```
git clone https://github.com/Rise-Vision/widget-html.git
```

* cd into the repo directory:
```
cd widget-html
```

* from the root of the repo run this command to install all npm dependencies:
```
npm install
```

* install Bower globally using the NPM install cmd:
```
npm install -g bower
```

* run Bower install to install all bower dependencies:
```
bower install
```

* install Gulp globally using the NPM install cmd:
```
npm install -g gulp
```

### Run Local
To preview Widgets locally, you'll have to run the [Widget Preview](https://github.com/Rise-Vision/widget-preview) app available for download [here](http://192.254.220.36/~rvi/widget-preview/).

### Dependencies
* **Gulp** - is used as a task runner. It lints, runs unit tests and E2E (end to end) tests, minimizes files, etc.  all dependencies for this is in the gulp.js file.
* **Bower** - is used as a package manager for javascript libraries and frameworks. All third-party javascript frameworks and libraries are listed as dependencies in the bower.json file.
* **NPM & Nodejs** - the node package manager is used in hand in hand with gulp to start a server to host the app and all the dependencies needed from using a node server. All these node dependencies are listed in the package.json file

### Testing
To run unit and E2E testing, do:
```
gulp test
```

## Submitting Issues
If you encounter problems or find defects we really want to hear about them. If you could take the time to add them as issues to this Repository it would be most appreciated. When reporting issues please use the following format where applicable:

**Reproduction Steps**

1. did this
2. then that
3. followed by this (screenshots / video captures always help)

**Expected Results**

What you expected to happen.

**Actual Results**

What actually happened. (screenshots / video captures always help)

## Contributing
All contributions are greatly appreciated and welcome! If you would first like to sound out your contribution ideas please post your thoughts to our [community](http://community.risevision.com), otherwise submit a pull request and we will do our best to incorporate it

### Languages
If you would like translate the user interface for this product to another language please complete the following:

- Download the english translation file from this repository.
- Download and install POEdit. This is software that you can use to write translations into another language.
- Open the translation file in the [POEdit](http://www.poedit.net/) program and set the language for which you are writing a translation.
- In the Source text window, you will see the English word or phrase to be translated. You can provide a translation for it in the Translation window.
- When the translation is complete, save it with a .po extension and email the file to support@risevision.com. Please be sure to indicate the Widget or app the translation file is for, as well as the language that it has been translated into, and we will integrate it after the translation has been verified.

## Resources
If you have any questions or problems please don't hesitate to join our lively and responsive community at http://community.risevision.com.

If you are looking for user documentation on Rise Vision please see http://www.risevision.com/help/users/

If you would like more information on developing applications for Rise Vision please visit http://www.risevision.com/help/developers/.

**Facilitator**

[Stuart Lees](https://github.com/stulees "Stuart Lees")