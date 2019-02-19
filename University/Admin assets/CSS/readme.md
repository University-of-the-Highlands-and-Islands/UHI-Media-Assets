# CSS documentation

Kenny uses Webstorm as IDE:
https://www.jetbrains.com/webstorm/


## Offline build process

Ensure Admin privileges on local system for installation.

Install Node:
https://nodejs.org/en/

Check installation:
`node -v`

...

### 20171027 notes

- Node.js v6.11.5 LTS with npm v3.10.10 from https://nodejs.org/en/
- Update npm to v5.5.1: npm install npm@latest –g from https://www.npmjs.com/get-npm
- Install Gulp CLI v1.4.0: npm install --global gulp-cli from https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
- In working directory: npm init to create package.json
- Install gulp v3.9.1 in wd: npm install --save-dev gulp
- Create gulpfile.js
- Test with gulp command in wd
- Install PostCSS v4.1.1 globally: npm install -g postcss-cli see https://www.sitepoint.com/an-introduction-to-postcss/
- Install Autoprefixer globally: npm install -g autoprefixer see https://github.com/postcss/autoprefixer
- npm install --save-dev gulp-postcss
- npm install --save-dev gulp-sourcemaps
- npm install --save-dev postcss postcss-cssnext

#### StyleLint

- npm setup: https://www.lynda.com/MyPlaylist/Watch/13149947/785582?autoplay=true
- https://css-tricks.com/stylelint/
- https://github.com/olegskl/gulp-stylelint
- https://blog.jetbrains.com/webstorm/2016/09/webstorm-2016-3-eap-163-4830-stylelint-usages-for-default-exports-and-more/

try also Prettier.io ? 