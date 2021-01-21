export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    isProduction: process.env.NODE_ENV === 'production',
    database: {
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
        databaseName: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD
    }
});
