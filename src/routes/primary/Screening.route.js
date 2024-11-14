// Parents
import Primary from './Primary.js';

// Controllers
import ScreeningController from '../../controllers/primary/Screening.controller.js';

class ScreeningRoute extends Primary {
  constructor(server) {
    super(server);

    this.API = this.server.API;
    this.endpointPrefix += '/screening';

    this.ScreeningController = new ScreeningController(this.server);

    this.routes();
  }

  routes() {
    // --- --- --- --- --- --- --- //

    // --- --- Chat
    // --- Questions
    this.API.get(this.endpointPrefix + '/chat/questions', (req, res) => this.ScreeningController.chatGetQuestions(req, res));
    this.API.post(this.endpointPrefix + '/chat/answer', (req, res) => this.ScreeningController.chatAnswer(req, res));

    // --- Respiration Detection
    this.API.post(this.endpointPrefix + '/respiration-detection', (req, res) => this.ScreeningController.respirationDetection(req, res));

    // --- Send Email
    this.API.post(this.endpointPrefix + '/send-email', (req, res) => this.ScreeningController.sendEmail(req, res));
  }
}

export default ScreeningRoute;