rm js/script.min.js
rm css/style.min.css
cat js/*.js | yuicompressor --type js -o js/script.min.js
cat css/*.css | yuicompressor --type css -o css/style.min.css
cp js/script.min.js /Applications/XAMPP/htdocs/floweradvisor/webstore/public/assets/backend/js
cp css/style.min.css /Applications/XAMPP/htdocs/floweradvisor/webstore/public/assets/backend/css
cp glyphicons.css /Applications/XAMPP/htdocs/floweradvisor/webstore/public/assets/backend
cp js/script.min.js /Applications/XAMPP/htdocs/skedd/public/assets/js
cp css/style.min.css /Applications/XAMPP/htdocs/skedd/public/assets/css
cp js/script.min.js /Applications/XAMPP/htdocs/urlck/public/assets/js
cp css/style.min.css /Applications/XAMPP/htdocs/urlck/public/assets/css
