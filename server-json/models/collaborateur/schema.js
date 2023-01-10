const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
require('ajv-errors')(ajv);

ajv.addFormat('service', {
  type: 'string',
  validate(val) {
    return ['Marketing', 'Technique', 'Client'].includes(val);
  },
});

ajv.addFormat('gender', {
  type: 'string',
  validate(val) {
    return ['male', 'female'].includes(val);
  },
});

const collaborateurSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    gender: {
      type: 'string',
      format: 'gender'
    },
    firstname: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
    phone: { type: 'string' },
    birthdate: { type: 'string' },
    city: { type: 'string' },
    country: { type: 'string' },
    photo: { type: 'string' },
    service: {
      type: 'string',
      format: 'service',
    },
    isAdmin: { type: 'boolean' },
  },
  required: [
    'gender',
    'firstname',
    'lastname',
    'email',
    'phone',
    'birthdate',
    'country',
    'photo',
    'service',
  ],
  additionalProperties: false,
  errorMessage: {
    properties: {
      service: "Must be either 'Client', 'Marketing' or 'Technique'",
      gender: "Must be either 'male' or 'female'",
    },
  },
};

module.exports = function validateCollaborateur(obj) {
  console.log('validating:', obj);
  const valid = ajv.validate(collaborateurSchema, obj);

  if (!valid) {
    const errorMessages = ajv.errors.map(
      ({ instancePath, message }) => `${instancePath.slice(1)} ${message}`
    );
    throw errorMessages;
  }
};
