import { Component, OnInit } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import localePlExtra from '@angular/common/locales/extra/pl';
import { LayoutComponent } from '@core/components/layout/layout.component';
import { AutoComplete } from 'primeng/autocomplete';
import { AllEnterpriseModule, ModuleRegistry, provideGlobalGridOptions } from 'ag-grid-enterprise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    ToastModule,
    ConfirmDialogModule,
    LayoutComponent
  ]
})
export class AppComponent implements OnInit {

  public ngOnInit() {
    ModuleRegistry.registerModules([ AllEnterpriseModule ]);
    provideGlobalGridOptions({ theme: 'legacy' });
    registerLocaleData(localePl, 'pl-PL', localePlExtra);
    this.configureAutocompleteTabBehaviour();
  }

  private configureAutocompleteTabBehaviour() {
    const origOnKeydown = AutoComplete.prototype.onKeyDown;
    AutoComplete.prototype.onKeyDown = function (event: KeyboardEvent) {
      if (event.key === 'Tab') {
        if (this.focusedOptionIndex() !== -1) {
          this.onOptionSelect(event, this.visibleOptions()[this.focusedOptionIndex()], false);
        }
        this.hide();
        return;
      }
      origOnKeydown.apply(this, [ event ]);
    };
  }
}
