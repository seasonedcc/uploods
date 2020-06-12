# uploods

[![Maintainability](https://api.codeclimate.com/v1/badges/18fbd22734bcc645f72b/maintainability)](https://codeclimate.com/github/SeasonedSoftware/uploods/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/18fbd22734bcc645f72b/test_coverage)](https://codeclimate.com/github/SeasonedSoftware/uploods/test_coverage)
![npm bundle size](https://img.shields.io/bundlephobia/min/uploods)

A package with components for file uploads.

## Installation

```
yarn add uploods
```

If you want to use "upload on drop", also install firebase.
```
yarn add firebase
```

### Storage host

#### Firebase setup

You need two things: An api key and a bucket link.

Go to https://console.firebase.google.com/

##### Create a project
1. Click "Add project" or "Create project", whichever appears to you
2. Choose a name for the project
3. Uncheck "Activate Google Analytics" if you only want to use storage
4. Click "Create project"

##### Create a web app for the project to get an API key
1. Click the project you just created under "Your Firebase projects". You should be at "https://console.firebase.google.com/u/0/project/<your-project>/overview"
2. Under you app name, click "Add app" or choose the Web option under "Start adding Firebase to your app".
3. Choose a name for your web app. Uncheck "Configure Firebase hosting for this app".
4. Click Register app
5. Firebase will load "Add Firebase SDK" and show its full script.
6. Copy your `apiKey` to use in your env vars. You can disregard the rest if you're using only storage.
  
```
...

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "api-key",
    ...
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
```

##### Configure storage to get a Bucket URL
1. Go back to the overview console
2. Click "Develop" on the side bar
3. Click "Storage"
4. Click "First steps"
5. A dialog will open with security rules. Click "Next".
6. Cloud store location: By default, choose `us-east-1`. That one is included in the Spark plan, the free one.
7. Click "Finish" and wait for it to create your default bucket.
8. It will redirect you to your bucket. The URL is like `https://console.firebase.google.com/u/0/project/<your-project>/storage/<your-bucket>/files`
9. On the `Files` tab, copy the bucket link: `gs://<your-bucket-id>.appspot.com`. Use that link to identify your bucket.
10. Go to `Rules` tab and edit the rules to enable read, write to all.
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write;
    }
  }
}
```
11. Publish the rules. Note that Firebase doesn't recommend using these settings for production.

## Components

### DropZone

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
