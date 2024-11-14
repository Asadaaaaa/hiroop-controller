// Helper
import GeminiAI from "../../helpers/GeminiAI.helper.js";

class ScreeningService {
  constructor(server) {
    this.server = server;

    this.GeminiAIHelper = new GeminiAI(this.server);
  }

  async chatGetQuestions() {
    const questions = JSON.parse(this.server.FS.readFileSync(
      process.cwd() + '/server_data/additional_data/questions/Questions.json', 
      'utf8'
    ));

    return questions;
  }

  async chatAnswer(data) {
    const geminiResponse = await this.GeminiAIHelper.generateResponse(data);
    const geminiResponseParsedText = JSON.parse(geminiResponse.response.text());
    
    if(geminiResponseParsedText.error === false) {
      return {
        dailyActivity: geminiResponseParsedText.dailyActivity,
        symptomDuration: geminiResponseParsedText.symptomDuration,
        environmentalExposure: geminiResponseParsedText.environmentalExposure,
        smokingHabits: geminiResponseParsedText.smokingHabits,
        peakTime: geminiResponseParsedText.peakTime,
        triggerFactors: geminiResponseParsedText.triggerFactors,
        chestComplaint: geminiResponseParsedText.chestComplaint,
        conclusion: geminiResponseParsedText.conclusion,
        radarChart: geminiResponseParsedText.radarChart
      };
    } else if(geminiResponseParsedText.error === true) {
      return -1;
    }
  }
}

export default ScreeningService;