var Tokenizer = require('./lexer/tokenizer');

lexer = new Tokenizer(' "string" >> ! := >= var var1 var2 123 0.23 - + = if ( id ) { print ("hello"); } ');
tokens = lexer.tokenize()
tokens.forEach(function(token) {
	console.log(token);
});