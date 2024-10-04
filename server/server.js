const express = require('express')
const app = express()
const mongoose = require('mongoose')
const multer=require('multer')

app.use(express.json())


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename: function (req, file, cb) {

        cb(null, `${Date.now()}-${file.originalname}`)
    }
    
})
const upload = multer({ storage: storage })

 mongoose.connect('mongodb://localhost:27017/b29')
    .then(() => { console.log("connection successfull") })
   .catch((err) => { console.log(err) })



const newSchema = mongoose.Schema({
    name: { type: String, required: true },
    position: { type: String, required: true }
})

const Task = mongoose.model("Task", newSchema)

   

const port = 4000


app.get('/', async (req, res) => {

    try {

        const info = await Task.find()
        res.status(200).json(info)


    } catch (error) {
        res.status(400).json({ message: error })
    }
})

app.post('/add', async (req, res) => {
    const { name, position } = req.body
    try {

        const info = Task({ name, position })
        await info.save()
        res.status(201).json({ message: "data successfully inserted" })

    } catch (error) {
        res.status(400).json({ message: error })
    }

})

app.put('/update/:id', async (req, res) => {
    const { name, position } = req.body
    const { id } = req.params
    try {
        const info = await Task.findByIdAndUpdate(id, { name, position })
        res.status(200).json({ message: "updated" })

    } catch (error) {
        res.status(400).json({ message: error })
    }
})

app.delete('/delete/:id', async(req, res) => {

    const { id } = req.params
try {
    const info = await Task.findByIdAndDelete(id)
    res.status(200).json({message:"deleted"})
} catch (error) {
    res.status(400).json({ message: error })
}
})
app.post('/uploads',upload.single('filename'),(req,res)=>{
    
    res.status(200).json({message:"file has been uploaded"})
})

app.get('/d',(req,res)=>{
    res.send('hello')
})



app.listen(port, () => {
    console.log(`server is running at ${port}`)
})