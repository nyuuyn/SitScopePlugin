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
import situationscopetab from './parts/SituationalScopeProps';
import test2 from './parts/AdaptionProps';
import sequenceAdaptionFlow from './parts/SequenceAdaptionFlowProps';

/*
 * This class basically, if understood correctly, creates the tab for properties when clicking on certain elements
 */

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

  // Create the custom situation tab
  function createSituationTabGroups(element,bpmnFactory,moddle) {

    // Create a group called "Situational Scope".
    var situationScopeGroup = {
      id: 'situational-scope',
      label: 'Situational Scope',
      entries: []
    };

    // Add the situation pcreateAdaptionTabGroupsrops to the sit scope group.
    situationscopetab(situationScopeGroup, element,bpmnFactory,moddle);

    return [
      situationScopeGroup
    ];
  }

  // Create the custom adaption tab
  function createAdaptionTabGroups(element,bpmnFactory,moddle) {

    // Create a group called "Adaption Scope".
    var adaptionMagicGroup = {
      id: 'adaption-scope',
      label: 'Adaption Scope',
      entries: []
    };

    // Add the adaption props to the adaption scope group.
    test2(adaptionMagicGroup, element,bpmnFactory,moddle);

    return [
      adaptionMagicGroup
    ];
  }

    // Create the custom adaption tab
    function createAdaptionFlowTabGroups(element,bpmnFactory,moddle) {

      // Create a group called "Adaption Flow".
      var adaptionFlowMagicGroup = {
        id: 'adaption-scope',
        label: 'Adaption Flow',
        entries: []
      };

      // Add the adaption props to the adaption scope group.
      sequenceAdaptionFlow(adaptionFlowMagicGroup, element,bpmnFactory,moddle);

      return [
        adaptionFlowMagicGroup
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

      // The "Situation" tab
      var sitTab = {
        id: 'situationproperties',
        label: 'Situation Properties',
        groups: createSituationTabGroups(element,bpmnFactory,moddle)
      };

      var sequenceTab = {
        id: 'sequenceflowProperties',
        label: 'Adaption Flow Properties',
        groups: createAdaptionFlowTabGroups(element,bpmnFactory,moddle)
      };

      // Show general + "Sit" tab
      return [
        generalTab,
        sitTab,
        sequenceTab
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
