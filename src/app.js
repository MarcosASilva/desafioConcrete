const express = require("express")

const app = express()

app.post('/',(req,res) => {

})
app.listen(process.env.port || 3000, () => {
    console.log("Server running in port 3000");
    
})