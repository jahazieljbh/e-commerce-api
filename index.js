import app from "./app.js";
import { PORT } from "./config/config.js";
import { connectDatabase } from "./config/database.js";

async function startServer() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
}

startServer();
