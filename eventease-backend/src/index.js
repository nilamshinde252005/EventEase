/*
This is the entry point that actually starts the server.

Inside,  will:
-import app from ./app
-import config from ./config/env
-read config.port (like 4000)
-call app.listen(port, ...)
-log a message like “Server running on port 4000”

So: index.js = “press the ON button”.
*/
// src/index.js
import { app } from "./app.js";
import { config } from "./config/env.js";

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
