class mysqlCommands {
    createConnection({ host: string, user: string, password: string, database: string }): connectionCommands
    createPool({ host: string, user: string, password: string, database: string }): poolCommands
}

class connectionCommands {
    async request(query: string): Promise<Array<object>>
    async select(table: string, opts?: { values?: Array<string>, condition?: string, sort?: Array<string>, limit?: number, offset?: number }): Promise<Array<object>>
    async selectOne(table: string, opts?: { values?: Array<String>, condition?: string, sort?: Array<string> }): Promise <object | undefined>
    async insert(table: string, opts: { fields?: Array<string>, values?: Array<string | number>, object?: object, updateOnDuplicate?: boolean }): Promise<object>
    async update(table: string, opts: { fields?: Array<string>, values?: Array<string | number>, object?: object, condition?: string }): Promise<object>
    async count(table: string, opts?: { condition?: string }): Promise<number | undefined>
    async create(table: string, opts?: { fields?: Array<string>, types?: Array<types>, object?: { [key: string]: types }, ifNotExists?: boolean, engine: string }): Promise<unknown>
    close(): void
    //TODO:
    //* async join(from: string, join: string, on: Array<string>, opts?: { values?: Array<string>, condition?: string, sort?: Array<string>, limit?: number, offset?: number}): Promise<Array<object>>
}

class poolCommands extends connectionCommands {

}

type types =
"CHAR(size)" | "VARCHAR(size)" | "BINARY(size)" | "VARBINARY(size)" |
"TINYBLOB" | "TINYTEXT" | "TEXT(size)" | "BLOB(size)" |
"MEDIUMTEXT" | "MEDIUMBLOB" | "LONGTEXT" | "LONGBLOB" |
"ENUM(values)" | "SET(values)" |
"BIT(size)" | "TINYINT(size)" | "BOOL" | "BOOLEAN" |
"SMALLINT(size)" | "MEDIUMINT(size)" | "INT(size)" | "INTEGER(size)" |
"BIGINT(size)" | "FLOAT(size, d)" | "FLOAT(p)" | "DOUBLE(size, d)" |
"DOUBLE PRECISION(size, d)" | "DECIMAL(size, d)" | "DEC(size, d)" |
"DATE" | "DATETIME(fsp)" | "TIMESTAMP(fsp)" | "TIME(fsp)" | "YEAR"

export = new mysqlCommands