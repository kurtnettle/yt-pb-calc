# yt-pb-calc (Youtube-Playback-Calculator)

couldn't find any good name. :(

![example-gif](https://raw.githubusercontent.com/kurtnettle/yt-pb-calc/main/assets/example.gif)

# Setup Development Environment 
```
python -m venv venv/py
source venv/py/bin/activate
pip install nodeenv==1.8.0

nodeenv --node 20.6.1 --npm 9.8.1 venv/node
source venv/node/bin/activate

npm i --save-dev rollup eslint-config-google
```

# Build Extension
```
npm run build
```

