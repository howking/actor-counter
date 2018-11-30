import { LitElement, html, property, customElement } from '@polymer/lit-element'
import { lookup } from 'actor-helpers/src/actor/Actor.js'
import { Action } from './actions.js'

@customElement('my-button' as any)
export class MyButton extends LitElement {

  @property()
  private state = lookup('state')

  render(){
    return html`
      <button @click=${()=>this.state.send(Action.INCREMENT)}>Increment</button>
      <button @click=${()=>this.state.send(Action.DECREMENT)}>Decrement</button>
    `
  }
}
