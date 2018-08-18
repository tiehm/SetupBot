import chalk from 'chalk';
import * as moment from 'moment';
import * as readline from 'readline';
import pad = require('pad');

export class Logger {

    [x: string]: any;

    private readonly stream;
    private readonly interactive: boolean = false;

    private before = null;
    private loggers: object = {
        debug: {
            color: 'magenta',
            tag: 'DEBUG'
        },
        error: {
            color: 'red',
            tag: 'ERROR'
        },
        info: {
            color: 'cyan',
            tag: 'INFO'
        },
        warn: {
            color: 'yellow',
            tag: 'WARN'
        }
    };

    constructor(stream, interactive?: boolean) {

        this.stream = stream;
        if (interactive) this.interactive = interactive;

        Object.keys(this.loggers).forEach((type) => {
            this[type] = this.use.bind(this, type);
        });

    }

    private get time() {
        return `[${moment().format('HH:mm:ss')}]`;
    }

    private color(type: string) {
        return this.loggers[type].color;
    }

    private use(type: string, msg: string|Error, ...args: string[]): void {

        if (type === 'DEBUG' && (!process.env.DEBUG || process.env.DEBUG === 'false')) return;

        const color: string = this.color(type);
        const output: string[] = [];

        if (msg instanceof Error && msg.stack) {
            const [name, ...rest] = msg.stack.split('\n');
            output.push(name);
            output.push(chalk.grey(rest.map((l) => l.replace(/^/, '\n')).join('')));
        } else if (msg instanceof Error) {
            output.push(`Unknown Error: ` + Error);
        } else if (typeof msg === 'string') {
            output.push(msg.replace(/%a/g, () => chalk[color](args.shift())));
        }

        const final: string =
                  chalk.gray(`${this.time} `) + chalk[color].bold(pad(type.toUpperCase(), 6)) + `: ${output.join(' ')}`;

        this.write(final);

    }

    private write(content: string): void {

        if (this.before && this.interactive) {
            readline.moveCursor(this.stream, 0, -1);
            readline.clearLine(this.stream, 0);
            readline.cursorTo(this.stream, 0);
        }
        this.stream.write(content + '\n');
        this.before = true;

    }

}
