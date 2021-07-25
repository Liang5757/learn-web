import {observe} from "./defineReactive.js";
import Compile from "./compile.js";

export default class MyVue {
  constructor (options) {
    this.data = options.data;
    this.methods = options.methods;
    
    Object.keys(this.data).forEach((key) => {
      this.proxyKeys(key);
    })
    
    observe(this.data);
    new Compile(options.el, this);
    
    return this;
  }
  
  proxyKeys (key) {
    Object.defineProperty(this, key, {
      enumerable: false,
      configurable: true,
      get: function getter () {
        return this.data[key];
      },
      set: function setter (newVal) {
        this.data[key] = newVal;
      }
    });
  }
}
