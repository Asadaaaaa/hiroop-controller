class ScreeningValidator {
  chatAnswer = {
    type: 'object',
    properties: {
      dailyActivity: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      },
      symptomDuration: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      },
      environmentalExposure: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      },
      smokingHabits: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      },
      peakTime: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      },
      triggerFactors: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      },
      chestComplaint: {
        type: 'string',
        minLength: 1,
        maxLength: 200,
        pattern: "^[a-zA-Z0-9`~!@#$%^&*()_\\-+={}\\[\\]:;\"'|<>,.?/ ]*$",
        nullable: false
      }
    },
    required: [ 'dailyActivity', 'symptomDuration', 'environmentalExposure', 'smokingHabits', 'peakTime', 'triggerFactors', 'chestComplaint' ],
    additionalProperties: false
  }

  respirationDetection = {
    type: 'object',
    properties: {
      audioFile: {
        type: 'string',
        minLength: 1,
        pattern: '^[A-Za-z0-9+/]+[=]{0,2}$',
        nullable: false

      }
    },
    required: [ 'audioFile' ],
    additionalProperties: false
  }
}

export default ScreeningValidator;