define(function (require) {
  'use strict';

  /**
   * Module exports
   */

  return withHandlebars;

  /**
   * Module function
   */

  function withHandlebars() {

    /**
     * Render a template with Handlebars. Must provide either `request.template`
     * or `request.templateName`.
     *
     * @param request {Object}
     *   request.template {String} optional template
     *   request.templateName {String} optional template name
     *   request.renderParams {Object} optional data
     */

    this.renderTemplate = function (request) {
      var requestId = request.requestId = Date.now();
      var html;

      this.on(document, 'handlebars-rendered-template', function (e, data) {
        if (data.request.requestId === requestId) {
          html = data.rendered;
        }
        this.off(document, 'handlebars-rendered-template');
      });

      this.trigger('handlebars-render-template', request);

      return html;
    };
  }
});
