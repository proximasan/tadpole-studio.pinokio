module.exports = {
  daemon: true,
  run: [
    // 1. Store the frontend port so we can pass it to the backend as a CORS origin
    {
      method: "local.set",
      params: {
        frontend_port: "{{port}}",
      },
    },
    // 2. Start the backend (FastAPI/Uvicorn on port 8000)
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        env: {
          PYTHONUNBUFFERED: "1",
          TADPOLE_CORS_ORIGINS: "http://localhost:{{local.frontend_port}},http://127.0.0.1:{{local.frontend_port}},http://localhost:3000,http://127.0.0.1:3000",
        },
        message: "uv run --no-sync tadpole-studio",
        on: [{
          event: "/Uvicorn running on/i",
          done: true,
        }],
      },
    },
    // 3. Start the frontend (Next.js on Pinokio-assigned port)
    {
      method: "shell.run",
      params: {
        path: "app/frontend",
        env: {
          NEXT_TELEMETRY_DISABLED: "1",
          PORT: "{{local.frontend_port}}",
        },
        message: "pnpm dev",
        on: [{
          event: "/(http:\\/\\/\\S+)/",
          done: true,
        }],
      },
    },
    // 4. Store the frontend URL for the "Open Web UI" menu button
    {
      method: "local.set",
      params: {
        url: "{{input.event[1]}}",
      },
    },
  ],
}
