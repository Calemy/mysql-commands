# mysql-commands
a promised based mysql wrapper in nodejs - only compatible with mysql-await!
<br>
some updates still expected

## How to use it

#### Create the wrapper

```js
const mysql = require('mysql-await')
const mysqlCommands = require('mysql-commands')

const connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: db
})

const database = new mysqlCommands(connection)
```

#### Select

You can select single or multiple records from the database with ease!

```js

/* Optional
    values: the values you want to recieve - default: *
    condition: what condition has to be applied to return the result
    sort: what you want to sort by
    limit: how many rows to return - default: Infinite (only available on multi search)
    offset: offset result by x amount - default: 0 (only available on multi search)
}
*/

const values = ["id", "username"]
const condition = ["id = 1"]
const sort = ["id DESC"]

//Search for multiple records, sort by id decreasing and limit results to 50
const users = await database.select("users", { values, sort, limit: 50 })

//Search for single record
const user = await database.select("users", { values, condition })
```

#### Insert

You can also insert records with pretty much no effort!

```js
const user = {
    id: 1,
    username: "Nanoo",
    rank: "Admin"
}

const keys = Object.keys(user)
const values = []

for(let j = 0; j < keys.length; j++) {
    values[j] = user[keys[j]]
}

database.insert("users", keys, values)
```

#### Update

Even updating does not require a lot of work!

```js

const user = {
    id: 1,
    username: "Lemres",
    rank: "Admin"
}

const keys = Object.keys(user)
const values = []

for(let j = 0; j < keys.length; j++) {
    values[j] = user[keys[j]]
}

database.update("users", keys, values, "id = 1")

```

#### Tips
If you can't find the function that you require or a bug then feel free to use your own query with the request function.
<br>
And also try to add the issue to the Repository so it can get into this module.

```js
database.request(`your own query`)
```

#### Contribute

We would love to extend our functionality with you as contributer.
<br>
If you got any ideas open a pull request and we see how we can implement it!