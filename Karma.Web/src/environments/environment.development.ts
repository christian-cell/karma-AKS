export const environment = {

    production: false,
    api:
    {
        baseUrl: window.location.hostname === 'localhost' ? 'http://localhost/api/' : 'https://api.best-karma-dev.com/api/' 
    },

    mobileViewBreakPoint: /* 600 */850,

    karmaService : {
        
        url: window.location.hostname === 'localhost' ? 'http://localhost/api/' : 'https://api.best-karma-dev.com/api/',
        clientId: 'f820f47a-87f6-4e8b-86e5-5d88dfecfff5', 
        authority: 'https://login.microsoftonline.com/7f1515ce-eca9-44de-8704-a993e9998a9a',
        
        
        redirectUri: window.location.hostname === 'localhost' ? 'http://localhost:4200' : 'https://front.best-karma-dev.com/',

        logoutRedirectUri: window.location.hostname === 'localhost' ? 'http://localhost:4200' : 'https://front.best-karma-dev.com/', 
        scopes:['user.read']
    },
};
