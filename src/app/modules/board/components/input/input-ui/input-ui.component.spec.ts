import { FormsModule } from '@angular/forms';
import {
  byTestId,
  createHostFactory,
  SpectatorHost,
} from '@ngneat/spectator';
import { BasePage, createPage } from 'src/tests/helpers';
import { InputUiComponent } from './input-ui.component';

type CSpectator = SpectatorHost<InputUiComponent>;

class Page extends BasePage<CSpectator> {
  get inputElement(): HTMLInputElement | null {
    return this.queryTestId('input-element');
  }

  get checkBtn(): HTMLButtonElement | null {
    return this.queryTestId('check-btn');
  }

  clickCheckBtn(): this {
    this.spectator.click(byTestId('check-btn'));

    return this;
  }

  typeInputElement(value: string): this {
    this.spectator.typeInElement(value, byTestId('input-element'));

    return this;
  }
}

describe('InputUiComponent', () => {
  let spectator: CSpectator;
  let page: Page;

  const createHost = createHostFactory({
    component: InputUiComponent,
    imports: [FormsModule],
  });

  it('creates the component', () => {
    spectator = createHost(`<app-input-ui></app-input-ui>`);
    expect(spectator.component).toBeTruthy();
  });

  it('renders the input value', async () => {
    spectator = createHost(`<app-input-ui [value]="value"></app-input-ui>`, {
      hostProps: {
        value: 5,
      },
    });
    page = createPage(spectator, Page);

    await spectator.hostFixture.whenStable();

    expect(page.inputElement?.value).toBe('5');
  });

  it('updates the input value', async () => {
    spectator = createHost(`<app-input-ui [value]="value"></app-input-ui>`, {
      hostProps: {
        value: 5,
      },
    });
    page = createPage(spectator, Page);

    await spectator.hostFixture.whenStable();

    page.typeInputElement('10');

    expect(spectator.component.value).toBe(10);
  });

  it('enables/disables the check button', () => {
    spectator = createHost(
      `<app-input-ui [disabled]="disabled"></app-input-ui>`,
      {
        hostProps: {
          disabled: true,
        },
      }
    );
    page = createPage(spectator, Page);

    expect(spectator.component.disabled).toBeTrue();
    expect(page.checkBtn).toHaveAttribute('disabled');

    spectator.setHostInput({ disabled: false });

    expect(spectator.component.disabled).toBeFalse();
    expect(page.checkBtn).not.toHaveAttribute('disabled');
  });

  it('renders input with min and max attributes', () => {
    spectator = createHost(
      `<app-input-ui [min]="min" [max]="max"></app-input-ui>`,
      {
        hostProps: {
          min: 1,
          max: 20,
        },
      }
    );
    page = createPage(spectator, Page);

    expect(spectator.component.min).toBe(1);
    expect(spectator.component.max).toBe(20);
    expect(page.inputElement).toHaveAttribute('min', '1');
    expect(page.inputElement).toHaveAttribute('max', '20');
  });

  it('emits valueChange when input is changed', () => {
    spectator = createHost(
      `<app-input-ui (valueChange)="x=$event"></app-input-ui>`
    );
    page = createPage(spectator, Page);

    page.typeInputElement('12');

    expect((spectator.hostComponent as any).x).toBe(12);
  });

  it('emits the check event when check button is pressed', () => {
    spectator = createHost(`<app-input-ui (check)="x=$event"></app-input-ui>`);
    page = createPage(spectator, Page);

    page.typeInputElement('15').clickCheckBtn();

    expect((spectator.hostComponent as any).x).toBe(15);
  });
});
