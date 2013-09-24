var palindrome = require('../palindrome');

describe('palindrome', function () {
    it('word', function () {
        expect(palindrome('anna')).toBeTruthy();
    });
    it('phrase with commas', function () {
        expect(palindrome('Anne, I vote more cars race Rome to Vienna')).toBeTruthy();
    });
    it('long phrase with dot', function () {
        expect(palindrome('Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.')).toBeTruthy();
    });
    it('russian palindrome', function () {
        expect('А роза упала на лапу Азора?').toBeTruthy();
    });
    it('not a palindrome', function () {
        expect(palindrome('Amore, Roman.')).toBeFalsy();
    });
});