import { LitElement, html, property, customElement } from '@polymer/lit-element'
import { hookup, actorMixin } from 'actor-helpers/src/actor/Actor.js'
import { State } from './states.js'

@customElement('my-view' as any)
export class MyView extends actorMixin(LitElement) {

  @property()
  counter? :number

  @property()
  clicks? :number

  async init() {
    hookup('ui', this)
  }

  onMessage({counter, clicks}:State) {
    this.counter = counter
    this.clicks = clicks
  }

  render(){
    return html`<h2>Counter: ${this.counter}</h2><h4>clicks: ${this.clicks}</h4>`
  }
  
}
