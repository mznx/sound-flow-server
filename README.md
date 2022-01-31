# Sound Flow Server
The project is a backend for the [Sound Flow](https://github.com/mznx/sound-flow/) project. Based on [Express](https://expressjs.com/).

## Installation
1. Install dependencies with command `npm install`
2. Create **.env** file in project directory with content:
   ```
   SPOTIFY_CLIENT_ID='client_id'
   SPOTIFY_CLIENT_SECRET='client_secret'
   ```
3. Run `npm run tsc` and then `npm run dev`
4. (Additional) To access the server via https, you need to configure a reverse proxy. Nginx config example:
   ```
   server {
       listen 7000 ssl;
   
       ssl_certificate ./ssl-cert.crt;
       ssl_certificate_key ./ssl-cert.key;
       ssl_session_timeout 5m;
       ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
   
       location / {
           proxy_pass http://localhost:7001;
           proxy_set_header Host $host;
           proxy_set_header X-Forwarder-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```
