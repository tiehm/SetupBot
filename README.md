# SetupBot

Discord Bot to setup Discord Servers; just add a server as a template and use it in the next one.

## Getting Started

Following instruction will give you the ability to run this on your own machine. 

### Prerequisites

What things you need to install the software and how to install them

- MySQL
- NodeJS v8.9 or later

Create a `.env` file in the project root and fill out following properties

````
TOKEN=DISCORD-APP-TOKEN
DEBUG=[no use yet]
DB_HOST=[Database host]
DB_USER=[Database user]
DB_PASS=[Database user's password]
DB_NAME=[Database name]
````

Also update the [config](config.js) file with your data.

### Installing & Running

Install all dependencies

```
npm i
```

Once finished, run the typescript compiler

```
tsc
```

Run the application with 
````
npm run start
````

## Running the tests

There are no tests for this project.

## Built With

* [discord.js](https://discord.js.org) - API Wrapper
* [MySQL](https://www.mysql.com/) - Database
* [typescript](https://www.typescriptlang.org/) - Used for better code

## Contributing

Please open a pull request.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details
