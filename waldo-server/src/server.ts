import { app } from "./routes/app.js";
import config from "./config/config.js";

app.listen(config.port, () => {
  console.log(`Live: http://localhost:${config.port}`);
});
