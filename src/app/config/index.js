import merge from 'deepmerge'
import config from './default'
import prod from './prod'
import dev from './dev'

let isProd = (process.env.NODE_ENV === 'production');
export default { isProd:isProd, ...merge(config, (isProd ? prod : dev)) }