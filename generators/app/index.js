'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var urllib = require('urllib');

module.exports = yeoman.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the doozie ' + chalk.red('generator-cyclone') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Name of project?',
        default: fileName
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author name:',
        store: true
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email address:',
        store: true
      },
      {
        type: 'input',
        name: 'groupName',
        message: 'Group name',
        default: 'de'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: '1.0.0'
      }
    ];

    // your-mojo-name => yourMojoName
    function parseMojoName(name) {
      return name.replace(/\b(\w)|(-\w)/g, function (m) {
        return m.toUpperCase().replace('-', '');
      });
    }

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.projectName = parseMojoName(this.props.projectName);
      // To access props later use this.props.projectName;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('manifest.json'),
      this.destinationPath('manifest.json')
    );
  },

  install: function () {
    this.installDependencies();
  }
});
