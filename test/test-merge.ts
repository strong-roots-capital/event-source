import test from 'ava'

/**
 * Library under test
 */

import { EventSource } from '../src/event-source'

test.cb('merged stream should emit when event `a` emits', t => {
    const a = new EventSource()
    const b = new EventSource()
    const event = 'some-event'
    const merged = a.merge(b)
    merged.on(event, () => t.end())
    a.emit(event)
})

test.cb('merged stream should forward all arguments from emitter `a`', t => {
    const a = new EventSource()
    const b = new EventSource()
    const eventOuter = 'some-event'
    const argsOuter = [1, 2, 3, 4, 5, [6, 7, 8]]
    const merged = a.merge(b)
    merged.on(eventOuter, (...args: any[]) => {
        t.deepEqual(argsOuter, args)
        t.end()
    })
    a.emit(eventOuter, ...argsOuter)
})

test.cb('merged stream should forward all arguments from emitter `a` to default-event', t => {
    const a = new EventSource()
    const b = new EventSource()
    const eventOuter = 'some-event'
    const argsOuter = [1, 2, 3, 4, 5, [6, 7, 8]]
    const merged = a.merge(b)
    merged.on('event', (event: string | symbol, ...args: any[]) => {
        t.is(eventOuter, event)
        t.deepEqual(argsOuter, args)
        t.end()
    })
    a.emit(eventOuter, ...argsOuter)
})

test.cb('merged stream should emit when event `b` emits', t => {
    const a = new EventSource()
    const b = new EventSource()
    const event = 'some-event'
    const merged = a.merge(b)
    merged.on(event, () => t.end())
    b.emit(event)
})

test.cb('merged stream should forward all arguments from emitter `b`', t => {
    const a = new EventSource()
    const b = new EventSource()
    const eventOuter = 'some-event'
    const argsOuter = [1, 2, 3, 4, 5, [6, 7, 8]]
    const merged = a.merge(b)
    merged.on(eventOuter, (...args: any[]) => {
        t.deepEqual(argsOuter, args)
        t.end()
    })
    b.emit(eventOuter, ...argsOuter)
})

test.cb('merged stream should forward all arguments from emitter `b` to default-event', t => {
    const a = new EventSource()
    const b = new EventSource()
    const eventOuter = 'some-event'
    const argsOuter = [1, 2, 3, 4, 5, [6, 7, 8]]
    const merged = a.merge(b)
    merged.on('event', (event: string | symbol, ...args: any[]) => {
        t.is(eventOuter, event)
        t.deepEqual(argsOuter, args)
        t.end()
    })
    b.emit(eventOuter, ...argsOuter)
})
