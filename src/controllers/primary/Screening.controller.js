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

  async respirationDetection(req, res) {
    const schemeValidate = this.Ajv.compile(this.ScreeningValidator.respirationDetection);

    if(!schemeValidate(req.body)) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      schemeValidate.errors[0].message,
      'validator',
      schemeValidate.errors[0]
    ));

    const respirationDetectionSrv = await this.ScreeningService.respirationDetection(req.body);

    if(respirationDetectionSrv === -1) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      'Bad Request, Audio File not provide',
      'service',
      {
        code: -1
      }
    ));

    if(respirationDetectionSrv === -2) return res.status(403).json(this.ResponsePreset.resErr(
      403,
      'Forbidden, Audio File is too large',
      'service',
      {
        code: -2
      }
    ));

    if(respirationDetectionSrv === -3) return res.status(415).json(this.ResponsePreset.resErr(
      415,
      'Unsupported Media Type, Audio type not acceptable',
      'service',
      {
        code: -3
      }
    ));

    if(respirationDetectionSrv === -4) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      'Bad Request, Audio File duration is more than 10 seconds',
      'service',
      {
        code: -4
      }
    ));

    if(respirationDetectionSrv === -5) return res.status(400).json(this.ResponsePreset.resErr(
      400,
      'Service Respiration Detection Error, No Audio Provided',
      'service-respiration-detection',
      {
        code: -5
      }
    ));

    if(respirationDetectionSrv === -6) return res.status(500).json(this.ResponsePreset.resErr(
      500,
      'Service Respiration Detection Error, Something Wrong with model',
      'service',
      {
        code: -6
      }
    ));

    if(respirationDetectionSrv === -500) return res.status(500).json(this.ResponsePreset.resErr(
      500,
      'Internal Server Error, Something wrong with the server',
      'service',
      {
        code: -500
      }
    ));

    return res.status(200).json(this.ResponsePreset.resOK('OK', respirationDetectionSrv));
  }

}

export default ScreeningController;