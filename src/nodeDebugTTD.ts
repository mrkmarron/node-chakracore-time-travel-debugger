/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import {ChromeDebugSession, logger} from 'vscode-chrome-debug-core';
import * as path from 'path';
import * as os from 'os';

import {NodeDebugTTDAdapter} from './nodeDebugTTDAdapter';

ChromeDebugSession.run(ChromeDebugSession.getSession(
    {
        logFilePath: path.join(os.tmpdir(), 'node-chakracore-time-travel-debugger.txt'), // non-.txt file types can't be uploaded to github
        adapter: NodeDebugTTDAdapter,
        extensionName: 'node-chakracore-time-travel-debugger',
        enableSourceMapCaching: true
    }));

/* tslint:disable:no-var-requires */
logger.log('node-chakracore-time-travel-debugger: ' + require('../package.json').version);
