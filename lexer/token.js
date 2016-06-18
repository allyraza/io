exports.TokenType = {
	IDENTIFIER: 'IDENTIFIER',
	BRACKET: 'BRACKET',
	STRING_LITERAL: 'STRING_LITERAL',
	REAL_LETERAL: 'REAL_LETERAL',
	PARENTHESES: 'PARENTHESES',
	COMMA: 'COMMA',
	OPERATOR: 'OPERATOR',
	SEMI_COLON: 'SEMI_COLON'
};

exports.Token = function(type, value) {
	return {type: type, value: value};
}
