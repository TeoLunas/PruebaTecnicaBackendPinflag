import express from "express";

import router from "./routes/index.js";

const app = express();
app.use(express.json())

app.use('/api/', router);

app.listen(3000, () => console.log('Api corriendo en puerto 3000'))
