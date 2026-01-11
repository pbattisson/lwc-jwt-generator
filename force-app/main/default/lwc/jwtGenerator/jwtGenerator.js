import { LightningElement } from 'lwc';
import generateJSONWebToken  from '@salesforce/apex/JWTGeneratorController.generateJSONWebToken';
import LightningAlert from 'lightning/alert';

export default class JwtGenerator extends LightningElement {

    username;
    audience;
    clientId;
    certificateName;
    token;

    loading = false;

    handleUsernameChange(event) {
        this.username = event.target.value;
    }

    handleAudienceChange(event) {
        this.audience = event.target.value;
    }

    handleClientIdChange(event) {
        this.clientId = event.target.value;
    }

    handleCertificateNameChange(event) {
        this.certificateName = event.target.value;
    }

    get audienceOptions() {
        return [
            { label: 'https://login.salesforce.com', value: 'https://login.salesforce.com'},
            { label: 'https://test.salesforce.com', value: 'https://test.salesforce.com'}
        ]
    }

    get buttonDisabled() {
        return !(this.username !== undefined && this.audience !== undefined && this.clientId !== undefined && this.certificateName !== undefined);
    }

    async generateToken() {
        this.loading = true;
        try {
            this.token = await generateJSONWebToken({ username: this.username, audience: this.audience, clientId: this.clientId, certificateName: this.certificateName});
        } catch(error) {
            this.token = undefined;
            await LightningAlert.open({
                message: error.body.message,
                theme: 'error', // a red theme intended for error states
                label: 'Error', // this is the header text
            });
        }
        this.loading = false;
    }

}