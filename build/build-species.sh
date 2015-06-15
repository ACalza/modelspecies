#!/bin/bash

# Set up for curl: cURL URL Request Library
url="http://localhost:3000/create/specie"
method="POST"
header="Content-Type:application/json"

# List of specie jsons
species=`ls species | grep \.*\.json`

for specie in $species
do
    curl -X $method $url --data "@species/$specie" --header $header
done
