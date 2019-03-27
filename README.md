NiftyFootball API
=================

* Serverless environment

* Setup local and prod envs with the correct open sea API key
    ```
    firebase functions:config:set secret.api.key="<the secret API key>”
    ```
* To run locally you need to 
    * `cd functions`
    * `firebase functions:config:get > .runtimeconfig.json` - Ensure this is **NOT** committed into the repo!
