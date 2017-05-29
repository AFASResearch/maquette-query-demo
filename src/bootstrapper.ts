import { createProjector } from 'maquette';
import { createDemoPage } from './demo-page';
import { createMDCService } from './mdc-service';

let projector = createProjector();

let mdcService = createMDCService();
let context = {projector, mdcService, window};

let demoPage = createDemoPage(context);
projector.append(document.body, demoPage.renderMaquette);
