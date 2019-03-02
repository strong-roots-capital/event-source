import test from 'ava'

/**
 * Library under test
 */

import { EventSource } from '../src/event-source'

test.cb('mapped stream should emit when original stream emits', t => {
    const es = new EventSource()
    const map = (x: number) => Math.abs(x)
    const mapped = es.map(map)
    const event = 'some-event'
    mapped.on(event, (_: number) => {
        t.end()
    })
    es.emit(event)
})

test.cb('mapped stream should emit transformed values', t => {
    const es = new EventSource()
    const map = (x: number) => Math.abs(x)
    const mapped = es.map(map)
    const event = 'some-event'
    const value = -10
    mapped.on(event, (x: number) => {
        t.is(map(value), x)
        t.end()
    })
    es.emit(event, value)
})

test.cb('mapped stream should emit default-event when original stream emits', t => {
    const es = new EventSource()
    const map = (x: number) => Math.abs(x)
    const mapped = es.map(map)
    const event = 'some-event'
    mapped.on('event', (_: number) => {
        t.end()
    })
    es.emit(event)
})

test.cb('mapped stream should emit transformed values when original stream emits', t => {
    const es = new EventSource()
    const map = (x: number) => Math.abs(x)
    const mapped = es.map(map)
    const eventOuter = 'some-event'
    const value = -10
    mapped.on('event', (event: string | symbol, x: number) => {
        t.is(eventOuter, event)
        t.is(map(value), x)
        t.end()
    })
    es.emit(eventOuter, value)
})
