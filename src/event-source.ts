/**
 * event-source
 * Reduction of an EventEmitter to a composable event-stream
 */

// TODO: strict-ify types with generics and StrictEventEmitter

namespace debug {
    export const es = require('debug')('event-source')
}

import { EventEmitter } from 'events'

export const DEFAULT_EVENT = 'event'

/**
 * Sub-class of EventEmitter that emits a generic event (`event`) in
 * addition to ordinary events.
 *
 * Provides abstractions for logically-transforming EventSources.
 */
export class EventSource extends EventEmitter {
    /**
     * Typed specification to provide room in the prototype to save
     * `EventEmitter.prototype.emit`.
     *
     * @remarks
     * This function is not to be used externally.
     */
    originalEmit = (event: string | symbol, ...args: any[]): boolean => false

    /**
     * Merge two EventSources into a single EventSource that acts as
     * the logical summation of its two components.
     *
     * @remarks
     * The new EventSource will emit when either `this` or `that`
     * emits, and the emitted signal will contain the same arguments.
     *
     * @param that - EventSource to merge with `this`
     * @returns A new EventSource acting as the summation of `this` and `that`
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
     * Returns a new EventSource that forwards signals emiited from
     * `this`, only transformed according to mapping function
     * `transform`.
     *
     * @param transform - EventSource with transformed signals
     * @returns A new EventSource with transform applied to every signal
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
