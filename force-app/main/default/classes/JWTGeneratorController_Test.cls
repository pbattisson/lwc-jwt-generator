@isTest
private with sharing class JWTGeneratorController_Test {
    
    @isTest
    private static void testErrorNoUsername() {
        try {
            JWTGeneratorController.generateJSONWebToken(null, null, null, null);
        } catch(JWTGeneratorException ex) {
            System.Assert.areEqual('Username must be provided', ex.getMessage(), 'Incorrect error message returned for missing username');
        }
    }

    @isTest
    private static void testErrorNoAudience() {
        try {
            JWTGeneratorController.generateJSONWebToken('test@test.com', null, null, null);
        } catch(JWTGeneratorException ex) {
            System.Assert.areEqual('Audience must be provided', ex.getMessage(), 'Incorrect error message returned for missing audience');
        }
    }

    @isTest
    private static void testErrorNoClientId() {
        try {
            JWTGeneratorController.generateJSONWebToken('test@test.com', 'https://login.salesforce.com', null, null);
        } catch(JWTGeneratorException ex) {
            System.Assert.areEqual('Client ID must be provided', ex.getMessage(), 'Incorrect error message returned for missing Client ID');
        }
    }

    @isTest
    private static void testErrorNoCertificateName() {
        try {
            JWTGeneratorController.generateJSONWebToken('test@test.com', 'https://login.salesforce.com', 'TEST_CLIENT_ID', null);
        } catch(JWTGeneratorException ex) {
            System.Assert.areEqual('Certificate Name must be provided', ex.getMessage(), 'Incorrect error message returned for missing Certificate Name');
        }
    }

    @isTest
    private static void testDummyToken() {
        String token = JWTGeneratorController.generateJSONWebToken('test@test.com', 'https://login.salesforce.com', 'TEST_CLIENT_ID', 'TEST_CERTIFICATE');
        System.Assert.areEqual('here-is-a-dummy-token', token, 'Incorrect test token returned');
    }
}