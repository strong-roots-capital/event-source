/**
 * event-source
 * Reduction of an EventEmitter to a composable event-stream
 */

namespace debug {
    export const es = require('debug')('eventsource')
}

import { EventEmitter } from 'events'

export const DEFAULT_EVENT = 'event'

// todo: strict-ify with generics and StrictEventEmitter
export class EventSource extends EventEmitter {
    /* Spec to be later overwritten */
    /**
     * Typed specification to provide room in the prototype to save `EventEmitter.prototype.emit`
     */
    originalEmit = (event: string | symbol, ...args: any[]): boolean => false

    /**
     * DOCUMENT
     */
    merge(that: EventSource): EventSource {
        const merged = new EventSource

        const callback = (event: symbol | string, ...args: any[]): boolean => {
            debug.es('EventSource:merge > detected event', event, args)
            return EventSource.prototype.emit.call(merged, event, ...args)
        }

        this.on(DEFAULT_EVENT, callback)
        that.on(DEFAULT_EVENT, callback)

        return merged
    }

    /**
     * DOCUMENT
     */
    map(transform: Function): EventSource {
        const mapped = new EventSource

        const callback = (event: symbol | string, ...args: any[]): boolean => {
            debug.es('EventSource:map > mapping', event, args)
            return EventSource.prototype.emit.call(mapped, event, ...transform(...args))
        }

        this.on(DEFAULT_EVENT, callback)

        return mapped
    }
}


EventSource.prototype.originalEmit = EventSource.prototype.emit

EventSource.prototype.emit = function(event: string | symbol, ...args: any[]) : boolean {
    debug.es('EventSource emitting', event, args)
    EventSource.prototype.originalEmit.call(this, DEFAULT_EVENT, event, ...args)
    return EventSource.prototype.originalEmit.call(this, event, ...args)
}
