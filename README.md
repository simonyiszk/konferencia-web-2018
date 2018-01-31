# Simonyi Konferencia weboldal

[![Build status](https://img.shields.io/travis/simonyiszk/konferencia-web/master.svg)](https://travis-ci.org/simonyiszk/konferencia-web)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A XV. Simonyi Konferencia weboldala.

## Build

A weboldal statikusan kiszolgálható változatának elkészítéséhez az alábbi
fejlesztői eszközök szükségesek:

* [Node.js][]
* [Yarn][]

A projekt főkönyvtárában a függőségek telepítését (`yarn install`) követően a
`yarn build` parancs kiadására létrejön egy `public` mappa, melynek tartalma egy
statikus fájlszerveren keresztül osztható meg a weboldal látogatóival.

[node.js]: https://nodejs.org
[yarn]: https://yarnpkg.com
