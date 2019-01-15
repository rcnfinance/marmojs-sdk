const EventSchema = {
  id: 'https://github.com/ripio/marmojs-sdk/eventlog',
  $schema: 'http://json-schema.org/draft-06/schema#',
  description: 'Schema for tracking an event',
  type: 'object',
  required: ['address', 'abi', 'eventNames', 'blockConfirmations'],
  properties: {
    address: {
      description: 'The contract\'s address',
      type: 'string'
    },
    abi: {
      description: 'The contract\'s ABI',
      type: 'string'
    },
    eventNames: {
      description: 'List of event names to watch for',
      type: 'string'
    },
    blockConfirmations: {
      description: 'Amount of confirmations to wait before notifying',
      type: 'number'
    }
  }
}

export default EventSchema
