# uploods

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe uploods here.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo

| Property                            |  Type  | Required |                     Default                     |
| ----------------------------------- | :----: | :------: | :---------------------------------------------: |
| [onChange](#name)                   |  Func  |    ✔     |                        -                        |
| [containerStyle](#containerstyle)   | Object |          |                        -                        |
| [inputStyle](#inputstyle)           | Object |          |                        -                        |
| [hideList](#hidelist)               |  Bool  |          |                      false                      |
| [accept](#accept)                   | Array  |          |                      ['*']                      |
| [maxSize](#maxsize)                 |  Int   |          |                    10 000 kb                    |
| [elevation](#elevation)             |  Int   |          |                        0                        |
| [text](#text)                       | String |          | 'Drag some files here or click to select files' |
| [dragActiveText](#dragactivetext)   | String |          |                  'Drop here!'                   |
| [unsupportedText](#unsupportedtext) | String |          |              'Unsupported File...'              |

## onChange

A function to be called everytime a file is included (or removed from list)
ex: `files => console.log('Uploaded files: ',files)`

## containerStyle

An object containing the style to be applied to component's container, an MUI's [Paper](https://material-ui.com/components/paper/).

## inputStyle

An object containing the style to be applied to the input

## hideList

If true, will hide the files list

## accept

An array containg MIME file types accepted. Supports wildcards like `image/*`

## maxSize = 10000

Maximum size accepted for each file, measured in KB.

## elevation = 0

Elevation prop passed to the container, an MUI's [Paper](https://material-ui.com/components/paper/)

## text

Text shown in the input while waiting for files.

## dragActiveText

Text shown when user is dragging files over the component.

## unsupportedText = 'Unsupported File...'

Text shown when a file is rejected (either by file type or size).
