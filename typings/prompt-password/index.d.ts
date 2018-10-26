namespace Prompt {
    export type MaskFunction = (input: string) => string;
    export interface PromptOptions {
        type: "password";
        message: string;
        name: "password";
        mask?: MaskFunction;
    }
}

class Prompt {
    constructor(options: Prompt.PromptOptions);
    run(): Promise<string>;
}

export = Prompt;
