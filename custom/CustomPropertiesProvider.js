import inherits from 'inherits';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';
import test from './parts/SituationalScopeProps';
import test2 from './parts/AdaptionProps';

function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {

    var generalGroup = {
      id: 'general',
      label: 'General',
      entries: []
    };
    idProps(generalGroup, element, translate);
    nameProps(generalGroup, element, bpmnFactory, canvas, translate);
    processProps(generalGroup, element, translate);
  
    var detailsGroup = {
      id: 'details',
      label: 'Details',
      entries: []
    };
    linkProps(detailsGroup, element, translate);
    eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);
  
    var documentationGroup = {
      id: 'documentation',
      label: 'Documentation',
      entries: []
    };
  
    documentationProps(documentationGroup, element, bpmnFactory, translate);
  
    return[
      generalGroup,
      detailsGroup,
      documentationGroup
    ];
  }
  
  // Create the custom magic tab
  function createMagicTabGroups(element,bpmnFactory,moddle) {
  
    // Create a group called "Black Magic".
    var blackMagicGroup = {
      id: 'situational-scope',
      label: 'Situational Scope',
      entries: []
    };
  
    // Add the spell props to the black magic group.
    test(blackMagicGroup, element,bpmnFactory,moddle);
  
    return [
      blackMagicGroup
    ];
  }

  // Create the custom magic tab
  function createAdaptionTabGroups(element,bpmnFactory,moddle) {
  
    // Create a group called "Black Magic".
    var adaptionMagicGroup = {
      id: 'adaption-scope',
      label: 'Adaption Scope',
      entries: []
    };
  
    // Add the spell props to the black magic group.
    test2(adaptionMagicGroup, element,bpmnFactory,moddle);
  
    return [
      adaptionMagicGroup
    ];
  }
  
export default function CustomPropertiesProvider(eventBus, bpmnFactory, canvas,
elementRegistry, translate, moddle){
    PropertiesActivator.call(this, eventBus);

    this.getTabs = function(element) {
  
      var generalTab = {
        id: 'general',
        label: 'General',
        groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
      };
  
      // The "magic" tab
      var magicTab = {
        id: 'situationproperties',
        label: 'Situation Properties',
        groups: createMagicTabGroups(element,bpmnFactory,moddle)
      };

      var adaptionTab = {
        id: 'adaptionProperties',
        label: 'Adaption Properties',
        groups: createAdaptionTabGroups(element,bpmnFactory,moddle)
      };
  
      // Show general + "magic" tab
      return [
        generalTab,
        magicTab,
        adaptionTab
      ];
    };
  }
  
  inherits(CustomPropertiesProvider, PropertiesActivator);
  CustomPropertiesProvider.$inject = [
    'eventBus',
    'bpmnFactory',
    'canvas',
    'elementRegistry',
    'translate',
    'moddle'
  ];