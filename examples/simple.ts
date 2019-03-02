import { EventSource } from '../src/event-source'

let a = new EventSource()
let b = new EventSource()
let es = a.merge(b.map((n: number) => 'I mapped this! ' + n))

es.on('event', (event: string | symbol, ...args: any[]) => {
    console.log(event, args)
})

a.emit('unmapped', 1)
//=> unmapped 1

b.emit('mapped', 1)
//=> I mapped this! mapped 1
