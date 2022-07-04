import 'core-js/stable';
import 'regenerator-runtime/runtime';
import AuditLog from './AuditLog';

Fliplet().then(() => {
  new Vue({
    el: '#audit-log',
    render: (createElement) => {
      return createElement(AuditLog);
    }
  });
});
