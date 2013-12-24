define(function (require) {
  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');
  var Handlebars = require('handlebars');

  /**
   * Module exports
   */

  return defineComponent(handlebars);

  /**
   * Module function
   */

  function handlebars() {
    this.defaultAttrs({
      precompiledTemplates: {}
    });

    /**
     * Render a Handlebars template.
     *
     * @param data {Object}
     *   data.template {String} template
     *   data.renderParams {Object} optional render params
     * @returns {String}
     */

    this.renderStringTemplate = function (data) {
      // get cached template or compile
      var compiledTemplate = this.compiledTemplates[data.template] || Handlebars.compile(data.template);

      // cache compiled template
      this.compiledTemplates[data.template] = compiledTemplate;

      // return rendered template
      return compiledTemplate(data.renderParams);
    };

    /**
     * Render a named template. If the template is present in the cache, use
     * that, otherwise load template.
     *
     * @param data {Object}
     *   data.templateName {String} path to template
     *   data.renderParams {Object} data
     *   data.partials {Object} partials
     */

    this.renderNamedTemplate = function (data) {
      var compiledTemplate = this.compiledTemplates[data.templateName];

      if (compiledTemplate) {
        // return rendered template
        return compiledTemplate(data.renderParams);
      } else {
        // throw error
      }
    };

    /**
     * Handle render-template event. Must either provide templateName or template.
     *
     * @param e
     * @param data {Object}
     *   data.templateName {String} optional template name
     *   data.template {String} optional template
     *   data.renderParams {Object} render params
     *   data.partials {Object} template partials
     */

    this.handleRenderTemplate = function (e, data) {
      var rendered;

      try {
        if (data.template) {
          rendered = this.renderStringTemplate(data);
        } else {
          rendered = this.renderNamedTemplate(data);
        }

        this.trigger('handlebars-rendered-template', {
          rendered: rendered,
          request: data
        });
      } catch (e) {
        this.trigger('handlebars-render-error', {
          error: e,
          request: data
        });
      }
    };

    this.after('initialize', function () {
      this.compiledTemplates = $.extend({}, this.attr.precompiledTemplates);
      this.on('handlebars-render-template', this.handleRenderTemplate);
    });
  }
});
