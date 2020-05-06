# WriteBuildInfoJsonFilePlugin
> package: `write-build-info-json-webpack-plugin`

A webpack plugin that generates a BUILD_INFO.json file with timestamp, git-sha and other custom info after compilation is done.



## Install

```
# npm
npm i write-build-info-json-webpack-plugin -D

# yarn
yarn add write-build-info-json-webpack-plugin -D
```


## Usage


```
const WriteBuildInfoJsonFilePlugin = require('write-build-info-json-webpack-plugin');

const buildTime = new Date(); 
const gitSha = ... extract head git commit SHA, eg via simple-git 


# then later, add to the `plugins` section of the webpack config

plugins = [

    new WriteBuildInfoJsonFilePlugin(buildTime, gitSha),

]
```

The plugin hooks into the `done` part of the webpack compilation and will produce a file named `BUILD_INFO.json` in the root of the webpack output folder.

You can read the contents of the `BUILD_INFO.json` file in your app and display some of that info in an "About" or "Version" page/section.




## Contribute
PRs accepted.

## License
MIT (see LICENSE file)
