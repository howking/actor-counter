declare global {
  interface ActorMessageType {
    ui: State
  }
}

export interface State {
  counter: number
  clicks: number
}

export const initialState = {
  counter: 0,
  clicks: 0
}
