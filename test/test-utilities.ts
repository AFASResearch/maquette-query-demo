import { MaterialMaquetteServicesBase } from 'material-maquette';

export interface ServicesMock extends MaterialMaquetteServicesBase {
  // You can 'override' properties here with SinonMocks when needed
}

export let createServicesMock = (): ServicesMock => {
  return {
    mdcService: {
      createEnhancer: () => ({
        handleCreate: () => undefined,
        handleUpdate: () => undefined
      })
    },
    window: undefined,
    projector: undefined
  } as any;
};