var Token = require('./token').Token;
var TokenType = require('./token').TokenType;

function isVar(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

function isNumber(str) {
  return str.length === 1 && str.match(/[0-9]/i);
}

function Tokenizer(src) {
	this.input = src;
	this.inputSize = src.length;
	this.position = 0;
}

Tokenizer.prototype.tokenize = function() {
	tokens = [];
	while (ch = this.peekChar()) {
		switch(ch) {
			case " ":
				// don't do anything just skip whitespace
				break;
			case '{':
				tokens.push( Token(TokenType.BRACKET, "{") );
				break;
			case '}':
				tokens.push( Token(TokenType.BRACKET, "}") );
				break;
			case '(':
				tokens.push( Token(TokenType.PARENTHESES, "(") );
				break;
			case ')':
				tokens.push( Token(TokenType.PARENTHESES, ")") );
				break;
			case ',':
				tokens.push( Token(TokenType.COMMA, ",") );
			case '=':
				tokens.push( Token(TokenType.OPERATOR, "=") );
				break;
			case "+":
				tokens.push( Token(TokenType.OPERATOR, "+") );
				break;
			case "-":
				tokens.push( Token(TokenType.OPERATOR, "-") );
				break;
			case "*":
				tokens.push( Token(TokenType.OPERATOR, "*") );
				break;
			case "^":
				tokens.push( Token(TokenType.OPERATOR, "^") );
				break;
			case "/":
				tokens.push( Token(TokenType.OPERATOR, "/") );
				break;
			case ":":
				if (this.peekChar() == "=") {
					tokens.push( Token(TokenType.OPERATOR, ":=") );
				} else {
					throw "Unexpected " + ch;
				}
				break;
			case "!":
				if (this.peekChar() == "=") {
					tokens.push( Token(TokenType.OPERATOR, "!=") );
				} else {
					tokens.push( Token(TokenType.OPERATOR, "!") );
				}
				break;
			case "<":
				char = this.peekChar();
				if (char == "=") {
					tokens.push( Token(TokenType.OPERATOR, "<=") );
				} else if (char == "<") {
					tokens.push( Token(TokenType.OPERATOR, "<<") );
				} else {
					tokens.push( Token(TokenType.OPERATOR, "<") );
				}
				break;

			case ">":
				char = this.peekChar();
				if (char === "=") {
					tokens.push( Token(TokenType.OPERATOR, ">=") );
				} else if (char === ">") {
					tokens.push( Token(TokenType.OPERATOR, ">>") );
				} else {
					tokens.push( Token(TokenType.OPERATOR, ">") );
				}
				break;
			case "\"":
				str = "";
				while (char = this.peekChar()) {
					if (char != "\"") {
						str += char;
					} else {
						break;
					}
				}
				tokens.push( Token(TokenType.STRING_LITERAL, str) );
				break;
		}

		if (isVar(ch)) {
			var str = ch;
			while (char = this.peekChar()) {
				if (!isVar(char) && !isNumber(char)) {
					break;
				}

				str += char;
			}
			tokens.push( Token(TokenType.IDENTIFIER, str) );
		}

		if (isNumber(ch)) {
			var str = ch;
			while (char = this.peekChar()) {
				if (!isNumber(char) && char !== '.') {
					break;
				}

				str += char;
			}
			tokens.push( Token(TokenType.REAL_LETERAL, str) );
		}

	}

	return tokens;
}

Tokenizer.prototype.peekChar = function() {
	if (this.position < this.inputSize) {
		char = this.input[this.position];
		this.position += 1;
		return char;
	}
	return false;
}

module.exports = Tokenizer;