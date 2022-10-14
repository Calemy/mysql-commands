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

    async insert(table, {fields, values, object, result = false}){
        let f = object ? object.keys() : fields
        let v = object ? object.values() : values

        if(f.length != v.length) throw new Error("Fields and values must be the same length")
        let str = "";
    
        for(var i = 0; i < v.length; i++){
            if(typeof(v[i]) == 'string'){
                str += `"${v[i]}"`
            } else {
                str += v[i]
            }
    
            if(i < (v.length -1)){
                str += ", "
            } 
        }
    
        return await this.request(`INSERT INTO ${table} (${f.join(', ')}) VALUES (${str})`)
    }

    async update(table, { fields, values, object, condition }){
        let f = object ? object.keys() : fields
        let v = object ? object.values() : values

        if(f.length != v.length) throw new Error("Fields and values must be the same length")
        let str = "";
    
        for(var i = 0; i < v.length; i++){
            if(typeof(v[i]) == 'string'){
                str += `"${v[i]}"`
            } else {
                str += v[i]
            }
    
            if(i < (v.length -1)){
                str += ", "
            } 
        }

        return await this.request(`UPDATE ${table} SET ${str} ${condition.length > 0 ? "WHERE " + where : ""}`)
    }
}