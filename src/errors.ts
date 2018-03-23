/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import {DebugProtocol} from 'vscode-debugprotocol';

export function runtimeNotFound(_runtime: string): DebugProtocol.Message {
    return {
        id: 2001,
        format: `VSND2001', "Cannot find runtime '${_runtime}' on PATH.`,
        variables: { _runtime }
    };
}

export function cannotLaunchInTerminal(_error: string): DebugProtocol.Message {
    return {
        id: 2011,
        format: `VSND2011', "Cannot launch debug target in terminal (${_error}).`,
        variables: { _error }
    };
}

export function cannotLaunchDebugTarget(_error: string): DebugProtocol.Message {
    return {
        id: 2017,
        format: `VSND2017', "Cannot launch debug target (${_error}).`,
        variables: { _error },
        showUser: true,
        sendTelemetry: true
    };
}

export function unknownConsoleType(consoleType: string): DebugProtocol.Message {
    return {
        id: 2028,
        format: `VSND2028', "Unknown console type '${consoleType}'.`
    };
}

export function cannotLaunchBecauseSourceMaps(programPath: string): DebugProtocol.Message {
    return {
        id: 2002,
        format: `VSND2002', "Cannot launch program '${programPath}'; configuring source maps might help.`,
        variables: { path: programPath }
    };
}

export function cannotLaunchBecauseOutFiles(programPath: string): DebugProtocol.Message {
    return {
        id: 2003,
        format: `VSND2003', "Cannot launch program '${programPath}'; setting the 'outFiles' attribute might help.`,
        variables: { path: programPath }
    };
}

export function cannotLaunchBecauseJsNotFound(programPath: string): DebugProtocol.Message {
    return {
        id: 2009,
        format: `VSND2009', "Cannot launch program '${programPath}' because corresponding JavaScript cannot be found.`,
        variables: { path: programPath }
    };
}

export function cannotLoadEnvVarsFromFile(error: string): DebugProtocol.Message {
    return {
        id: 2029,
        format: `VSND2029', "Can't load environment variables from file (${error}).`,
        variables: { _error: error }
    };
}
