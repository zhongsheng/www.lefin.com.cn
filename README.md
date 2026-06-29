# Lefin Official Website

Rebuilt official website for Lefin 乐芬 at `www.lefin.com.cn`.

## Stack

- React
- TypeScript
- Vite
- Vitest
- Phosphor Icons

## Commands

```bash
npm install
npm run dev
npm run test:run
npm run build
```

## Release

Build and upload `dist/` to the production host over SFTP:

```bash
npm run release
```

Defaults:

- Host: `161.189.5.168`
- User: `ubuntu`
- Remote directory: `/var/local/www`
- Local directory: `dist`
- Port: `22`

Optional environment variables:

```bash
LEFIN_SFTP_USER=ubuntu
LEFIN_SFTP_KEY=~/.ssh/lefin_deploy_key
LEFIN_SFTP_PORT=22
LEFIN_SFTP_HOST=161.189.5.168
LEFIN_SFTP_REMOTE_DIR=/var/local/www
LEFIN_RELEASE_DIR=dist
```

To upload an already-built `dist/` without rebuilding:

```bash
npm run release:sftp
```

## Notes

- Product and logo assets are based on the supplied Lefin references.
- Apple-style website images are stored in `src/assets/apple` as optimized WebP assets.
- The homepage is a single responsive site with anchor navigation, mobile menu, FAQ accordion, local contact form validation, and dedicated desktop/mobile hero imagery.
- Public crawler/agent content is available at `/llms.txt` and `/lefin-site.md`.
