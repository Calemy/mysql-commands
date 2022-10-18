const mysql = require("mysql-await")

class connectionCommands {
    constructor(){
        this.connection = mysql.createConnection(...arguments);
        this.config = this.connection.config;
    }

    connect(){
        this.connection = new connectionCommands(this.config).connection
    }

    async request(query){
        this.connect()
        const request = this.connection.awaitQuery(query)
        await this.connection.awaitEnd()
        return request
    }

    async requestOne(query){
        this.connect()
        const request = (await this.connection.awaitQuery(query))[0]
        await this.connection.awaitEnd()
        return request
    }

    async select(table, { values = ["*"], condition, sort, limit = 0, offset = 0 }){
        return this.request(`
        SELECT ${values.join(', ')} FROM ${table}
        ${condition?.length > 0 ? "WHERE " + condition : ""}
        ${sort?.length > 0 ? " ORDER BY " + sort.join(", ") : ""}
        ${limit > 0 ? " LIMIT " + limit : ""}
        ${offset > 0 ? " OFFSET " + offset : ""}
        `)
    }

    async selectOne(table, { values = ["*"], condition, sort }){
        return this.requestOne(`
        SELECT ${values.join(', ')} FROM ${table}
        ${condition?.length > 0 ? "WHERE " + condition : ""}
        ${sort?.length > 0 ? " ORDER BY " + sort.join(", ") : ""}
        `)
    }

    async insert(table, { fields, values, object, result = false }){
        let f = object ? Object.keys(object) : fields
        let v = object ? Object.values(object) : values

        if(!f || !v) throw new Error("Fields can't be empty")

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

module.exports = new class mysqlCommands {
    createConnection(){
        return new connectionCommands(...arguments);
    }
}