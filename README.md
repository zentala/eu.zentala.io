

# 🇪🇺 EU Reform Vision [![Website status](https://img.shields.io/uptimerobot/status/m787025974-4e422831aded279b03c05d57)](https://stats.uptimerobot.com/rB392tAOkQ) [![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/zentala/eu.zentala.io)
## 🌍 Overview
Vision about how we could reform and modernize the European Union in the spirit of Green Sustainability, Information Economy and 4th Industrial Revolution. I vision this ideas in the EU, because this is probably a place where presented reforms could give the biggest economical boost and improvement quality of living. But a lot of presented modernization ideas could be introduced in other parts of the world. This is book about what about is the political modernization in XXI century for the western countries - how we should think about political reforms in those times? What goals this political reforms should achive to handle challenges, the XXI century put in front of us? 

Read it online: [website](https://eu.zentala.io/). 

This document contains documentation for futher developers and contributors only.


## ⚡️ Online development
Start __ready-to-code development environment__ for this project directly from your __browser__:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/...)

Just click the button above and register with your GitHub account if needed. After a while (building time) your IDE will be ready for development. No manual setup is required.


## 🏗  About the setup

### Serverless with... ☁️
* [Gatsby](https://www.gatsbyjs.org) - markdown static page generator
* [GitHub Pages](https://pages.github.com/) - static site hosting service
* [GitPod](https://gitpod.com/) - ready-to-code development environment
* [UptimeRobot](https://uptimerobot.com/) - website status every 5 minutes

### Project structure 🌳
* `develop` branch
  * contains source code
  * from here you want to develop
  * here you want to merge you PR's
  * important files:
    * [content/](content/) - source of all articles written in markdown
    * [src/](src/) - Gatsby website theme (React.js)
    * [public/](public/) - temporary project built (git-ignored by default)
* `deploy` branch
  * contains built package that is served to the end user
  * NEVER edit it manually
  * deploy here from `develop` with `npm run deploy`
  * important files:
    * `CNAME` file is required for github to know the website domain
    * `index.html` is an entry point for the server


## 💻 Local development
Alternative for using GitPod described in `Online development` section.

### Prerequisites 🔒
I suggest to install and use [Node Version Manager](https://github.com/nvm-sh/nvm) in order to get proper [Node.js](https://nodejs.org/en/) version. Alternatively you can manually get and install [Node.js 10.x](https://nodejs.org/en/download/) (recommended). In this case just skip `nvm use .` command in the next section.

### Setting up 🛠️
Execute in the console:
``` console
git clone git@github.com:zentala/eu.zentala.io.git
cd ue.zentala.io/
nvm use .
npm install
npm run start
```

After a while local server should be running under [http://localhost:8000/](http://localhost:8000/).

### Common issues
* `Something went wrong installing the "sharp" module` - [unsure you are using proper node version](https://techstacker.com/gatsby-something-went-wrong-installing-sharp-module-fix/), in my case NVM didn't load Node 10, instead I installed dependencies in Node 20 where it didn't work.

## ☝ Future development

### Known issues 💩
* submenus are not expandable
* improve mobile menu
* connect with some donations system? (Ko-fi is just a mock)

### Desired features 💥
* text logo (idea) needed
* comments to the specyfic part of text
* versioned webpage (releases)
* header string in logo
* light swith to the right or remove it for now
* _read the 5h book in 20 minutes_ - summaries
* wiki, interactive map character
* you can see what you already saw/readed
* mindmap, maybe embbed?
* add to the article tag with readenes level - some WIP information/warning should be presented when rendering page