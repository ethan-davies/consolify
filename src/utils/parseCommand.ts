import Logger from './messageHandler'

export class Command {
    public static execute(command: string): void {
        const commandParts = command.split(' ')
        const commandName = commandParts[0]

        switch (commandName) {
            case 'echo':
                const echoText = command.substring(5)
                Logger.console(echoText)
                break
            default:
                console.log((`Command not recognized: ${commandName}`))
        }
    }
}
