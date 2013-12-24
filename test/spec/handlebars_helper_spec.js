/*global spyOnEvent*/
define(function (require) {
  'use strict';

  var Handlebars = require('handlebars');

  describeComponent('lib/handlebars_helper', function () {
    describe('handlebars-render-template', function () {
      describe('with string template', function () {
        // Initialize the component and attach it to the DOM
        beforeEach(function () {
          setupComponent();
        });

        it('renders the template with provided data', function () {
          var spy = spyOnEvent(this.component.$node, 'handlebars-rendered-template');

          this.component.$node.trigger('handlebars-render-template', {
            template: 'plain old {{myVar}}',
            renderParams: {
              myVar: 'html'
            }
          });

          expect(spy).toHaveBeenTriggeredOn(this.component.$node);
          expect(spy.callCount).toBe(1);
          expect(spy.mostRecentCall.data).toEqual({
            rendered: 'plain old html',
            request: {
              template: 'plain old {{myVar}}',
              renderParams: {
                myVar: 'html'
              }
            }
          });
        });

        it('triggers handlebars-render-error on error', function () {
          var spy = spyOnEvent(this.component.$node, 'handlebars-render-error');

          this.component.$node.trigger('handlebars-render-template', {
            template: 'plain old {{#noClosingTag}}',
            renderParams: {
              myVar: 'html'
            }
          });

          expect(spy).toHaveBeenTriggeredOn(this.component.$node);
          expect(spy.callCount).toBe(1);
        });
      });

      it('uses pre-compiled template if available', function () {
        var precompiledTemplates = {
          aTemplate: Handlebars.compile('test')
        };

        setupComponent({
          precompiledTemplates: precompiledTemplates
        });

        var spy = spyOnEvent(this.component.$node, 'handlebars-rendered-template');

        this.component.$node.trigger('handlebars-render-template', {
          templateName: 'aTemplate'
        });

        expect(spy).toHaveBeenTriggeredOn(this.component.$node);
        expect(spy.callCount).toBe(1);
        expect(spy.mostRecentCall.data).toEqual({
          rendered: 'test',
          request: {
            templateName: 'aTemplate'
          }
        });
      });
    });
  });
});