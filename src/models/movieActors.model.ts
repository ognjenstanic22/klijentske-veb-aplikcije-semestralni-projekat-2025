import { Actor } from "./actor.model"

export interface MovieActors {
    movieActorId: number
    movieId: number
    actorId: number
    actor: Actor
}