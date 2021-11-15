/**
 * vue-recomputed v0.0.1
 * (c) 2018 Eduardo San Martin Morote <posva13@gmail.com>
 * @license MIT
 */

let id = 0;
let data = {};

Vue.mixin({
  beforeCreate: function beforeCreate () {
    var this$1 = this;

    if (!this.$options.recomputed) { return }
    var me = 'r' + id++;
    this._$recomputeId = me;
    Vue.util.defineReactive(
      data,
      me,
      Object.keys(this.$options.recomputed).reduce(function (r, key) {
        r[key] = 0;
        return r
      }, {})
    );
    this.$options.computed = this.$options.computed || {};
    Object.keys(this.$options.recomputed).forEach(function (key) {
      this$1.$options.computed[key] = function (vm) {
        /* eslint-disable-next-line */
        data[me][key];
        if (EcObject.isObject(this$1.$options.recomputed[key]))
          return this$1.$options.recomputed[key].get.call(vm, vm)
        return this$1.$options.recomputed[key].call(vm, vm)
      };
    });
    this.$options.methods = this.$options.methods || {};
    this.$options.methods.$recompute = function (key) {
      data[me][key]++;
    };
  },

  destroyed: function destroyed () {
    if (!this._$recomputeId) { return }
    delete data[this._$recomputeId];
  },
});
