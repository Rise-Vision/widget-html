# HTML Widget [![Circle CI](https://circleci.com/gh/Rise-Vision/widget-html/tree/master.svg?style=svg)](https://circleci.com/gh/Rise-Vision/widget-html/tree/master)

## Introduction

The HTML Widget allows you to embed HTML content directly into the Widget which will then be displayed in your Presentation. This can be content that you built yourself, or a snippet of HTML code that you copied from a website to embed into your Presentation. 

HTML Widget works in conjunction with [Rise Vision](http://www.risevision.com), the [digital signage management application](http://rva.risevision.com/) that runs on [Google Cloud](https://cloud.google.com).

At this time Chrome is the only browser that this project and Rise Vision supports.

## Built With
- [AngularJS](https://angularjs.org/)
- [npm](https://www.npmjs.org)
- [Bower](http://bower.io/)
- [Gulp](http://gulpjs.com/)
- [Karma](http://karma-runner.github.io/0.12/index.html) and [Mocha](http://mochajs.org/) for testing

## Development

### Dependencies
* [Git](http://git-scm.com/) - Git is a free and open source distributed version control system that is used to manage our source code on Github.
* [npm](https://www.npmjs.org/) & [Node.js](http://nodejs.org/) - npm is the default package manager for Node.js. npm runs through the command line and manages dependencies for an application. These dependencies are listed in the _package.json_ file.
* [Bower](http://bower.io/) - Bower is a package manager for Javascript libraries and frameworks. All third-party Javascript dependencies are listed in the _bower.json_ file.
* [Gulp](http://gulpjs.com/) - Gulp is a Javascript task runner. It lints, runs unit and E2E (end-to-end) tests, minimizes files, etc. Gulp tasks are defined in _gulpfile.js_.

### Local Development Environment Setup and Installation
To make changes to the Widget, you'll first need to install the dependencies:

- [Git](http://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Node.js and npm](http://blog.nodeknockout.com/post/65463770933/how-to-install-node-js-and-npm)
- [Bower](http://bower.io/#install-bower) - To install Bower, run the following command in Terminal: `npm install -g bower`. Should you encounter any errors, try running the following command instead: `sudo npm install -g bower`.
- [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) - To install Gulp, run the following command in Terminal: `npm install -g gulp`. Should you encounter any errors, try running the following command instead: `sudo npm install -g gulp`.

The Widget can now be installed by executing the following commands in Terminal:
```
git clone https://github.com/Rise-Vision/widget-html.git
cd widget-html
npm install
bower install
gulp build
```

The source code for the Widget can be found in the `src` folder. This is where you will want to make your custom changes.

### Run Locally
To preview Widgets locally, you'll need to use the [Widget Preview](https://github.com/Rise-Vision/widget-preview) app available [here](http://192.254.220.36/~rvi/widget-preview/).

### Testing
Execute the following command in Terminal to run both end-to-end and unit tests:
```
gulp test
```
### Deployment
Once you are satisifed with your changes, run `gulp build` again, which will regenerate the `dist` folder. The `dist` folder contains all of the files that need to be deployed to your server. In the Rise Vision Platform, you can then add your custom Widget via the *Gadgets* tab. Give your Widget a name, select a *Type* of *Widget*, paste the link to the `widget.html` file in the *URL* field, and the link to the `settings.html` file in the *Custom UI URL* field:

![Add a Widget](https://cloud.githubusercontent.com/assets/1190420/5113377/2f2d9240-6ffd-11e4-98ad-a484c1fa7183.png)

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