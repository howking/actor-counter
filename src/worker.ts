import { hookup } from 'actor-helpers/src/actor/Actor.js'
import StateActor from './state-actor.js'

hookup('state', new StateActor())
