class mysqlCommands {
    createConnection({ host: string, user: string, password: string, database: string }): connectionCommands
}

class connectionCommands {
    async request(query: string): Promise<Array<Object>>
    async select(table: string, opts?: { values?: Array<String>, condition?: string, sort?: Array<string>, limit?: number, offset?: number}): Promise<Array<Object>>
    async selectOne(table: string, opts?: { values?: Array<String>, condition?: string, sort?: Array<string> }): Promise <Object | undefined>
    async insert(table: string, opts: { fields?: Array<string>, values?: Array<string | number>, object?: Object}): Promise<Object>
    async update(table: string, opts: { fields?: Array<string>, values?: Array<string | number>, object?: Object, condition?: string }): Promise<Object>
    //TODO:
    //* async join(from: string, join: string, on: Array<string>, opts?: { values?: Array<string>, condition?: string, sort?: Array<string>, limit?: number, offset?: number}): Promise<Array<Object>>
}

export = new mysqlCommands