
export default class ModelTransfomer {
    constructor(config,eventBus, bpmnRenderer, textRenderer) {
      super(eventBus, HIGH_PRIORITY);
      this.defaultFillColor = config && config.defaultFillColor;
      this.defaultStrokeColor = config && config.defaultStrokeColor;
      this.bpmnRenderer = bpmnRenderer;
      this.textRenderer=textRenderer;
    }

    transformModel(){

      const options = {
        filters: {
          name: 'foo',
          extensions: [ 'foo' ]
        },
        title: 'foo'
      };
      const selectedPaths = dialog.showOpenDialog();
      console.log(selectedPaths);

    }
}

ModelTransfomer.$inject = [ 'modeling','config',
 'eventBus', 'bpmnRenderer', 'textRenderer' ];
 
