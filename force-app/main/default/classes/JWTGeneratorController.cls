public with sharing class JWTGeneratorController {
    
    @AuraEnabled(cacheable = false)
    public static string generateJSONWebToken(String username, String audience, String clientId, String certificateName){
        if(username == null) {
            throw new JWTGeneratorException('Username must be provided');
        }

        if(audience == null) {
            throw new JWTGeneratorException('Audience must be provided');
        }

        if(clientId == null) {
            throw new JWTGeneratorException('Client ID must be provided');
        }

        if(certificateName == null) {
            throw new JWTGeneratorException('Certificate Name must be provided');
        }

        String tokenEndpoint = audience + '/services/oauth2/token';

        Auth.JWT jwt = new Auth.JWT();
        jwt.setSub(username); 
        jwt.setAud(audience); 
        jwt.setIss(clientId);

        //Return a dummy token if testing
        if(Test.isRunningTest()) {
            return 'here-is-a-dummy-token';
        }

        Auth.JWS jws = new Auth.JWS(jwt, certificateName);

        String token = jws.getCompactSerialization();

        Auth.JWTBearerTokenExchange bearer = new Auth.JWTBearerTokenExchange(tokenEndpoint, jws);        

        return bearer.getAccessToken();
    }

}