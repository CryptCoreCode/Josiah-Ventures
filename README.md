[README.md](https://github.com/user-attachments/files/26467545/README.md)
Josiah — Personal Streamer Site (static)

Quick start
1. Files included:
   - index.html
   - styles.css
   - js/script.js
   - js/config.example.js
Serve locally (recommended so Twitch embed works):

   PowerShell / Command Prompt (quick):
   ```powershell
   cd C:\Users\josia\JosiahVentures
   ./serve.ps1
   ```

   Or double-click `serve.bat` in Explorer.

   If you prefer manual start with Python:
   ```powershell
   cd C:\Users\josia\JosiahVentures
   python -m http.server 5173
   ```

   Open in browser: http://localhost:5173

   (Do not run commands like `Open: http://...` in PowerShell — that is not a valid command.)

3. Optional: copy js/config.example.js -> js/config.js and add your Twitch API credentials (only for server-side usage; not recommended client-side):
   - twitchChannel: "notratmaster"
   - clientId: your Twitch app client id
   - authToken: "Bearer <token>" (app access token)

4. Deploy as a static site (Netlify, Vercel, GitHub Pages). The Twitch embed requires the `parent` parameter to match your deployment hostname; the script uses `window.location.hostname`.

Notes
- Without API credentials the embed still works but live/offline detection is disabled.
- Replace highlight placeholders with real clip URLs.
