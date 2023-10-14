import * as fs from 'fs'

class ConfigFileReader {
    private data: { [key: string]: string } = {}

    constructor(private filePath: string) {
        this.loadConfig()
    }

    private loadConfig() {
        try {
            const configFileContents = fs.readFileSync(this.filePath, 'utf-8')
            this.data = this.parseConfig(configFileContents)
        } catch (err) {
            console.error(`Error reading the config file: ${err}`)
        }
    }

    private parseConfig(configFileContents: string): { [key: string]: string } {
        const configData: { [key: string]: string } = {}

        configFileContents.split('\n').forEach((line) => {
            // Remove leading and trailing spaces
            line = line.trim()

            // Use a regular expression to match any prefix
            const matches = line.match(/^(.+?)\s+"([^"]+)"\s+"([^"]+)"$/)
            if (matches) {
                const prefix = matches[1]
                const key = matches[2]
                const value = matches[3]
                // Store the data under the combined prefix and key
                const combinedKey = `${prefix}:${key}`
                configData[combinedKey] = value
            }
        })

        return configData
    }

    getData(prefix: string, key: string): string | undefined {
        const combinedKey = `${prefix}:${key}`
        return this.data[combinedKey]
    }
}

export default ConfigFileReader
