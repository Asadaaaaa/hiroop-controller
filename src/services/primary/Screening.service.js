// Helper
import GeminiAI from "../../helpers/GeminiAI.helper.js";
import FileSystemHelper from "../../helpers/FileSystem.helper.js";

// Library
import * as mm from 'music-metadata';
import axios from 'axios';
import FormData from 'form-data';

class ScreeningService {
  constructor(server) {
    this.server = server;

    this.GeminiAIHelper = new GeminiAI(this.server);
    this.FileSystemHelper = new FileSystemHelper(this.server);    
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

  async respirationDetection(data) {
    const getFile = await this.FileSystemHelper.fileValidationBase64(data.audioFile, ['wav'], 3, true, true);
    if(getFile === -1) return -1;
    if(getFile === -2) return -2;
    if(getFile === -3) return -3;
    
    const metadata = await mm.parseBuffer(getFile.file);
    const duration = metadata.format.duration;
    
    if(duration > 10) return -4;

    const formData = new FormData();
    formData.append('file', getFile.file, {
      filename: 'audio.wav',
      contentType: getFile.fileType
    });

    try {
      const response = await axios.post('https://srv1-api.hiroop.my.id/predict-audio', formData, {
        headers: {
          ...formData.getHeaders()
        }
      });
      
      return {
        asthma: response.data.data.asthma,
        bronchial: response.data.data.bronchial,
        copd: response.data.data.copd,
        healthy: response.data.data.healthy,
        pneumonia: response.data.data.pneumonia,
      }
    } catch (error) {
      console.log(error.response.data.err.data.code)
      if(error.response.data.err.data.code === -1) {
        return -5;
      }

      if(error.response.data.err.data.code === -2) {
        return -6;
      }

      return -500;
    }
  }
}

export default ScreeningService;