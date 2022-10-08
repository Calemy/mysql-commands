module.exports = class mysqlCommands {
    constructor(connection){
        try {
            connection.awaitQuery(`SHOW DATABASES;`)
            this.con = connection
        } catch {
            throw new Error("Wrong module. Please use mysql-await in order to use these utilities")
        }
    }

    async request(query){
        return await con.awaitQuery(query)
    }

    async requestOne(query){
        return (await con.awaitQuery(query))[0]
    }

    async select(table, {values = ["*"], condition, sort, limit = 0, offset = 0}){
        return this.request(`
        SELECT ${values.join(', ')} FROM ${table}
        ${condition.length > 0 ? "WHERE " + condition : ""}
        ${sort.length > 0 ? " ORDER BY " + sort.join(", ") : ""}
        ${limit > 0 ? " LIMIT " + limit : ""}
        ${offset > 0 ? " OFFSET " + offset : ""}
        `)
    }

    async selectOne(table, {condition, sort}){
        return this.requestOne(`
        SELECT ${values.join(', ')} FROM ${table}
        ${condition.length > 0 ? "WHERE " + condition : ""}
        ${sort.length > 0 ? " ORDER BY " + sort.join(", ") : ""}
        `)
    }

    async insert(table, fields, values){
        if(fields.length != values.length) throw new Error("Fields and values must be the same length")
        let str = "";
    
        for(var i = 0; i < values.length; i++){
            if(typeof(values[i]) == 'string'){
                str += `"${values[i]}"`
            } else {
                str += values[i]
            }
    
            if(i < (values.length -1)){
                str += ", "
            } 
        }
    
        return await this.request(`INSERT INTO ${table} (${fields.join(', ')}) VALUES (${str})`)
    }

    async update(table, fields, values, { condition }){
        if(fields.length != values.length) throw new Error("Fields and values must be the same length")
        let str = "";

        for(var i = 0; i < values.length; i++){
            str += `${fields[i]} = `
            if(typeof(values[i]) == 'string'){
                str += `"${values[i]}"`
            } else {
                str += values[i]
            }
    
            if(i < (values.length -1)){
                str += ", "
            }
        }

        return await this.request(`UPDATE ${table} SET ${str} ${condition.length > 0 ? "WHERE " + where : ""}`)
    }
}