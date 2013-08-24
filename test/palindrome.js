var assert = require('assert');
var palindrome = require('../palindrome');

describe('palindrome', function () {
    it('word', function () {
        assert.ok(palindrome('anna'), 'Anna is a palindrome');
    });
    it('phrase with commas', function () {
        assert.ok(palindrome('Anne, I vote more cars race Rome to Vienna'), 'Rome to Vienna phrase is palindrome');
    });
    it('long phrase with dot', function () {
        assert.ok(palindrome('Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.'));
    });
    it('not a palindrome', function () {
        assert.ok(!palindrome('Amore, Roman.'), 'Amore, Roman isn\'t a palindrome');
    });
});