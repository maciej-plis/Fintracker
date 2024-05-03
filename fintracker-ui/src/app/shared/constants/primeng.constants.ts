import { OverlayOptions } from 'primeng/api';

export const agGridOverlayOptions: OverlayOptions = {
  appendTo: 'body',
  styleClass: 'ag-custom-component-popup',
  onShow: event => event?.overlay ? event.overlay.tabIndex = -1 : null
};
