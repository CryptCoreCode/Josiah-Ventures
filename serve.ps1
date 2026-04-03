<#
Serve the JosiahVentures site locally and open the default browser.
Usage: Right-click -> Run with PowerShell or run from PowerShell:
  ./serve.ps1

This script attempts to use `python` (or `py`) to start a simple HTTP server
and then opens http://localhost:5173 in your default browser.
#>
$port = 5173
$cwd = Split-Path -Parent $MyInvocation.MyCommand.Definition
Push-Location $cwd

if (Get-Command python -ErrorAction SilentlyContinue) {
    Start-Process -FilePath python -ArgumentList "-m", "http.server", $port -WorkingDirectory $cwd
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    Start-Process -FilePath py -ArgumentList "-m", "http.server", $port -WorkingDirectory $cwd
} else {
    Write-Host "Python not found. Install Python or run a different local server and open http://localhost:$port"
    Pop-Location
    exit 1
}

# give server a moment to start
Start-Sleep -Seconds 1
Start-Process "http://localhost:$port"
Pop-Location
