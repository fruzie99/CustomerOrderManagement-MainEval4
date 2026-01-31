
import "./src/config/env.js";   

import app from "./src/app.js";

const PORT = process.env.PORT || 5173;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
