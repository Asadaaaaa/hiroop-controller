// Routes
import ScreeningRoute from "./Screening.route.js";
class PrimaryHandler {
  constructor(server) {
    new ScreeningRoute(server);
  }
}

export default PrimaryHandler;