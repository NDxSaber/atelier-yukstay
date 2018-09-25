import { Record } from 'immutable';

const createEnum = (items) => {
  class Enum extends Record(items) {
    // `this` here is an instance of Record so all instance methods are available!
    items = () => this.toArray();
    fromValue = value => this.findEntry((item, key) => {
      // eslint-disable-next-line
      return (item == value)
    })[0];
  }

  return new Enum();
};

export default createEnum;