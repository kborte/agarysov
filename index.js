import express from "express";
import cors from "cors";
import * as routes from "./Routes/routes.js";

//
// authorization
const app = express()
app.use(express.json())

app.use(cors())

app.use('/api/', routes.albumsRouter)
app.use('/api/', routes.rolesRouter)
app.use('/api/', routes.contributorsRouter)
app.use('/api/', routes.albumsContributorsRolesRouter)
app.use('/api/', routes.bookingsRouter)

app.listen(5000, () => {
    console.log("Server started at the port 5000")
})