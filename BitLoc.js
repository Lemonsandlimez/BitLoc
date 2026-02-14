const fs = require("fs");
const readline = require("readline");

// Clear screen
function clear() {
    process.stdout.write("\x1Bc");
}

// Convert char → 8 bits
function ASCII(c) {
    const val = c.charCodeAt(0);
    const bits = [];
    for (let i = 7; i >= 0; i--) {
        bits.push((val >> i) & 1);
    }
    return bits;
}

function charToBits(ch) {
    return ASCII(ch);
}

// Read a line from stdin
function inputLine(prompt = "") {
    return new Promise(resolve => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(prompt, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

async function run(program) {
    let memory = {};      // sparse tape
    let ip = 0;
    let buffer = [];
    clear();

    const progLen = program.length;

    while (ip >= 0 && ip < progLen) {
        let [bit, loc] = program[ip];

        // Write bit and maybe output a byte
        memory[ip] = bit;
        buffer.push(String(bit));

        if (buffer.length === 8) {
            const char = String.fromCharCode(parseInt(buffer.join(""), 2));
            process.stdout.write(char);
            buffer = [];
        }

        // Conditional jump + input hijack
        if (memory[loc] === bit) {
            const userInput = (await inputLine("")).trim();

            let bits;
            if (userInput.length > 0) {
                bits = [];
                for (const ch of userInput) {
                    bits.push(...charToBits(ch));
                }
            } else {
                bits = Array(8).fill(0);
            }

            // Overwrite A with first bit
            memory[ip] = bits[0];

            // Store remaining bits starting at loc
            for (let offset = 1; offset < bits.length; offset++) {
                memory[loc + offset - 1] = bits[offset];
            }
        }

        // Jump
        ip = loc;
    }
}

async function repl() {
    while (true) {
        clear();
        console.log("BitLoc REPL");
        const fileName = (await inputLine("Enter File (or press Enter to quit): ")).trim();

        if (!fileName) {
            console.log("Exiting REPL.");
            break;
        }

        let program;
        try {
            const lines = fs.readFileSync(fileName, "utf8").trim().split("\n");
            program = lines.map(line => {
                const [a, b] = line.trim().split(/\s+/);
                return [parseInt(a), parseInt(b)];
            });
        } catch (err) {
            console.log("Error reading file:", err.message);
            await inputLine("Press Enter to continue: ");
            continue;
        }

        clear();
        try {
            await run(program);
        } catch (err) {
            console.log("\nError during execution:", err.message);
        }

        await inputLine("Enter to Continue REPL: ");
    }
}

repl();