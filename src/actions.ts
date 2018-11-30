declare global {
  interface ActorMessageType {
    state: Action
  }
}

export enum Action {
  INCREMENT,
  DECREMENT
}
