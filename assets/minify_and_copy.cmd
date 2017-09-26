del css\style.min.css
copy /b css\*.css css\style.css & java -jar css\yuicompressor-2.4.8.jar css\style.css --type css -o css\style.min.css
del js\script.min.js
copy /b js\*.js js\script.js & java -jar js\yuicompressor-2.4.8.jar js\script.js --type js -o js\script.min.js
copy /Y css\style.min.css D:\www-hist\webstore\public\assets\backend\css
copy /Y js\script.min.js D:\www-hist\webstore\public\assets\backend\js