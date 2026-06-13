---
name: 1inch-mcp-server
description: >-
  Connect to the 1inch MCP server for documentation search, SDK examples, token swaps,
  limit orders, authenticated product API access, and (when registered) org-scoped log lookup. Use when the user asks about 1inch integration,
  DeFi swaps, classic or Fusion or cross-chain flows, orderbook, portfolio, gas or spot price APIs, API keys, MCP or IDE setup, or blockchain development with 1inch.
license: MIT
compatibility: Requires an MCP-capable client with HTTP transport (preferred) or stdio plus Node.js 18+ for supergateway bridging.
metadata:
  mcp_url_production: https://api.1inch.com/mcp/protocol
  documentation: https://business.1inch.com/portal/documentation/ai-integration/ecosystem
---

# 1inch MCP Server

This skill teaches agents how to wire and use the **1inch MCP server** so users get docs, examples, and (with auth) swaps and APIs without re-explaining setup each session.

## When to use this skill

Load this skill whenever the user’s goal depends on the **1inch MCP server** (tools, URL, or auth) or on **1inch Business** product APIs from an AI-assisted workflow.

**Documentation and discovery** (`search`)

- Explain or find behavior in 1inch docs: APIs, slippage, supported chains, rate limits, error codes, SDK usage.
- Compare approaches (e.g. classic vs Fusion vs cross-chain) or look up parameters before coding.

**SDK examples** (`list_examples`, `get_example`)

- Show runnable example code: swap flows, limit orders, chain-specific snippets.
- Pull source from a named example package for copy-paste or review.

**MCP resources** (server `resources` / `read`, if the client lists them)

- Use bundled guides: **swap workflow**, **classic / Fusion / cross-chain** swap guides, **quote** guide, **orderbook workflow**, and the **API index**; plus **SDK examples** as a resource—when the user wants a single structured document instead of or alongside `search`.

**Swaps and routing** (`swap` — requires auth)

- The tool does the heavy work server-side: routing, quotes, and assembling **ready-to-use** data (e.g. unsigned transaction parameters, typed data, or follow-up steps for Fusion/cross-chain). The user or wallet only **signs** and **submits** what the tool returns—no hand-built calldata in the client for normal flows. Supports **classic**, **Fusion (intent)**, and **cross-chain**; `quoteOnly` for inspection without execution.

**Limit orders** (`orderbook` — requires auth)

- Same idea: `build` runs server-side order construction; the response is **EIP-712 (or similar) data ready to sign**—then `create` with the signature, or `list` / `cancel` for lifecycle. The tool carries the orderbook API complexity; the user supplies signing and on-chain follow-through.

**Other product HTTP APIs** (`product_api` — requires auth)

- Call 1inch product endpoints exposed via the gateway: e.g. **portfolio**, **spot price**, **gas price**, **token** metadata, and other [documented](https://business.1inch.com/portal/llms.txt) paths—without re-inventing base URLs and auth for each call.

**Operations and support** (`debug` — requires auth, **optional** tool)

- Look up **organization-scoped** application logs (e.g. by `x-request-id` or time window) when the server exposes this tool and the user is debugging production or API behavior for their org.

**Client setup and configuration**

- Wire **MCP in Cursor, VS Code, Claude Desktop, Claude Code, Codex, Gemini CLI**, or other HTTP/stdio clients; set **`https://api.1inch.com/mcp/protocol`**, headers, or supergateway.
- Use **API keys**, **OAuth**, or understand **which tools are public vs authenticated**.

**General triggers**

- “Connect 1inch to my IDE / agent / MCP” or “how do I authenticate for 1inch MCP.”
- Building or integrating a **dapp, bot, or backend** that uses 1inch Business APIs with AI help.

If the question is only **unrelated off-chain** topics with no 1inch API or MCP angle, you do not need this skill.

## Server URL (production)

`https://api.1inch.com/mcp/protocol` (Streamable HTTP)

## Client setup (summary)

| Client                           | Transport | Config pattern                                                                                                             |
| -------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| Cursor                           | HTTP      | `.cursor/mcp.json` -> `"url": "https://api.1inch.com/mcp/protocol"`                                                        |
| VS Code Copilot                  | HTTP      | `.vscode/mcp.json` -> `type: "http"`, same URL                                                                             |
| Claude Code / Codex / Gemini CLI | HTTP      | CLI `mcp add` with `--transport http` and the URL                                                                          |
| Claude Desktop                   | stdio     | Launch `npx -y supergateway --streamableHttp <URL> --outputTransport stdio` (see [references/AUTH.md](references/AUTH.md)) |

Prefer **HTTP** when the client supports it; use **supergateway** only for stdio-only clients.

## Tools overview

| Tool            | Auth          | Purpose                                                                                                                              |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `search`        | Public        | Search 1inch docs and API reference                                                                                                  |
| `list_examples` | Public        | List SDK example packages                                                                                                            |
| `get_example`   | Public        | Fetch example source files                                                                                                           |
| `swap`          | Authenticated | Quotes and swap execution flows                                                                                                      |
| `orderbook`     | Authenticated | Build/create/list/cancel limit orders                                                                                                |
| `product_api`   | Authenticated | Call other 1inch product APIs                                                                                                        |
| `debug`         | Authenticated | Organization-scoped request log lookup (Grafana Loki) — **optional**; only appears in `tools/list` when the deployment registers it. |

Full parameters: [references/TOOLS.md](references/TOOLS.md).

## Authentication

- **API key:** `Authorization: Bearer <key>` on the HTTP transport where the client allows headers.
- **OAuth:** Supported by the server for interactive login when no API key is set.

Details and client-specific snippets: [references/AUTH.md](references/AUTH.md).

## Example prompts (for the user)

- "Search 1inch docs for how to set slippage on Base."
- "Show the TypeScript swap example for Fusion on Ethereum."
- "Quote swapping 100 USDC to ETH on Arbitrum" (requires auth for execution tools).
- "List my open limit orders on Ethereum" / "Build a limit order to sell 1 WETH for USDC" (auth).
- "What's my portfolio value on Arbitrum?" or "Fetch spot price for this token" via `product_api` (auth).
- "Find logs for request id … in the last hour" when `debug` is available (auth).

## Progressive disclosure

- Load [references/TOOLS.md](references/TOOLS.md) when you need exact tool arguments or edge cases.
- Load [references/AUTH.md](references/AUTH.md) when configuring headers, OAuth, or Claude Desktop bridging.

## Legal

Use of the MCP server is subject to 1inch Business Portal terms linked from the [product documentation](https://business.1inch.com/portal/documentation/ai-integration/mcp-server).
