import { Pool } from "postgres-pool"

const pool = new Pool({
    user: 'agarysovpsql',
    password: 'QwErTy1@3',
    host: 'localhost',
    database: 'agarysov_db',
    port: 5432
})

export default pool