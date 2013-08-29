Router.configure({
  layout: 'defaultLayout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  renderTemplates: {
    'header': { to: 'header' }
  }
});

Router.map(function() {
  this.route('messages', {
    path: '/',
    template: 'messages',
    renderTemplates: {
      'chatHeader': {to: 'header'}
    }
  });
  this.route('links', {
    template: 'links',
    renderTemplates: {
      'linksHeader': {to: 'header'}
    }

  });
  this.route('admin', {
    template: 'admin',
    renderTemplates: {
      'adminHeader': {to: 'header'}
    }
  });
  this.route('nouns', {
    template: 'nouns',
    renderTemplates: {
      'chatHeader': {to: 'header'}
    }
  });
});