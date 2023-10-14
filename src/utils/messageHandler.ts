import chalk from 'chalk'
import { isDebugging } from '..'

export default class Logger {
    public static console(...args: any[]): void { // Yellow
        console.log(chalk.yellowBright('[CONSOLE]', ...args))
    }

    public static client(...args: any[]): void { // Green
        console.log(chalk.greenBright('[CLIENT] ', ...args))
    }

    public static server(...args: any[]): void {  // Light Blue
        console.log(chalk.cyan('[SERVER] ', ...args))
    }

    public static networking(...args: any[]): void { // Aqua
        console.log(chalk.cyanBright('[NETWORKING] ', ...args))
    }

    public static developer(...args: any[]): void {  // Yellow
        if(isDebugging) {
            console.log(chalk.yellowBright('[DEVELOPER]', ...args))
        }
    }

    public static host(...args: any[]): void {
        console.log(chalk.blueBright('[HOST] ', ...args)) // BLUE
    }

    public static error(...args: any[]): void {
        console.log(chalk.red('[ERROR] ', ...args)) // RED
    }
}