FROM node:lts-slim

# install simple http server for serving static content
#RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

ENV http_proxy='http://proxy4.unal.edu.co:8080' \
    ftp_proxy='http://proxy4.unal.edu.co:8080' \
    https_proxy='http://proxy4.unal.edu.co:8080' \
    all_proxy='http://proxy4.unal.edu.co:8080' \
    HTTP_PROXY='http://proxy4.unal.edu.co:8080' \
    HTTPS_PROXY='http://proxy4.unal.edu.co:8080' \
    FTP_PROXY='http://proxy4.unal.edu.co:8080' \
    ALL_PROXY='http://proxy4.unal.edu.co:8080'

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "serve" ]
