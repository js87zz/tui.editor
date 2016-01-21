'use strict';

var OL = require('../../src/js/wysiwygCommands/ol'),
    WysiwygEditor = require('../../src/js/wysiwygEditor'),
    EventManager = require('../../src/js/eventManager');

describe('OL', function() {
    var wwe, sq;

    beforeEach(function(done) {
        var $container = $('<div />');

        $('body').append($container);

        wwe = new WysiwygEditor($container, null, new EventManager());

        wwe.init(function() {
            sq = wwe.getEditor();
            done();
        });
    });

    afterEach(function() {
        $('body').empty();
    });

    it('add OL', function() {
        OL.exec(wwe);

        expect(wwe.get$Body().find('ol').length).toEqual(1);
        expect(wwe.get$Body().find('li').length).toEqual(1);
    });

    it('if have task in range then remove task and change to ul', function() {
        var range = sq.getSelection().cloneRange();

        sq.setHTML('<ul><li class="task-list-item"><div><input type="checkbox"> test</div></li></ul>');

        range.setStart(wwe.get$Body().find('li')[0], 1);
        range.collapse(true);

        sq.setSelection(range);

        OL.exec(wwe);

        expect(wwe.get$Body().find('.task-list-item').length).toEqual(0);
        expect(wwe.get$Body().find('ol').length).toEqual(1);
        expect(wwe.get$Body().find('li').length).toEqual(1);
        expect(wwe.get$Body().find('li').text()).toEqual('test');
        expect(wwe.get$Body().find('input').length).toEqual(0);
    });
});