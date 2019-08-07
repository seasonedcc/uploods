# uploods

[![Maintainability](https://api.codeclimate.com/v1/badges/18fbd22734bcc645f72b/maintainability)](https://codeclimate.com/github/SeasonedSoftware/uploods/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/18fbd22734bcc645f72b/test_coverage)](https://codeclimate.com/github/SeasonedSoftware/uploods/test_coverage)
![npm bundle size](https://img.shields.io/bundlephobia/min/uploods)

Describe uploods here.

| Property                            |  Type  | Required |                     Default                     |
| ----------------------------------- | :----: | :------: | :---------------------------------------------: |
| [onChange](#onchange)               |  Func  |    ✔     |                        -                        |
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

A function to be called every time files are included or removed from the list. It receives an array with all the files, each one represented by an object with the following properties:

```
  {
  name: <STRING> 'filename',
  parsed: <STRING>  'base64 string representation of file',
  size: <INT> size in bytes,
  type: <STRING> 'file MIME type',
}
```

ex: `files => console.log('Uploaded files: ',files)`

## containerStyle

An object containing the style to be applied to component's container, an MUI's [Paper](https://material-ui.com/components/paper/).

## inputStyle

An object containing the style to be applied to the input.

## hideList

If true, will hide the list of files.

## accept

An array containg MIME file types accepted. Supports wildcards like `image/*`

## maxSize

Maximum size accepted for each file, measured in KB.

## elevation

Elevation prop passed to the container, an MUI's [Paper](https://material-ui.com/components/paper/)

## text

Text shown in the input while waiting for files.

## dragActiveText

Text shown when user is dragging files over the component.

## unsupportedText = 'Unsupported File...'

Text shown when a file is rejected (either by file type or size).

```

```
