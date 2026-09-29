#!/usr/bin/env node
// Hook PostToolUse: tras cada Edit/Write/MultiEdit sobre un fichero .ts,
// corre el compilador de TypeScript en modo "solo comprobar" (sin generar
// archivos). Si hay un error de tipos, lo manda a Claude Code (exit code 2)
// para que lo vea y pueda corregirlo en el mismo turno.
const { execSync } = require('child_process');
 
let input = '';
process.stdin.on('data', (chunk) => (input += chunk));
process.stdin.on('end', () => {
    let filePath = '';
    try {
        filePath = JSON.parse(input)?.tool_input?.file_path || '';
    } catch {
        // si no se puede leer la entrada, no bloqueamos nada
    }
    
    if (!filePath.endsWith('.ts')) {
        process.exit(0);
    }
    
    try {
        execSync('npx tsc --noEmit', { stdio: 'pipe', cwd: process.env.CLAUDE_PROJECT_DIR });
        process.exit(0);
    } catch (err) {
        process.stderr.write(err.stdout ? err.stdout.toString() : '');
        process.stderr.write(err.stderr ? err.stderr.toString() : '');
        process.exit(2);
    }
});