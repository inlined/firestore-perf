#!/bin/bash

if [[ -z "$1" ]]; then
  echo "Usage: test.sh <project ID>"
  exit 1
fi

pushd functions

echo "Using project $1"
echo "Running vanilla test:"
npm install --save firebase-functions@3.14.1
firebase deploy --project $1
VANILLA=`curl https://us-central1-$1.cloudfunctions.net/measureLatency`

echo "Running optimized test:"
npm install --save ./firebase-functions-3.14.2.tgz
firebase deploy --project $1
OPTIMIZED=`curl https://us-central1-$1.cloudfunctions.net/measureLatency`

echo "Vanilla:"
echo $VANILLA

echo ""
echo "Optimized:"
echo $OPTIMIZED

popd # functions
