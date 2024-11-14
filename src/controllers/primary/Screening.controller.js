// Helpers
import ResponsePreset from '../../helpers/ResponsePreset.helper.js';

// Validators
import ScreeningValidator from '../../validators/primary/Screening.validator.js';
import ScreeningService from '../../services/primary/Screening.service.js';

// Library
import Ajv from 'ajv';

class ScreeningController {
  constructor(server) {
    this.server = server;

    this.ResponsePreset = new ResponsePreset();
    this.Ajv = new Ajv();
    this.ScreeningValidator = new ScreeningValidator();
    this.ScreeningService = new ScreeningService(this.server);
  }

  async chatGetQuestions(req, res) {
    const getQuestionSrv = await this.ScreeningService.chatGetQuestions();

    return res.status(200).json(this.ResponsePreset.resOK('OK', getQuestionSrv))
  }

  async chatAnswer(req, res) {
    const schemeValidate = this.Ajv.compile(this.ScreeningValidator.chatAnswer);

    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));

    const chatAnswerSrv = await this.ScreeningService.chatAnswer(req.body);

    if(chatAnswerSrv === -1) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      'Bad Request, Something not right with the answer',
      'service',
      {
        code: -1
      }
    ));

    return res.status(200).json(this.ResponsePreset.resOK('OK', chatAnswerSrv))
  }

}

export default ScreeningController;