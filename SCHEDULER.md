# Scheduler Setup and Usage

This document provides instructions on how to set up and use the scheduler for downloading tracks from YouTube Music.

## Prerequisites

- Node.js and npm installed
- Cloudflare R2 account (for persistent storage)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure R2 Storage (Optional)

For persistent storage between runs, you need to set up Cloudflare R2 credentials:

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your Cloudflare R2 credentials:
   ```
   R2_ACCESS_KEY_ID=3cb677b9b6722a66a2dc626c404d8c4e
   R2_SECRET_ACCESS_KEY=4ba2531ef45d5f9d9b1657a252fd8b57dfe6404fff21d85713a3c9e8355cfadd
   R2_BUCKET=prodai-beats-storage
   R2_ENDPOINT=https://1992471ec8cc523889f80797e15a0529.r2.cloudflarestorage.com
   ```

3. Verify your R2 credentials:
   ```bash
   npm run scheduler:check-r2
   ```

### 3. Activate the Scheduler

To activate the scheduler (set it to run on schedule):

```bash
npm run scheduler:activate
```

## Usage

### Running the Scheduler

To run the scheduler once:

```bash
npm run scheduler:run
```

### Watching the Scheduler

To continuously watch and restart the scheduler if it stops:

```bash
./scripts/watch-scheduler.sh
```

### Checking Scheduler Status

To check if the scheduler is active and when it will run next:

```bash
npm run scheduler:run
```

## Troubleshooting

### Scheduler Not Persisting State

If the scheduler state is not persisting between runs, check your R2 credentials:

```bash
npm run scheduler:check-r2
```

### Scheduler Not Running

If the scheduler is not running when it should:

1. Check if the scheduler is active:
   ```bash
   npm run scheduler:activate
   ```

2. Check the logs in `scheduler.log` for any errors.

## Development

For development without R2, the scheduler will use in-memory storage, but state will not persist between runs. This is fine for testing, but for production use, you should set up R2 credentials. 