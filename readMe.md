# node-2-node social media app in react
## Dependencies Used:
- sanity.io for backend (blazing fast content creation and storage, just like a database)
    - @sanity/cli
    - @sanity/client
    - @sanity/image
- create-react-app
    - react-router-dom
    - react-icons
    - react-masonry-css
    - react-loader-spinner
- tailwindcss 
    -autoprefixer
    -postcss
- @react-oauth/google
- uuid

## Tasklist
- [x] backend setup
    - [x] initial setup of sanity.io
    - [x] schema declarations
- [] frontend
    - [] home
    - [] login
    



## File Structure
```
node-II-node
┣   .vscode
┣   node-by-node_backend/
┃   ┣   .sanity/
┃   ┃       ┗ runtime/
┃   ┣   node_modules/
┃   ┃       ┗ .package-lock.json
┃   ┣   schemas/gi
┃   ┃       ┣ comment.js
┃   ┃       ┣ index.js
┃   ┃       ┣ pin.js
┃   ┃       ┣ postedBy.js
┃   ┃       ┣ save.js
┃   ┃       ┗ user.js
┃   ┣   static/
┃   ┃       ┗ .gitkeep
┃   ┣   .eslintrc
┃   ┣   .gitignore
┃   ┣   package-lock.json
┃   ┣   package.json
┃   ┣   README.md
┃   ┣   sanity.cli.js
┃   ┗   sanity.config.js
┣   node-2-node_frontend/
┃   ┣   node_modules/
┃   ┃       ┗ .package-lock.json
┃   ┣   public/
┃   ┃       ┣ favicon.ico
┃   ┃       ┣ index.html
┃   ┃       ┣ logo192.png
┃   ┃       ┣ logo512.png
┃   ┃       ┣ manifest.json
┃   ┃       ┗ robots.txt
┃   ┣   src/
┃   ┃       ┣ components/
┃   ┃       ┣ containers/
┃   ┃       ┣ App.js
┃   ┃       ┣ index.css
┃   ┃       ┣ index.html
┃   ┃       ┗ index.js
┃   ┣   .gitignore
┃   ┣   package-lock.json
┃   ┣   package.json
┃   ┣   postcss.config.js
┃   ┣   README.md
┃   ┗   tailwind.config.js
┣   .gitignore
┗   readMe.md
```
