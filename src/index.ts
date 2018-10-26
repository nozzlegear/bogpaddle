#! /usr/bin/env node
import Prompt = require("prompt-password");
import * as crypto from "crypto";
import * as clip from "clipboardy";
import {
    CommandLineAction,
    CommandLineParser,
    CommandLineStringParameter,
    CommandLineFlagParameter
} from "@microsoft/ts-command-line";

class HashAction extends CommandLineAction {
    constructor() {
        super({
            actionName: "hash",
            documentation:
                "This action will read a password and hash it to SHA512, copying it to your clipboard once finished. If you do not pass a password, you will be asked to enter one instead.",
            summary: "Hashes a password to SHA512."
        });
    }

    private passwordParameter!: CommandLineStringParameter;
    private writeToTerminalFlag!: CommandLineFlagParameter;

    protected onDefineParameters(): void {
        this.passwordParameter = this.defineStringParameter({
            argumentName: "PASSWORD",
            description:
                "The password to hash. Should be passed from an environment variable to avoid logging your password in the console. If omitted, you will be prompted to enter the password instead.",
            parameterLongName: "--password",
            parameterShortName: "-p",
            required: false
        });

        this.writeToTerminalFlag = this.defineFlagParameter({
            description:
                "Writes the hashed value to the terminal rather than the default behavior of copying it to the clipboard",
            parameterLongName: "--display-output",
            parameterShortName: "-d"
        });
    }

    protected async onExecute(): Promise<void> {
        const password = await (this.passwordParameter.value
            ? Promise.resolve(this.passwordParameter.value!)
            : this.promptForPassword());
        const hashed = crypto
            .createHash("SHA512")
            .update(password)
            .digest()
            .toString("hex")
            .toUpperCase();

        if (this.writeToTerminalFlag.value) {
            console.log(hashed);
        } else {
            await clip.write(hashed);
            console.log("Copied to clipboard.");
        }
    }

    private promptForPassword(): Promise<string> {
        const prompt = new Prompt({
            message: "Enter the password to hash:",
            name: "password",
            type: "password"
        });

        return prompt.run();
    }
}

class CommandLine extends CommandLineParser {
    constructor() {
        super({
            toolFilename: "bogpaddle",
            toolDescription: "A CLI utility for hashing a secret string to SHA512."
        });

        this.addAction(new HashAction());
    }

    protected onDefineParameters(): void {}
}

const cli = new CommandLine();
// Skip the first two arguments, which will be [/usr/bin/node, fileName.js], even when installed globally.
cli.execute(process.argv.slice(2));
