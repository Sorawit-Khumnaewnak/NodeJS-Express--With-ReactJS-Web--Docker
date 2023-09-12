cd /usr/src/app
npm install
cd /usr/src/app/client
npm install
npm run build
cd /usr/src/app
pm2-docker process.yml

