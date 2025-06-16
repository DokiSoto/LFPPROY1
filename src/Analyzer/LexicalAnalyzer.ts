import { Token, Type } from "./Token";

class LexicalAnalyzer {
    private row: number;
    private column: number;
    private auxChar: string;
    private state: number;
    private tokenList: Token[];
    private errorList: Token[];
    private reservedWords: string[];

    constructor() {
        this.row = 1;
        this.column = 1;
        this.auxChar = '';
        this.state = 0;
        this.tokenList = [];
        this.errorList = [];
        this.reservedWords = ["Carrera", "Semestre", "Curso", "Nombre", "Area", "Prerequisitos"];
    }

    public scanner(input: string): Token[] {
        input += "#";
        let char: string;

        for (let i = 0; i < input.length; i++) {
            char = input[i];

            switch (this.state) {
                case 0: 
                    if (/[a-zA-Z]/.test(char)) {
                        this.state = 1;
                        this.addCharacter(char);
                    } else if (char === '"') {
                        this.state = 2;
                        this.addCharacter(char);
                    } else if (/\d/.test(char)) {
                        this.state = 5;
                        this.addCharacter(char);
                    } else {
                        switch (char) {
                            case ':': this.state = 6; break;
                            case '=': this.state = 7; break;
                            case ';': this.state = 8; break;
                            case '{': this.state = 9; break;
                            case '}': this.state = 10; break;
                            case '[': this.state = 11; break;
                            case ']': this.state = 12; break;
                            case '(': this.state = 13; break;
                            case ')': this.state = 14; break;
                            case ',': this.state = 15; break; 
                            case ' ':
                            case '\t':
                                this.column += (char === '\t') ? 4 : 1;
                                continue;
                            case '\n':
                            case '\r':
                                this.row++;
                                this.column = 1;
                                continue;
                            case '#':
                                if (i === input.length - 1) console.log("Analisis léxico finalizado.");
                                continue;
                            default:
                                this.addError(Type.UNKNOW, char, this.row, this.column++);
                                continue;
                        }
                        this.addCharacter(char);
                    }
                    break;

                case 1: 
                    if (/[a-zA-Z0-9]/.test(char)) {
                        this.addCharacter(char);
                    } else {
                        const lexeme = this.auxChar;
                        const type = this.reservedWords.includes(lexeme)
                            ? Type.RESERVERD_WORD
                            : Type.UNKNOW;
                        this.addToken(type, lexeme, this.row, this.column - lexeme.length);
                        this.clean();
                        i--;
                    }
                    break;

                case 2: 
                    if (char === '"') {
                        this.addCharacter(char);
                        this.state = 4; 
                    } else {
                        this.addCharacter(char);
                        this.state = 3;
                    }
                    break;

                case 3: 
                    if (char === '"') {
                        this.addCharacter(char);
                        this.state = 4;
                    } else {
                        this.addCharacter(char);
                    }
                    break;

                case 4: 
                    this.addToken(Type.STRING, this.auxChar, this.row, this.column - this.auxChar.length);
                    this.clean();
                    i--;
                    break;

                case 5: 
                    if (/\d/.test(char)) {
                        this.addCharacter(char);
                    } else {
                        this.addToken(Type.NUMBER, this.auxChar, this.row, this.column - this.auxChar.length);
                        this.clean();
                        i--;
                    }
                    break;

                case 6: 
                    this.addToken(Type.COLON, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 7: 
                    this.addToken(Type.EQUAL, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 8: 
                    this.addToken(Type.SEMICOLON, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 9: 
                    this.addToken(Type.COR_OPEN, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 10: 
                    this.addToken(Type.COR_CLOSE, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 11: 
                    this.addToken(Type.KEY_OPEN, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 12: 
                    this.addToken(Type.KEY_CLOSE, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 13: 
                    this.addToken(Type.PAR_OPEN, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 14: 
                    this.addToken(Type.PAR_CLOSE, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;

                case 15: 
                    this.addToken(Type.COMA, this.auxChar, this.row, this.column - 1);
                    this.clean(); i--; break;
            }
        }

        return this.tokenList;
    }

    private addCharacter(char: string): void {
        this.auxChar += char;
        this.column++;
    }

    private clean(): void {
        this.auxChar = '';
        this.state = 0;
    }

    private addToken(type: Type, lexeme: string, row: number, column: number): void {
        this.tokenList.push(new Token(type, lexeme, row, column));
    }

    private addError(type: Type, lexeme: string, row: number, column: number): void {
        this.errorList.push(new Token(type, lexeme, row, column));
    }

    public getErrorList(): Token[] {
        return this.errorList;
    }

    public getTokenList(): Token[] {
        return this.tokenList;
    }
}

export { LexicalAnalyzer };
