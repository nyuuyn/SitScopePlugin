const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomContextPad {
  constructor(bpmnFactory, config, contextPad, create, elementFactory, injector, translate) {
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get('autoPlace', false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const {
      autoPlace,
      bpmnFactory,
      create,
      elementFactory,
      translate
    } = this;

    function appendServiceTask() {
      return function(event, element) {
        if (autoPlace) {
          const businessObject = bpmnFactory.create('bpmn:SubProcess');
    
         // businessObject.suitable = suitabilityScore;
    
          const shape = elementFactory.createShape({
            type: 'bpmn:SubProcess',
            isExpanded: true,
            businessObject: businessObject
          });
    
          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      }
    }

    function appendServiceTaskStart() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:SubProcess');

        //businessObject.suitable = suitabilityScore;

        const shape = elementFactory.createShape({
          type: 'bpmn:SubProcess',
          isExpanded: true,
          businessObject: businessObject
        });

        create.start(event, shape, element);
      }
    }

    return {
      'append.high-task': {
        group: 'model',
        className: 'bpmn-icon-task',
        title: translate('Append Situational Scope'),
        action: {
          click: appendServiceTask(),
          dragstart: appendServiceTaskStart()
        }
      }
    };
  }
}

CustomContextPad.$inject = [
  'bpmnFactory',
  'config',
  'contextPad',
  'create',
  'elementFactory',
  'injector',
  'translate'
];