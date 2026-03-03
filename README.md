# Tadpole Studio — Pinokio Launcher

1-click installer for [Tadpole Studio](https://github.com/proximasan/tadpole-studio), a local-first AI music generation studio powered by ACE-Step 1.5.

## Install via Pinokio

1. Install [Pinokio](https://pinokio.computer) if you haven't already
2. Click **Discover** in Pinokio and search for "Tadpole Studio", or download this repo directly
3. Click **Install** — this clones the app, installs Python + Node dependencies, and sets up CUDA PyTorch on Windows/Linux
4. Click **Start** — launches the backend and frontend
5. Click **Open Web UI** — opens Tadpole Studio in your browser

## What gets installed

- **Backend**: Python 3.11+ with FastAPI, ACE-Step 1.5, and all ML dependencies (~2-4 GB)
- **Frontend**: Next.js app with pnpm
- **CUDA PyTorch** (Windows/Linux only): Automatically installed for NVIDIA GPU acceleration
- **Model checkpoints**: ~10 GB, downloaded on first music generation (not during install)

## Shared checkpoints

If you already have ACE-Step checkpoints from another Pinokio app (e.g. ACE-Step 1.5 or ACE-Step UI), they are automatically shared via Pinokio's `fs.link` — no duplicate downloads needed.

## Platform notes

| Platform | GPU | Notes |
|----------|-----|-------|
| macOS (Apple Silicon) | MPS | MLX backend auto-selected, chat LLM auto-downloads on first startup |
| Windows | CUDA | CUDA PyTorch installed automatically during setup |
| Linux | CUDA | Same as Windows |
| Any | CPU | Works but generation is slow |

## Links

- [Tadpole Studio](https://github.com/proximasan/tadpole-studio) — Main project repo
- [ACE-Step 1.5](https://github.com/ace-step/ACE-Step-1.5) — Music generation model
- [Pinokio](https://pinokio.computer) — 1-click AI app launcher
