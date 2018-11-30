import { initializeQueues } from 'actor-helpers/src/actor/Actor.js'
import './my-view.js'
import './my-button.js'

(async () => {
  await initializeQueues()
  new Worker('worker.js')
})()
