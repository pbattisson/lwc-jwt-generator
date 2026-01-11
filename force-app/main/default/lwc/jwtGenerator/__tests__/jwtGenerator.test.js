import { createElement } from '@lwc/engine-dom';
import JwtGenerator from 'c/jwtGenerator';
import LightningAlert from 'lightning/alert';
import generateJSONWebToken  from '@salesforce/apex/JWTGeneratorController.generateJSONWebToken';

jest.mock('@salesforce/apex/JWTGeneratorController.generateJSONWebToken',
    ()=>({
        default:jest.fn()
    }), {
    //Must use this virtual option parameter because we cannot load our apex class during this test run
        virtual:true
});

jest.mock('lightning/alert');

describe('c-jwt-generator', () => {
    beforeEach(() => {
        const element = createElement('c-jwt-generator', {
            is: JwtGenerator
        });

        // Act
        document.body.appendChild(element);
    });

    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    test('Button should be disabled whilst properties are blank', () => {
        const cmp = document.querySelector('c-jwt-generator');
        const btn = cmp.shadowRoot.querySelector('lightning-button');
        
        // All fields start undefined
        expect(btn.disabled).toBe(true);
    });

    test('Button should be enabled when all properties are set', () => {
        const cmp = document.querySelector('c-jwt-generator');
        const btn = cmp.shadowRoot.querySelector('lightning-button');
        
        // All fields start undefined
        expect(btn.disabled).toBe(true);

        // Set the values and fire the onchange events

        const usernameInput = cmp.shadowRoot.querySelector('lightning-input[data-id="username"]');
        usernameInput.value = 'test@example.com';
        usernameInput.dispatchEvent(new CustomEvent('change'));

        const audienceInput = cmp.shadowRoot.querySelector('lightning-combobox[data-id="audience"]');
        audienceInput.value = 'https://login.salesforce.com';
        audienceInput.dispatchEvent(new CustomEvent('change'));

        const clientInput = cmp.shadowRoot.querySelector('lightning-input[data-id="clientid"]');
        clientInput.value = '12345';
        clientInput.dispatchEvent(new CustomEvent('change'));

        const certInput = cmp.shadowRoot.querySelector('lightning-input[data-id="certificate"]');
        certInput.value = 'TEST_CERT';
        certInput.dispatchEvent(new CustomEvent('change'));
        
        return Promise.resolve().then(() => {
            expect(btn.disabled).toBe(false);
        });
    });

    test('Successful token generation', async () => {
        generateJSONWebToken.mockResolvedValue('MOCK-JWT-TOKEN');

        const cmp = document.querySelector('c-jwt-generator');
        const btn = cmp.shadowRoot.querySelector('lightning-button');

        // All fields start undefined
        expect(btn.disabled).toBe(true);

        // Set the values and fire the onchange events

        const usernameInput = cmp.shadowRoot.querySelector('lightning-input[data-id="username"]');
        usernameInput.value = 'test@example.com';
        usernameInput.dispatchEvent(new CustomEvent('change'));

        const audienceInput = cmp.shadowRoot.querySelector('lightning-combobox[data-id="audience"]');
        audienceInput.value = 'https://login.salesforce.com';
        audienceInput.dispatchEvent(new CustomEvent('change'));

        const clientInput = cmp.shadowRoot.querySelector('lightning-input[data-id="clientid"]');
        clientInput.value = '12345';
        clientInput.dispatchEvent(new CustomEvent('change'));

        const certInput = cmp.shadowRoot.querySelector('lightning-input[data-id="certificate"]');
        certInput.value = 'TEST_CERT';
        certInput.dispatchEvent(new CustomEvent('change'));

        btn.click();

        // Wait for the async operation to complete
        await Promise.resolve();
        await Promise.resolve();

        const tokenElement = cmp.shadowRoot.querySelector('p');
        expect(tokenElement.textContent).toBe('MOCK-JWT-TOKEN');
    });

    test('Unsuccessful token generation', async () => {
        generateJSONWebToken.mockRejectedValue({body: { message: 'Invalid request'}});
        LightningAlert.open = jest.fn().mockResolvedValue();

        const cmp = document.querySelector('c-jwt-generator');
        const btn = cmp.shadowRoot.querySelector('lightning-button');

        // All fields start undefined
        expect(btn.disabled).toBe(true);

        // Set the values and fire the onchange events

        const usernameInput = cmp.shadowRoot.querySelector('lightning-input[data-id="username"]');
        usernameInput.value = 'test@example.com';
        usernameInput.dispatchEvent(new CustomEvent('change'));

        const audienceInput = cmp.shadowRoot.querySelector('lightning-combobox[data-id="audience"]');
        audienceInput.value = 'https://login.salesforce.com';
        audienceInput.dispatchEvent(new CustomEvent('change'));

        const clientInput = cmp.shadowRoot.querySelector('lightning-input[data-id="clientid"]');
        clientInput.value = '12345';
        clientInput.dispatchEvent(new CustomEvent('change'));

        const certInput = cmp.shadowRoot.querySelector('lightning-input[data-id="certificate"]');
        certInput.value = 'TEST_CERT';
        certInput.dispatchEvent(new CustomEvent('change'));

        btn.click();

        // Wait for the async operation to complete
        await Promise.resolve();
        await Promise.resolve();

        const tokenElement = cmp.shadowRoot.querySelector('p');
        expect(tokenElement.textContent).toBe('');
        expect(LightningAlert.open.mock.calls).toHaveLength(1);
    });

});