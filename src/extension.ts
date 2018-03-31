/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const pendingLaunchMap = new Map<number, [(msg) => void, () => void]>();

    vscode.debug.onDidReceiveDebugSessionCustomEvent((e: vscode.DebugSessionCustomEvent) => {
        if (e.event !== 'ttdLaunch') {
            return;
        }

        try {
            if (e.body.state === 'start') {
                vscode.window.withProgress({ location: vscode.ProgressLocation.Window, title: 'TTD Launch Status' }, p => {
                    return new Promise((resolve, reject) => {
                        p.report({ message: 'TTD: Configuring Time-Travel Trace.' });

                        pendingLaunchMap.set(e.body.id, [
                            (msg) => p.report({ message: msg }),
                            () => resolve()
                        ]);
                    });
                });
            } else if (e.body.state === 'write') {
                (pendingLaunchMap.get(e.body.id)[0])('TTD: Writing Time-Travel Trace.');
            } else if (e.body.state === 'complete') {
                if (e.body.payload.launch) {
                    (pendingLaunchMap.get(e.body.id)[0])('TTD: Launching Time-Travel Debug Configuration.');

                    vscode.debug.startDebugging(undefined, e.body.payload.config).then(() => {
                        (pendingLaunchMap.get(e.body.id)[1])();
                        pendingLaunchMap.delete(e.body.id);
                    });
                } else {
                    (pendingLaunchMap.get(e.body.id)[0])('TTD: Launch Aborted!');

                    (pendingLaunchMap.get(e.body.id)[1])();
                    pendingLaunchMap.delete(e.body.id);
                }
            } else {
                // e.body.state === 'fail'

                (pendingLaunchMap.get(e.body.id)[1])();
                pendingLaunchMap.delete(e.body.id);

                let msg = '';
                if(e.body && e.body.payload) {
                    msg = ' -- ' + JSON.stringify(e.body.payload);
                }
                vscode.window.showErrorMessage('TTD: Failed to launch time-travel debugging session' + msg);
            }
        } catch (ex) {
            ;
        }
    });

    const provider = new NodeDebugTTDConfigurationProvider();
    context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('node-chakracore-time-travel-debugger', provider));
    context.subscriptions.push(provider);
}

export function deactivate() {
}

class NodeDebugTTDConfigurationProvider implements vscode.DebugConfigurationProvider {
    resolveDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: vscode.DebugConfiguration, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.DebugConfiguration> {
        config.protocol = 'inspector';
        if (process.platform === 'win32') {
            config.runtimeExecutable = path.join(__dirname, '../nodebins/win32/node.exe');
        } else if (process.platform === 'linux') {
            config.runtimeExecutable = path.join(__dirname, '../nodebins/linux/node.exe');
        } else {
            config.runtimeExecutable = path.join(__dirname, '../nodebins/darwin/node');
        }
        config.runtimeArgs = [
            '--tt-debug'
        ];
        config.console = "internalConsole";

        return config;
    }

    dispose() {
    }
}


