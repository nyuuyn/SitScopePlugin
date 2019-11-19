import { registerBpmnJSModdleExtension } from 'camunda-modeler-plugin-helpers';

import { registerBpmnJSPlugin } from 'camunda-modeler-plugin-helpers';

import ModdleExtension from '../resources/sitscope.json';

import customModule from '../custom';


registerBpmnJSModdleExtension(ModdleExtension);


registerBpmnJSPlugin(customModule);