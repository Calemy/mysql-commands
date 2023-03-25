const mysql = require("mysql-await")

class connectionCommands {
    constructor(){
        this.connection = mysql.createConnection(...arguments);
        this.config = this.connection.config;
        this.request = async (query) => await this.connection.awaitQuery(query)
        this.requestOne = async (query) => (await this.connection.awaitQuery(query))[0]
        this.select = async (table, { values = ["*"], condition, sort, limit = 0, offset = 0 } = {}) => await this.request(`SELECT ${values.join(', ')} FROM ${table} ${condition?.length > 0 ? "WHERE " + condition : ""}${sort?.length > 0 ? " ORDER BY " + sort.join(", ") : ""}${limit > 0 ? " LIMIT " + limit : ""}${offset > 0 ? " OFFSET " + offset : ""}`)
        this.selectOne = async (table, { values = ["*"], condition, sort, prepared = [] } = {}) => await this.requestOne(`SELECT ${values.join(', ')} FROM ${table} ${condition?.length > 0 ? "WHERE " + condition : ""}${sort?.length > 0 ? " ORDER BY " + sort.join(", ") : ""}`)
        this.count = async (table, { condition } = {}) => (await this.requestOne(`SELECT COUNT(1) count FROM ${table} ${condition?.length > 0 ? "WHERE " + condition : ""}`))?.count
    }

    async insert(table, { fields, values, object, updateOnDuplicate = false }){
        let f = object ? Object.keys(object) : fields
        let v = object ? Object.values(object) : values

        if(!f || !v) throw new Error("Fields can't be empty")

        if(f.length != v.length) throw new Error("Fields and values must be the same length")
        let str = "";
        let updateStr = "";
    
        for(var i = 0; i < v.length; i++){
            updateStr += `${f[i]} = `
            if(typeof(v[i]) == 'string'){
                str += `"${v[i]}"`
                updateStr += `"${v[i]}"`
            } else {
                str += v[i]
                updateStr += v[i]
            }
    
            if(i < (v.length -1)){
                str += ", "
                updateStr += ", "
            } 
        }
    
        return await this.request(`INSERT INTO ${table} (${f.join(', ')}) VALUES (${str})${updateOnDuplicate ? " ON DUPLICATE KEY UPDATE " + updateStr : ""}`)
    }

    async update(table, { fields, values, object, condition }){
        let f = object ? Object.keys(object) : fields
        let v = object ? Object.values(object) : values

        if(!f || !v) throw new Error("Fields can't be empty")

        if(f.length != v.length) throw new Error("Fields and values must be the same length")
        let str = "";
    
        for(var i = 0; i < v.length; i++){
            str += `${f[i]} = `
            if(typeof(v[i]) == 'string'){
                str += `"${v[i]}"`
            } else {
                str += v[i]
            }
    
            if(i < (v.length -1)){
                str += ", "
            } 
        }

        return await this.request(`UPDATE ${table} SET ${str} ${condition?.length > 0 ? "WHERE " + condition : ""}`)
    }

    async create(table, { fields, types, object, ifNotExists = true, engine = "INNODB" }){
        let f = object ? Object.keys(object) : fields
        let v = object ? Object.values(object) : types

        if(!f || !v) throw new Error("Fields can't be empty")

        if(f.length != v.length) throw new Error("Fields and values must be the same length")
        let str = "";
    
        for(var i = 0; i < v.length; i++){
            str += `${f[i]} ${v[i]}`
    
            if(i < (v.length -1)){
                str += ", "
            } 
        }

        this.request(`CREATE TABLE${ifNotExists ? " IF NOT EXISTS" : ""} ${table} (${str}) ENGINE=${engine};`)
    }

    close() {
        return new Promise((resolve, reject) => {
          this.connection.end((err) => {
            if (err) {
              this.connection.emit(`error`, err);
              return this.config.throwErrors ? reject(err) : resolve()
            }
            resolve();
          });
        });
      }

}

class poolCommands extends connectionCommands {
    constructor(){
        super(...arguments)
        this.connection = mysql.createPool(...arguments);
        this.config = this.connection.config;
    }
}

module.exports = new class mysqlCommands {
    createConnection(){
        return new connectionCommands(...arguments);
    }
    createPool(){
        return new poolCommands(...arguments);
    }
}