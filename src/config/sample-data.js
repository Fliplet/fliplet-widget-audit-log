const sampleData = {
  logs: [
    {
      createdAt: '2022-02-14T10:26:09.185Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-14T10:26:04.617Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.page.settings.update',
      app: {
        name: 'Charts'
      },
      dataString: '{"page": {"id": 113, "title": "Column"}, "_userEmail": "user@fliplet.com", "attributes": ["customSCSS", "customJS"]}'
    },
    {
      createdAt: '2022-02-14T10:24:53.752Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-14T10:24:49.687Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-14T10:24:44.235Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.settings.update',
      app: {
        name: 'Charts'
      },
      dataString: '{"_userEmail": "user@fliplet.com", "attributes": ["customSCSS", "customJS"]}'
    },
    {
      createdAt: '2022-02-14T10:24:37.649Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-14T10:24:22.998Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-14T10:24:17.626Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.page.settings.update',
      app: {
        name: 'Charts'
      },
      dataString: '{"page": {"id": 113, "title": "Column"}, "_userEmail": "user@fliplet.com", "attributes": ["customSCSS", "customJS"]}'
    },
    {
      createdAt: '2022-02-14T10:22:09.060Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-14T10:22:03.264Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.page.settings.update',
      app: {
        name: 'Charts'
      },
      dataString: '{"page": {"id": 113, "title": "Column"}, "_userEmail": "user@fliplet.com", "attributes": ["customSCSS", "customJS"]}'
    },
    {
      createdAt: '2022-02-14T10:21:52.287Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'Charts'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 113, "_platform": "web", "_pageTitle": "Column", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "6ed7ca36-ce29-db61-af1d-5bdec7e63ec1"}'
    },
    {
      createdAt: '2022-02-08T16:53:43.377Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 64, "_platform": "web", "_pageTitle": "Log in", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "08d692a7-3aae-4341-a7ff-3f389f660c74", "_analyticsSessionId": "52ee504c-097c-83a9-cd09-cda7ec6c8631"}'
    },
    {
      createdAt: '2022-02-08T16:53:25.500Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 186, "_platform": "web", "_pageTitle": "Audio player", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "08d692a7-3aae-4341-a7ff-3f389f660c74", "_analyticsSessionId": "52ee504c-097c-83a9-cd09-cda7ec6c8631"}'
    },
    {
      createdAt: '2022-02-08T16:51:44.607Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 64, "_platform": "web", "_pageTitle": "Log in", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "08d692a7-3aae-4341-a7ff-3f389f660c74", "_analyticsSessionId": "52ee504c-097c-83a9-cd09-cda7ec6c8631"}'
    },
    {
      createdAt: '2022-02-08T16:50:53.179Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 64, "_platform": "web", "_pageTitle": "Log in", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "08d692a7-3aae-4341-a7ff-3f389f660c74", "_analyticsSessionId": "52ee504c-097c-83a9-cd09-cda7ec6c8631"}'
    },
    {
      createdAt: '2022-02-08T16:49:25.893Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 64, "_platform": "web", "_pageTitle": "Log in", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "08d692a7-3aae-4341-a7ff-3f389f660c74", "_analyticsSessionId": "52ee504c-097c-83a9-cd09-cda7ec6c8631"}'
    },
    {
      createdAt: '2022-02-08T16:49:13.385Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 64, "_platform": "web", "_pageTitle": "Log in", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "08d692a7-3aae-4341-a7ff-3f389f660c74", "_analyticsSessionId": "52ee504c-097c-83a9-cd09-cda7ec6c8631"}'
    },
    {
      createdAt: '2022-02-08T16:49:06.131Z',
      user: {
        type: 'app',
        email: 'user@fliplet.com'
      },
      type: 'app.analytics.pageView',
      app: {
        name: 'My directory'
      },
      dataString: '{"_os": "MacIntel", "_pageId": 64, "_platform": "web", "_pageTitle": "Log in", "_userEmail": "user@fliplet.com", "_deviceTrackingId": "132f249d-d9a3-3c20-a5a2-9ba4e60ddc05", "_analyticsSessionId": "37dfe6e1-0f90-56fa-f4e1-78fa4b71b036"}'
    },
    {
      createdAt: '2022-02-08T12:45:57.385Z',
      user: {
        type: 'studio',
        email: 'admin@fliplet.com'
      },
      type: 'user.login',
      dataString: null
    },
    {
      createdAt: '2022-02-08T02:26:17.047Z',
      user: {
        type: 'studio',
        email: 'admin@fliplet.com'
      },
      type: 'user.login',
      dataString: null
    },
    {
      createdAt: '2022-02-05T21:18:27.985Z',
      user: {
        type: 'studio',
        email: 'admin@fliplet.com'
      },
      type: 'user.login',
      dataString: null
    },
    {
      createdAt: '2022-01-26T16:33:13.327Z',
      user: {
        type: 'app',
        email: 'token-eu-16-14-ios-unsigned@fliplet.com'
      },
      type: 'app.update',
      app: {
        name: 'FV Local'
      },
      dataString: '{"ip": "172.18.0.1", "path": "/v1/apps/15/bundle/update", "device": {"uuid": "10c809e479c98b80", "model": "sdk_gphone_arm64", "width": 393, "height": 851, "version": "11", "platform": "Android", "manufacturer": "Google"}, "method": "POST", "session": 418, "statusCode": 200, "responseBody": {"app": {"release": {"type": "silent", "changelog": ""}, "version": "10"}}}'
    },
    {
      createdAt: '2022-01-26T16:32:42.917Z',
      user: {
        type: 'app',
        email: 'token-eu-16-14-ios-unsigned@fliplet.com'
      },
      type: 'app.update',
      app: {
        name: 'FV Local'
      },
      dataString: '{"ip": "172.18.0.1", "path": "/v1/apps/15/bundle/update", "device": {"uuid": "10c809e479c98b80", "model": "sdk_gphone_arm64", "width": 393, "height": 851, "version": "11", "platform": "Android", "manufacturer": "Google"}, "method": "POST", "session": 418, "statusCode": 200, "responseBody": {"app": {"release": {"type": "silent", "changelog": ""}, "version": "10"}}}'
    },
    {
      createdAt: '2022-01-26T16:32:12.264Z',
      user: {
        type: 'app',
        email: 'token-eu-16-14-ios-unsigned@fliplet.com'
      },
      type: 'app.update',
      app: {
        name: 'FV Local'
      },
      dataString: '{"ip": "172.18.0.1", "path": "/v1/apps/15/bundle/update", "device": {"uuid": "10c809e479c98b80", "model": "sdk_gphone_arm64", "width": 393, "height": 851, "version": "11", "platform": "Android", "manufacturer": "Google"}, "method": "POST", "session": 418, "statusCode": 200, "responseBody": {"app": {"release": {"type": "silent", "changelog": ""}, "version": "10"}}}'
    },
    {
      createdAt: '2022-01-26T16:31:41.699Z',
      user: {
        type: 'app',
        email: 'token-eu-16-14-ios-unsigned@fliplet.com'
      },
      type: 'app.update',
      app: {
        name: 'FV Local'
      },
      dataString: '{"ip": "172.18.0.1", "path": "/v1/apps/15/bundle/update", "device": {"uuid": "10c809e479c98b80", "model": "sdk_gphone_arm64", "width": 393, "height": 851, "version": "11", "platform": "Android", "manufacturer": "Google"}, "method": "POST", "session": 418, "statusCode": 200, "responseBody": {"app": {"release": {"type": "silent", "changelog": ""}, "version": "10"}}}'
    }
  ],
  query: {
    where: {
      createdAt: {
        $gte: '2022-02-03T00:00:00.000Z',
        $lte: '2022-02-10T12:18:38.430Z'
      }
    },
    offset: 0,
    limit: 25,
    order: [
      [
        'createdAt',
        'DESC'
      ]
    ]
  },
  totalCount: 42,
  pageNumber: 0,
  perPage: 25,
  pageCount: 2
};

export default sampleData;
