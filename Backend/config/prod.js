require('dotenv').config()

module.exports = {
	dbURL: process.env.MONGODB_URI || 'mongodb+srv://dror:dror123@cluster0.wsdeofi.mongodb.net/?retryWrites=true&w=majority',
	dbName: process.env.DB_NAME || 'collabflow_db',
	port: process.env.PORT || 3030,
	corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
	jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key_here',
}
