# CEM-ADMIN

Admin Page for CEM

## Instruction

- `git clone https://github.com/sunway-team/cem-admin.git`
- `cd cem-admin`
- `cp .env.development.example .env`
- `npm i` to install dependencies
- `npm start` to start the project

## Deployment

- `git clone https://github.com/sunway-team/cem-admin.git`
- `cd cem-admin`
- `cp .env.production.example .env`
- `npm i` to install dependencies
- `npm run build` to build project
- Open [Gcloud Console](https://console.cloud.google.com/home/dashboard?project=acm-dtu)
- Open [Bucket](https://console.cloud.google.com/storage/browser/acm-dtu?project=acm-dtu)
- Remove all files inside the Bucket
- Upload `app.yaml` and `build/` to the Bucket
- Open Gcloud Console Shell
- `rm -rf acm-dtu && mkdir acm-dtu && gsutil rsync -r gs://acm-dtu ./acm-dtu`
- `gcloud app deploy` to start deploying project
- Open [this](http://acm-dtu.appspot.com) address in the browser
