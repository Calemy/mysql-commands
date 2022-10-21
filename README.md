# mysql-commands
a promised based mysql wrapper in nodejs!
<br>
some updates still expected

## How to use it

#### Create the wrapper

```js
const mysql = require('mysql-commands')

const database = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: db
})
```

#### Select

You can select single or multiple records from the database with ease!

```js

/* 
    Optional
    values: the values you want to recieve - default: *
    condition: what condition has to be applied to return the result
    sort: what you want to sort by
    limit: how many rows to return - default: Infinite (only available on multi search)
    offset: offset result by x amount - default: 0 (only available on multi search)
*/

const values = ["id", "username"]
const condition = "id = 1"
const sort = ["id DESC"]

//Search for multiple records, sort by id decreasing and limit results to 50
const users = await database.select("users", { values, sort, limit: 50 })

//Search for single record
const user = await database.selectOne("users", { values, condition })
```

#### Insert

You can also insert records with pretty much no effort!
<br>
There is also an updateOnDuplicate option that can be selected.

```js
let user = {
    id: 1,
    username: "Nanoo",
    rank: "Admin"
}

await database.insert("users", { object: user })

//Update on duplicate

user.username = "Lemres"

await database.insert("users", { object: user, updateOnDuplicate: true})
```

#### Update

Even updating does not require a lot of work!

```js

let user = {
    id: 1,
    username: "Nanoo",
    rank: "Admin"
}

await database.update("users", { object: user, condition: "id = 1"})

```

#### Tips
If you can't find the function that you require or a bug then feel free to use your own query with the request function.
<br>
You don't need to worry about database timeouts since this module does handle connections automatically for you!
<br>
And also try to add the issue to the Repository so it can get into this module.

```js
await database.request(`your own query`)
```

#### Contribute

We would love to extend our functionality with you as contributer.
<br>
If you got any ideas open a pull request and we see how we can implement it!