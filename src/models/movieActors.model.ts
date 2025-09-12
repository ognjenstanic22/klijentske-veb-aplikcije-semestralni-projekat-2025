import { ActorModel } from "./actor.model"

export interface MovieActorsModel {
    movieActorId: number
    movieId: number
    actorId: number
    actor: ActorModel
}