import Logger from './utils/messageHandler';
import ConfigFileReader from './utils/config';
import * as path from 'path';
import chalk from 'chalk';
import { Command } from './utils/parseCommand';

export let isDebugging: boolean = false;

export default class Console {
    public static startup() {
        const filePath = path.join(__dirname, 'config', 'default.cfg');
        const configFile = new ConfigFileReader(filePath);

        const debugValue = configFile.getData('mode', 'debug');

        if (debugValue === 'true') {
            isDebugging = true;
        }

        Logger.console('DIR: ' + __dirname);
        Logger.developer('Launching in developer mode');

        // Interactive input loop
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        async function getInput() {
            while (true) {
                const answer = await askQuestion(rl, chalk.grey('> ')) as string
                if (typeof answer === 'string' && answer.toLowerCase() === 'exit') {
                    rl.close();
                    break;
                }
                Command.execute(answer);
            }
        }

        function askQuestion(rl, question) {
            return new Promise((resolve) => {
                rl.question(question, resolve);
            });
        }

        getInput();
    }
}

Console.startup();
