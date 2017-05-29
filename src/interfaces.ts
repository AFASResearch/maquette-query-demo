import { Projector } from 'maquette';
import { MDCService } from './mdc-service';

export interface ApplicationContext {
  window: Window;
  projector: Projector;
  mdcService: MDCService;
}
