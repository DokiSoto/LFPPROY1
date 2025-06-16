enum Type {
    UNKNOW,
    KEY_OPEN,
    KEY_CLOSE,
    COR_OPEN,
    COR_CLOSE,
    PAR_OPEN,
    PAR_CLOSE,
    SEMICOLON,
    EQUAL,
    RESERVERD_WORD,
    NUMBER,
    STRING,
    COLON,
    ASSIGN,
    COMA
}

class Token {

    private row: number;
    private column: number;
    private lexeme: string;
    private typeToken: Type;
    private typeTokenString: string;

    constructor(typeToken: Type, lexeme: string, row: number, column: number) {
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken]; 
        this.lexeme = lexeme;
        this.row = row;
        this.column = column;
    }

    public getRow(): number {
        return this.row;
    }

    public getColumn(): number {
        return this.column;
    }

    public getLexeme(): string {
        return this.lexeme;
    }

    public getTypeToken(): Type {
        return this.typeToken;
    }

    public getTypeTokenString(): string {
        return this.typeTokenString;
    }

    public setRow(row: number): void {
        this.row = row;
    }

    public setColumn(column: number): void {
        this.column = column;
    }

    public setLexeme(lexeme: string): void {
        this.lexeme = lexeme;
    }

    public setTypeToken(typeToken: Type): void {
        this.typeToken = typeToken;
        this.typeTokenString = Type[typeToken]; 
    }

    public setTypeTokenString(typeTokenString: string): void {
        this.typeTokenString = typeTokenString;
    }
}

export { Token, Type };
