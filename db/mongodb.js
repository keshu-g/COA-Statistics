const { connect } = require("mongoose")
const { MONGODB_URI, DB_NAME } = require("../constants")

const mongoDB = async () => {
  try {
    const connectionInstance = await connect(`${MONGODB_URI}/${DB_NAME}`)

    console.log('+++ Database connected +++')
  } catch (err) {
    console.error('+++ Database connection failed +++')
    console.warn(`Error in MongoDB connection: ${err.message}`)
    process.exit(1)
  }
}

module.exports = mongoDB