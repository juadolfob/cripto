import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import caesarShift from '../imports/caesar'

import './main.html';

Meteor.methods({
  'file-upload': function (fileInfo, fileData) {
    console.log("received file " + fileInfo.name + " data: " + fileData);
    fs.writeFile(fileInfo.name, fileData);
  }
});

Template.caesar.onCreated(function caesarOnCreated() {
  // counter starts at 0

  this.input = new ReactiveVar("Enter text here");
  this.offset = new ReactiveVar(1);
  this.output = new ReactiveVar("This is the output");
});

Template.caesar.helpers({
  input() {
    return Template.instance().input.get();
  },
  output() {
    return Template.instance().output.get();
  },
  offset() {
    return Template.instance().offset.get();
  },
});

Template.caesar.events({
  'click .btn-cypher'(event, instance) {
    // cypher
    let text_=document.getElementById("InputText").value;
    let offset_=parseInt(document.getElementById("offset").value);
    instance.output.set(caesarShift(text_,offset_));
  },
  "change .file": function(event, instance){

    console.log("gello")
    let reader = new FileReader();

    reader.onload = function(event) {
      if(event.target.readyState != 2) return;
      if(event.target.error) {
        window.alert('Error while reading file');
        return;
      }

      let filecontent;
      filecontent = event.target.result;
      instance.input.set(event.target.result);
    };

    reader.readAsText(event.target.files[0]);
  }
});