import {
    createActor as createHelloActor,
    canisterId as helloCanisterId,
} from '../declarations/hello_world'

export const makeActor = (canisterId, createActor) => {
    return createActor(canisterId, {
        agentOptions: {
            host: process.env.NEXT_PUBLIC_IC_HOST,
        },
    })
}

export function makeHelloActor() {
    return makeActor(helloCanisterId, createHelloActor)
}
