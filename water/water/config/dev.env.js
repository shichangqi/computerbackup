var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseURL: "'https://tyjwxb.f.wmeimob.com/app'"
})
