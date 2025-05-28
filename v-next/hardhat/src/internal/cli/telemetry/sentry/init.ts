/* This file is inspired by https://github.com/getsentry/sentry-javascript/blob/9.4.0/packages/node/src/sdk/index.ts */

import type {
  BaseTransportOptions,
  Integration,
  ServerRuntimeClientOptions,
  Transport,
} from "@sentry/core";

import {
  createStackParser,
  functionToStringIntegration,
  getIntegrationsToSetup,
  initAndBind,
  linkedErrorsIntegration,
  nodeStackLineParser,
  requestDataIntegration,
  ServerRuntimeClient,
  stackParserFromStackParserOptions,
} from "@sentry/core";

import { getHardhatVersion } from "../../../utils/package.js";

import { onUncaughtExceptionIntegration } from "./integrations/onuncaughtexception.js";
import { onUnhandledRejectionIntegration } from "./integrations/onunhandledrejection.js";
import { nodeContextIntegration } from "./vendor/integrations/context.js";
import { contextLinesIntegration } from "./vendor/integrations/contextlines.js";
import { createGetModuleFromFilename } from "./vendor/utils/module.js";

interface InitOptions {
  dsn: string;
  transport: (transportOptions: BaseTransportOptions) => Transport;
  serverName?: string;
  integrations?: (integrations: Integration[]) => Integration[];
}

/**
 * Initialize Sentry for Node, without performance instrumentation.
 */
export async function init(options: InitOptions): Promise<void> {
  const stackParser = stackParserFromStackParserOptions(
    createStackParser(nodeStackLineParser(createGetModuleFromFilename())),
  );

  const integrationOptions = {
    defaultIntegrations: [
      functionToStringIntegration(),
      linkedErrorsIntegration(),
      requestDataIntegration(),
      // Global Handlers
      onUncaughtExceptionIntegration(),
      onUnhandledRejectionIntegration(),
      // Event Info
      nodeContextIntegration(),
      contextLinesIntegration(),
    ],
    integrations: options.integrations,
  };

  const clientOptions: ServerRuntimeClientOptions = {
    sendClientReports: true,
    ...options,
    platform: "node",
    runtime: {
      name: "node",
      version: process.version,
    },
    stackParser,
    integrations: getIntegrationsToSetup(integrationOptions),
    _metadata: {
      sdk: {
        name: "hardhat",
        version: await getHardhatVersion(),
      },
    },
  };

  initAndBind(ServerRuntimeClient, clientOptions);
}
