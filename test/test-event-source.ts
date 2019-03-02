import test from 'ava'

/**
 * Library under test
 */

import { EventSource } from '../src/event-source'

test.cb('should emit events like an event emitter', t => {
    const es = new EventSource()
    const event = 'some-event'
    es.on(event, () => {
        t.end()
    })
    es.emit(event)
})

test.cb('should emit generic `event` event for any event', t => {
    const es = new EventSource()
    const event = 'some-event'
    es.on('event', () => {
        t.end()
    })
    es.emit(event)
})

test.cb('should emit events with all arguments', t => {
    const es = new EventSource()
    const event = 'some-event'
    const argsOuter = [1, 2, 3, 4, 5, [6, 7, 8]]
    es.on(event, (...args: any[]) => {
        t.deepEqual(argsOuter, args)
        t.end()
    })
    es.emit(event, ...argsOuter)
})

test.cb('should emit generic `event` with event name and all arguments', t => {
    const es = new EventSource()
    const eventOuter = 'some-event'
    const argsOuter = [1, 2, 3, 4, 5, [6, 7, 8]]
    es.on('event', (event: string | symbol, ...args: any[]) => {
        t.is(eventOuter, event)
        t.deepEqual(argsOuter, args)
        t.end()
    })
    es.emit(eventOuter, ...argsOuter)
})
