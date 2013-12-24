/*global spyOnEvent*/

describeMixin('lib/with_handlebars', function () {
  'use strict';

  beforeEach(setupComponent);

  describe('renderTemplate', function () {
    it('should trigger handlebars-render-template', function () {
      var spy = spyOnEvent(this.component.$node, 'handlebars-render-template');

      this.component.renderTemplate({
        template: 'foo'
      });

      expect(spy).toHaveBeenTriggeredOn(this.component.$node);
      expect(spy.callCount).toBe(1);
    });

    it('should respond to handlebars-rendered-template and return rendered value', function () {
      var request = {
        template: 'foo'
      };

      // fake template rendered from component
      this.component.$node.on('handlebars-render-template', function(e, data) {
        this.component.$node.trigger('handlebars-rendered-template', {
          rendered: 'bar',
          request: data
        });
      }.bind(this));

      // renderTemplate should return 'bar'
      expect(this.component.renderTemplate(request)).toEqual('bar');
    });
  });
});