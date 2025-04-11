namespace Karma.Services.Configurations
{
    public class GlobalConfiguration
    {
        public class AzureConfiguration
        {
            public class Ad
            {
                public string Instance { get; set; }
                public string ClientId { get; set; }
                public string Audience { get; set; }
                public string TenantId { get; set; }
                public string Scopes { get; set; }
                public string AuthorizationUrl { get; set; }
                public string TokenUrl { get; set; }
            
                public Ad(string instance, string clientId, string audience, string tenantId, string scopes,
                    string authorizationUrl, string tokenUrl)
                {
                    Instance = instance ?? throw new ArgumentNullException(nameof(instance));
                    ClientId = clientId ?? throw new ArgumentNullException(nameof(clientId));
                    Audience = audience ?? throw new ArgumentNullException(nameof(audience));
                    TenantId = tenantId ?? throw new ArgumentNullException(nameof(tenantId));
                    Scopes = scopes ?? throw new ArgumentNullException(nameof(scopes));
                    AuthorizationUrl = authorizationUrl ?? throw new ArgumentNullException(nameof(authorizationUrl));
                    TokenUrl = tokenUrl ?? throw new ArgumentNullException(nameof(tokenUrl));
                }
            }

            public class CosmosDb
            {
                public class Docker
                {
                    public string PrimaryKey { get; set; }
                    public string PrimaryConnectionString { get; set; }
                    public string MongoConnectionString { get; set; }
                    
                    public Docker(string primaryKey, string primaryConnectionString, string mongoConnectionString)
                    {
                        PrimaryKey = primaryKey ?? throw new ArgumentNullException(nameof(primaryKey));
                        PrimaryConnectionString = primaryConnectionString ?? throw new ArgumentNullException(nameof(primaryConnectionString));
                        MongoConnectionString = mongoConnectionString ?? throw new ArgumentNullException(nameof(mongoConnectionString));
                    }
                }
            }
        }
    }
};

