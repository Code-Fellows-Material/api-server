# api-server

Creates API server using postgres DB deployed to heroku, served with Express for Code Fellows 401


## HTTP Express Server deployed on Heroku.

Deployed at: https://cf-basic-api-server.herokuapp.com/

![Data Flow](./UML.jpg)

## Installation

to install run `git clone git@github.com:Kellen-Linse/api-server`

`cd` into express-server-deployment

run `npm install`

## Usage

To start server run : `npm start`

To test server run: `npm test`

## Routes

* POST `/food/?food=<insert food>&meal=<insert meal>` - creates a food 
* POST `/dog/?type=<insert type>&size=<insert size>` - creates a dog 
  
## Features


* Object 

        food {
          food: string,
          meal: string
        }

        dog {
          type: string,
          size: string
        }
