import mongoose from 'mongoose'

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('mongoose is connected')
    } catch (error) {
        console.log(error) 
    }
}

export default dbConnect;