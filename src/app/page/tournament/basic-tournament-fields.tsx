import { h } from 'preact';
import { TransCom, TransComS } from 'i18n/trans-component';

import { TxtField } from 'app/component/field/txt-field';
import { DayTimeField } from 'app/component/field/day-time-field';
import { ClockPickr } from 'component/form/input/clock-pickr';

import bulma from 'app/style/my-bulma.sass';

// import { StartTimeField } from 'app/page/tournament/field/start-time-field';

interface MyS extends TransComS {
  time: string;
}

export class BasicTourInfoFields extends TransCom<{}, MyS> {
  constructor(props) {
    super(props);
    this.st = {at: this.at(), time: ''};
  }

  render() {
    const [TxtFieldI, DayTimeFieldI] = this.c2(TxtField, DayTimeField);
    /* const [TourNameFieldI, StartDateFieldI, StartTimeFieldI]
     * = this.c3(TourNameField, StartDateField, StartTimeField);*/
    /* const [PlacePickerI, TicketPriceFieldI, DescriptionFieldI]

     * = this.c3(PlacePicker, TicketPriceField, DescriptionField);*/
    return <div class={bulma.field}>
      <TxtFieldI t$lbl="Tournament name" name="name" mit="!e rng:3:120 " />
      <DayTimeFieldI t$lbl="Starts at" a="startAt" min="today"/>
      <ClockPickr val={this.st.time} onChng={e => {
          console.log(`time is set = ${e}`)
      }} />
    </div>;

    {/* <PlacePickerI />
        <StartDateFieldI />
        <StartTimeFieldI />
        <TicketPriceFieldI />
        <DescriptionFieldI /> */}
  }

  at(): string[] { return []; }
}
