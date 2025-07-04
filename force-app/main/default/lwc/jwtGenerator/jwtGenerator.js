import { LightningElement, wire } from 'lwc';
import generateJSONWebToken  from '@salesforce/apex/JWTGeneratorController.generateJSONWebToken';

export default class JwtGenerator extends LightningElement {

    username;
    audience;
    clientId;
    certificateName;
    token;

    loading = false;

    handleUsernameChange(event) {
        this.username = event.detail.value;
    }

    handleAudienceChange(event) {
        this.audience = event.detail.value;
    }

    handleClientIdChange(event) {
        this.clientId = event.detail.value;
    }

    handleCertificateNameChange(event) {
        this.certificateName = event.detail.value;
    }

    get audienceOptions() {
        return [
            { label: 'https://login.salesforce.com', value: 'https://login.salesforce.com'},
            { label: 'https://test.salesforce.com', value: 'https://test.salesforce.com'}
        ]
    }

    async generateToken() {
        this.loading = true;
        try {
            this.token = await generateJSONWebToken({ username: this.username, audience: this.audience, clientId: this.clientId, certificateName: this.certificateName});
        } catch(error) {
            this.token = undefined;
            await LightningAlert.open({
                message: error,
                theme: 'error', // a red theme intended for error states
                label: 'Error', // this is the header text
            });
        }
        this.loading = false;
    }

}