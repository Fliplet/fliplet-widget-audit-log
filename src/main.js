import 'core-js/stable';
import 'regenerator-runtime/runtime';
import AuditLog from './AuditLog';

new Vue({
  el: '#audit-log',
  render: (createElement) => {
    return createElement(AuditLog);
  }
});
