#!/bin/bash

headline() {
    echo "$(tput bold)${1}$(tput sgr0)"
}

if [[ -z "$1" ]]; then
  echo "Usage: test.sh <project ID>"
  exit 1
fi

pushd functions

PROD_FIRESTORE=@google-cloud/firestore@4.5.0
TEST_FIRESTORE=googleapis/nodejs-firestore#mrschmidt/lazy
PROD_FUNCTIONS=firebase-functions@3.14.0
TEST_FUNCTIONS=./firebase-functions-3.14.0.tgz

echo "Using project $1"
headline "Running vanilla test:"
npm install --save $PROD_FUNCTIONS $PROD_FIRESTORE
firebase deploy --project $1
VANILLA=`curl https://us-central1-$1.cloudfunctions.net/measureLatency`

#headline "Running optimized functions test:"
#npm install --save $TEST_FUNCTIONS $PROD_FIRESTORE
#firebase deploy --project $1
#OPTIMIZED_FUNCTIONS=`curl https://us-central1-$1.cloudfunctions.net/measureLatency`

#headline "Running optimized functions + firestore test:"
#npm install --save $TEST_FUNCTIONS $TEST_FIRESTORE
#firebase deploy --project $1
##OPTIMIZED_BOTH=`curl https://us-central1-$1.cloudfunctions.net/measureLatency`

headline "Running optimized firestore test:"
npm install --save $PROD_FUNCTIONS $TEST_FIRESTORE
firebase deploy --project $1
OPTIMIZED_FIRESTORE=`curl https://us-central1-$1.cloudfunctions.net/measureLatency`

echo "Vanilla:"
echo $VANILLA

#echo ""
#echo "Optimized firebase-functions SDK:"
#echo $OPTIMIZED_FUNCTIONS

echo ""
echo "Optimized @google-cloud/firestore SDK:"
echo $OPTIMIZED_FIRESTORE

#echo ""
#echo "Optimized both SDKs:"
#echo $OPTIMIZED_BOTH


popd # functions
