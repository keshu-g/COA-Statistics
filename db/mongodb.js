const { connect } = require("mongoose")
const { MONGODB_URI, DB_NAME } = require("../constants")

const mongoDB = async () => {
  try {
    const connectionInstance = await connect(`${MONGODB_URI}/${DB_NAME}`)

    console.log('+++ MongoDb connected +++')
  } catch (err) {
    console.error('+++ MongoDb connection failed +++')
    console.warn(`Error in MongoDB connection: ${err.message}`)
    process.exit(1)
  }
}

module.exports = mongoDB