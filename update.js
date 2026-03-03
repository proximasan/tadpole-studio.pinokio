module.exports = {
  run: [
    // 1. Pull launcher repo updates
    {
      method: "shell.run",
      params: {
        message: "git pull",
      },
    },
    // 2. Pull main app updates
    {
      method: "shell.run",
      params: {
        path: "app",
        message: "git pull",
      },
    },
    // 3. Reinstall backend dependencies
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        message: "uv sync",
      },
    },
    // 4. Reinstall CUDA PyTorch on Windows/Linux (skip on macOS)
    {
      method: "shell.run",
      params: {
        path: "app/backend",
        message: "{{platform === 'darwin' ? 'echo Skipping CUDA torch on macOS' : 'uv pip install --reinstall-package torch --reinstall-package torchvision --reinstall-package torchaudio torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128'}}",
      },
    },
    // 5. Reinstall frontend dependencies
    {
      method: "shell.run",
      params: {
        path: "app/frontend",
        message: "pnpm install --frozen-lockfile",
      },
    },
    // 6. Re-establish shared checkpoint links
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
