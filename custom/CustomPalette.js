const SUITABILITY_SCORE_HIGH = 100,
      SUITABILITY_SCORE_AVERGE = 50,
      SUITABILITY_SCORE_LOW = 25;

export default class CustomPalette {
  constructor(bpmnjs,bpmnFactory, create, elementFactory, palette, translate,moddle) {
    this.bpmnjs=bpmnjs;
    this.bpmnFactory = bpmnFactory;
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;
    this.moddle=moddle;
    console.log(bpmnjs);
    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const {
      bpmnFactory,
      create,
      elementFactory,
      translate,
      moddle
    } = this;

    function createTask() {
      return function(event) {
        const businessObject = bpmnFactory.create('bpmn:SubProcess');
        businessObject.name="Test";
        businessObject.id=businessObject.id.replace('SubProcess', 'SituationScope');
        businessObject.situations=[];
        businessObject.isDefault=false;
        var situation =moddle.create('sitscope:Situation', {
          "situationname": "TestSituation",
          "situationtrigger": "true"
                  });

        businessObject.situations.push(situation);
        const shape = elementFactory.createShape({
          type: 'bpmn:SubProcess',
          isExpanded: true,
          businessObject: businessObject
        });
        create.start(event, shape); 
      }
    }

    return {
      'create.high-task': {
        group: 'activity',
        className: 'bpmn-icon-task green',
        title: translate('Create Situational Scope'),
        action: {
          dragstart: createTask(),
          click: createTask()
        }
      }
    }
  }
}

CustomPalette.$inject = [
  'bpmnjs',
  'bpmnFactory',
  'create',
  'elementFactory',
  'palette',
  'translate',
  'moddle'
];