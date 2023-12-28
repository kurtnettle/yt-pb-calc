# yt-pb-calc (Youtube-Playback-Calculator)

couldn't find any good name. :(

![example-gif](https://raw.githubusercontent.com/kurtnettle/yt-pb-calc/main/assets/example.gif)

# Installation

+ Head over to [releases](https://github.com/kurtnettle/yt-pb-calc/releases)
+ Click `yt-pb-calc_firefox_self_hosted.xpi`
+ Firefox will now show you a prompt of addon installation.

# Setup Development Environment 
```sh
python -m venv venv/py
source venv/py/bin/activate
pip install nodeenv==1.8.0

nodeenv --node 20.6.1 --npm 9.8.1 venv/node
source venv/node/bin/activate

npm i --save-dev
```

# Build Extension
```
npm run build
```

