# event-source [![Build status](https://travis-ci.org/strong-roots-capital/event-source.svg?branch=master)](https://travis-ci.org/strong-roots-capital/event-source) [![npm version](https://img.shields.io/npm/v/@strong-roots-capital/event-source.svg)](https://npmjs.org/package/@strong-roots-capital/event-source) [![codecov](https://codecov.io/gh/strong-roots-capital/event-source/branch/master/graph/badge.svg)](https://codecov.io/gh/strong-roots-capital/event-source)

> Reduction of an EventEmitter to a composable event-stream

## Install

``` shell
npm install @strong-roots-capital/event-source
```

## Use

``` typescript
import { eventSource } from '@strong-roots-capital/event-source'
let a = new EventSource()
let b = new EventSource()
let es = a.merge(b.map((n: number) => 'I mapped this! ' + n))

es.on('event', (event: string | symbol, ...args: any[]) => {
    console.log(event, args)
})

a.emit('unmapped', 1)
//=> unmapped [ 1 ]

b.emit('mapped', 1)
//=> mapped [ 'I mapped this! 1' ]
```

## Related

- [observable](https://github.com/strong-roots-capital/observable)

## Acknowledgments

- [Deprecating the Observer Pattern with Scala.React](https://infoscience.epfl.ch/record/176887/files/DeprecatingObservers2012.pdf)
