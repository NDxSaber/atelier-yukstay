import createEnum from './create_enum'

export const ICON = createEnum({
  HEALT:      'healt',
  SHOPPING:   'shopping',
  RESTAURANT:      'restaurant',
  CHEVRON:    'chevron'
});

export function getSvgIcon(name) {
  name = ICON.fromValue(name);
  return require(`../assets/icon/icon-${ICON[name]}.svg`);
};


