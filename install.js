module.exports = {
  run: [
    // 1. Clone the main repo
    {
      method: "shell.run",
      params: {
        message: "git clone https://github.com/proximasan/tadpole-studio app",
      },
    },
    // 2. Install pnpm (Pinokio bundles npm but not pnpm)
    {
      method: "shell.run",
      params: {
        message: "npm install -g pnpm",
      },
    },
    // 3. Install backend Python dependencies
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        message: "uv sync",
      },
    },
    // 4. Install CUDA PyTorch on Windows/Linux (skip on macOS)
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        message: "{{platform === 'darwin' ? 'echo Skipping CUDA torch on macOS' : 'uv pip install --reinstall-package torch --reinstall-package torchvision --reinstall-package torchaudio torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128'}}",
      },
    },
    // 5. Install frontend dependencies (hoisted layout for Next.js compat)
    {
      method: "shell.run",
      params: {
        path: "app/frontend",
        env: {
          npm_config_node_linker: "hoisted",
        },
        message: "pnpm install --frozen-lockfile",
      },
    },
    // 6. Link shared checkpoints with other ACE-Step Pinokio apps
    {
      method: "fs.link",
      params: {
        drive: {
          checkpoints: "app/backend/data/checkpoints",
        },
        peers: [
          "https://github.com/cocktailpeanut/ace-step.pinokio.git",
          "https://github.com/cocktailpeanut/ace-step-ui.pinokio.git",
        ],
      },
    },
  ],
}
