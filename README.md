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
- Open [Gcloud Console](https://console.cloud.google.com/home/dashboard?project=cem-admin)
- Open [Bucket](https://console.cloud.google.com/storage/browser/cem-admin?project=cem-admin-178217)
- Remove all files inside the Bucket
- Upload `app.yaml` and `build/` to the Bucket
- Open Gcloud Console Shell
- `rm -rf cem-admin && mkdir cem-admin && gsutil rsync -r gs://cem-admin ./cem-admin`
- `gcloud app deploy` to start deploying project
- Open [this](http://cem-admin-178217.appspot.com) address in the browser
