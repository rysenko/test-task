var assert = require('assert');
var palindrome = require('../palindrome');

describe('palindrome', function () {
    it('word', function () {
        assert(palindrome('anna'), 'Anna is a palindrome');
    });
    it('phrase with commas', function () {
        assert(palindrome('Anne, I vote more cars race Rome to Vienna'), 'Rome to Vienna phrase is palindrome');
    });
    it('long phrase with dot', function () {
        assert(palindrome('Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.'));
    });
    it('russian palindrome', function () {
        assert(palindrome('А роза упала на лапу Азора?'));
    });
    it('not a palindrome', function () {
        assert(!palindrome('Amore, Roman.'), 'Amore, Roman isn\'t a palindrome');
    });
});