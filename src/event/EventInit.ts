import ConfigurationService from "./service/EventConfiguration";

const configurationService = new ConfigurationService()

async function run() {
  await configurationService.startWatching()
}

run().catch(console.log)
