export = class mysqlCommands {
    constructor(connection: ConnectionAwait)
    async request(query: string): Promise<Array<Object>>
    async select(table: string, opts?: { values?: Array<String>, condition?: string, sort?: Array<string>, limit?: number, offset?: number}): Promise<Array<Object>>
    async selectOne(table: string, opts?: { values?: Array<String>, condition?: string, sort?: Array<string> }): Promise <Object | undefined>
    async insert(table: string, fields: Array<string>, values: Array<string | number>): void
    async update(table: string, fields: Array<string>, values: Array<string | number>, condition?: string): void
    //TODO:
    //* async join(from: string, join: string, on: Array<string>, opts?: { values?: Array<string>, condition?: string, sort?: Array<string>, limit?: number, offset?: number}): Promise<Array<Object>>
}