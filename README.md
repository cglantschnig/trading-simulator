# Trading 

A small application consisting of 3 parts. 

* **data provider** - creates trading points and puts them into a queue
* **data processor** - reads the trading points from a queue and provides them through an API
* **trading ui** - an simple UI where you can view the trading points from the latest hour and see the average values from the last 24h, last month and last year

## Quickstart

Make sure to install Docker and Docker Compose on your machine. Then you can simply run

    docker-compose up

and visit `localhost` in your browser