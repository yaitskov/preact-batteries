import { isoTime, time2Str, isoTime2Clock, isoTime2Day, replaceClock, replaceDay, h12ToH24 } from 'util/my-time';

describe('my-time', () => {
  describe('test environment', () => {
    it('local time zone is PST', () => expect(new Date().getTimezoneOffset()).toBe(420));
  });

  describe('isoTime', () => {
    it('local time zone without Z',
       () => expect(time2Str(isoTime('2014-12-30T15:45:44.777')))
         .toBe('2014-12-30T23:45:44.777Z'));
  });

  describe('h12To2H24', () => {
    it('12 am', () => expect(h12ToH24('12:34 AM')).toBe('00:34'));
    it('12 pm', () => expect(h12ToH24('12:34 PM')).toBe('12:34'));
    it('11 pm', () => expect(h12ToH24('11:34 PM')).toBe('23:34'));
    it('1 am', () => expect(h12ToH24('01:34 AM')).toBe('01:34'));
    it('1 pm', () => expect(h12ToH24('01:34 PM')).toBe('13:34'));
  });

  describe('isoTime / time2Str', () => {
    it('parse date time in ISO format', () => expect(
      time2Str(isoTime('2014-12-30T23:45:44.777Z')))
      .toBe('2014-12-30T23:45:44.777Z'));
  });

  describe('isoTime2Clock', () => {
    it('midnight', () => expect(isoTime2Clock('2014-12-30T08:45:44.777Z')).toBe('12:45 AM'));
    it('less than 12', () => expect(isoTime2Clock('2014-12-30T19:45:44.777Z')).toBe('11:45 AM'));
    it('more than 12', () => expect(isoTime2Clock('2014-12-30T23:45:44.777Z')).toBe('03:45 PM'));
  });

  describe('isoTime2Day', () => {
    it('cut local day', () => expect(isoTime2Day('2014-12-30T01:45:44.777Z')).toBe('2014-12-29'));
  });

  describe('replaceClock', () => {
    it('keep date', () => expect(replaceClock('2014-12-30T19:45:44.777Z', '03:10 PM'))
      .toBe('2014-12-30T23:10:44.777Z'));
  });

  describe('replaceDay', () => {
    it('keep time', () => expect(replaceDay('2014-12-30T19:45:44.777Z', '2015-06-03'))
      .toBe('2015-06-03T18:45:44.777Z'));
  });
});
