# Node Debugger with mixed Live and Time-Travel support

This debugger provides a launch configuratoins and support for mixing live and 
time-travel debugging in Node.js. In addition to the Visual Studio Code debugger logic this extension provides:
1. [NodeChakraCore binaries](https://github.com/nodejs/node-chakracore) with time-travel debugging functionality.
2. Launch configuration for mixed live/time-travel debugging.

## Adding a Launch Configuration

## Initiating Time-Travel

## Switching Between Live and Time-Travel Modes

# Notes
1. The debugger always uses the extension provided NodeChakraCore binaries. If your application depends on a specifc version of Node you may encounter unusual behavior.
2. Time-Travel mode is not enabled until 

## License

Copyright (c) Microsoft Corporation. All rights reserved.

Licensed under the [MIT](LICENSE.txt) License.
