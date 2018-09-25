import createEnum from "./create_enum";
import config from '../config'

export const ACCOMOCATIONTYPE = createEnum({
  COLIVING:     'co-living',
  WHOLELIVING:  'whole-living',
});

export function getRoomTypeText(roomType) {
  switch(roomType) {
    case ACCOMOCATIONTYPE.COLIVING:
      return 'Co-living';
    case ACCOMOCATIONTYPE.WHOLELIVING:
      return 'Whole-unit'
    default:
      if(config.isProd) {
        return "";
      }

      throw 'Room type does not have a text';
  }
}