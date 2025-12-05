import fs from 'node:fs'
// @ts-ignore 1234
import UA from '@financial-times/polyfill-useragent-normaliser'
import polyfillLibrary from '@mrhenry/polyfill-library'

const promiseString = polyfillLibrary.getPolyfillString({
    ua: new UA('Chrome/63'),
    minify: true,
    features: {
        es2015: { flags: ['gated'] },
        es2016: { flags: ['gated'] },
        es2017: { flags: ['gated'] },
        es2018: { flags: ['gated'] },
        es2019: { flags: ['gated'] },
        es2020: { flags: ['gated'] },
        es2021: { flags: ['gated'] },
        es2022: { flags: ['gated'] },
        fetch: { flags: ['gated'] },
    },
    excludes: ['AggregateError'],
    stream: false,
}) as Promise<string>

promiseString.then((bundleString) => {
    if (typeof bundleString === 'string') {
        fs.writeFileSync('./public/static/js/polyfill.js', bundleString)
    }
})
