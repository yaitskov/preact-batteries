import { h } from 'preact';
import { TransCom, TransComS } from 'i18n/trans-component';

import { TxtField } from 'app/component/field/txt-field';

import bulma from 'app/style/my-bulma.sass';

/* import { StartDateField } from 'app/page/tournament/field/start-date-field';
 * import { StartTimeField } from 'app/page/tournament/field/start-time-field';*/

export class BasicTourInfoFields extends TransCom<{}, TransComS> {
  constructor(props) {
    super(props);
    this.st = {at: this.at()};
  }

  render() {
    const TxtFieldI = this.c(TxtField);
    /* const [TourNameFieldI, StartDateFieldI, StartTimeFieldI]
     * = this.c3(TourNameField, StartDateField, StartTimeField);*/
    /* const [PlacePickerI, TicketPriceFieldI, DescriptionFieldI]
     * = this.c3(PlacePicker, TicketPriceField, DescriptionField);*/
    return <div class={bulma.field}>
      <TxtFieldI t$lbl="Tournament name" name="name" mit="!e rng:3:120 " />
    </div>;

    {/* <PlacePickerI />
        <StartDateFieldI />
        <StartTimeFieldI />
        <TicketPriceFieldI />
        <DescriptionFieldI /> */}
  }

  at(): string[] { return []; }
}
