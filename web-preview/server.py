import os
import subprocess
import http.server
import socketserver

# Auto-build Vite application to dist folder
if os.path.exists("package.json"):
    print("Running production build (npm run build)...")
    try:
        subprocess.run(["npm", "run", "build"], shell=True, check=True)
    except Exception as e:
        print("Warning: Build failed. Serving files as-is.", e)

class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve from dist directory if it exists, otherwise current directory
        directory = "dist" if os.path.exists("dist") else "."
        super().__init__(*args, directory=directory, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

PORT = 8765
Handler = NoCacheHTTPRequestHandler

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving from {'dist/' if os.path.exists('dist') else 'current directory'} at http://localhost:{PORT}")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
