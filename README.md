# LWC JWT Generator

A simple LWC you can deploy to your org to help you generate a JWT for an integration.

![Screenshot the component deployed](/images/Screenshot.png)

## Configuration

To utilise, you should have:
- A certificate uploaded to Salesforce 
- An External Client App configured that supports the JWT Bearer Flow (under Settings -> OAuth Settings -> Flow Enablement)
- The certificate linked to the External Client App for the JWT Bearer Flow

Ensure that the username you enter is one that is authorized under the OAuth settings and you can generate a token for use.