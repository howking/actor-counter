import { lookup, Actor } from 'actor-helpers/src/actor/Actor.js'
import { Action } from './actions.js'
import { State, initialState } from './states.js'

export default class StateActor extends Actor<Action> {

  private ui = lookup('ui')

  private state:State = initialState

  async init(){
    this.ui.send(this.state)
  }
  
  onMessage(msg: Action) {
    switch (msg) {
      case Action.INCREMENT:
        this.state.counter += 1
        break
      case Action.DECREMENT:
        this.state.counter -= 1
        break
    }
    this.state.clicks += 1
    this.ui.send(this.state)
  }
}
