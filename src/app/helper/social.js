import createEnum from './create_enum'

export const SOCIAL = createEnum({
  FACEBOOK:     'facebook',
  INSTAGRAM:    'instagram',
  WHATSAPP:     'whatsapp',
});

export function getSocialAsset(name) {
  name = SOCIAL.fromValue(name);
  return require(`../assets/social/icon-${SOCIAL[name]}.svg`);
};