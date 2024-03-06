import _ from 'lodash';
import moment from 'moment';

interface ISlot {
  beginAt: string;

  endAt: String;

  capacity: number;
}

// Helper function to add minutes to the current date
const addMinutes = (beginTime: string, minutes: number) => {
  const date = moment(beginTime).add(minutes, 'minutes');
  return date.toISOString();
};

// Generating slots
export const generateSlots = () => {
  const slots: ISlot[] = [];

  for (let i = 0; i < 7; i++) {
    // Monday to Sunday
    for (let j = 0; j < 5; j++) {
      const beginAt = moment()
        .set('hour', 7)
        .set('minute', 0)
        .set('second', 0)
        .add(i, 'days')
        .add(j * 2, 'hours')
        .toISOString();
      const endAt = addMinutes(beginAt, 120);
      const capacity = _.sample([10, 15, 20]);

      slots.push({
        beginAt,
        endAt,
        capacity,
      });
    }
  }
  return slots;
};
