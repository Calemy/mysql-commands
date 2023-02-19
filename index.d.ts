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
    close(): void
    //TODO:
    //* async join(from: string, join: string, on: Array<string>, opts?: { values?: Array<string>, condition?: string, sort?: Array<string>, limit?: number, offset?: number}): Promise<Array<object>>
}

class poolCommands extends connectionCommands {

}

export = new mysqlCommands