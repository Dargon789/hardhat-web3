# Authentication -- 1inch MCP

## API key

Obtain a key from the [1inch Business Portal](https://business.1inch.com/portal).

Pass it as:

`Authorization: Bearer <YOUR_API_KEY>`

How you set this depends on the client:

- **Cursor** (`.cursor/mcp.json`): `headers.Authorization`
- **VS Code** (`.vscode/mcp.json`): `headers.Authorization`
- **Claude Code**: `claude mcp add --header "Authorization: Bearer ..."`
- **Claude Desktop** (stdio via supergateway): add `--header` `Authorization: Bearer ...` to the supergateway args **after** `--streamableHttp` and URL (see product docs).

## OAuth

If the user calls an authenticated tool without a key, MCP clients that support OAuth can start a browser login against the 1inch Business Portal. After login, tools work for that session.

Protected tools (including the optional `debug` log lookup) need a **non-anonymous** session: a **Bearer API key** and/or **OAuth** as supported by the gateway, plus (for `debug`) organization context for log scoping. The `debug` tool is only available when the server registers it; see [TOOLS.md](TOOLS.md).

## Stdio bridging (Claude Desktop and similar)

When the client only supports stdio:

```bash
npx -y supergateway \
  --streamableHttp https://api.1inch.com/mcp/protocol \
  --outputTransport stdio
```

With API key:

```bash
npx -y supergateway \
  --streamableHttp https://api.1inch.com/mcp/protocol \
  --header "Authorization: Bearer YOUR_API_KEY" \
  --outputTransport stdio
```

Use **absolute paths** to `npx` and ensure `PATH` in the MCP server `env` includes your Node binary directory.

## Security

- Never commit API keys to repositories or skills.
- Treat skills that mention keys as **user-supplied configuration**, not embedded secrets.
