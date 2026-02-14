const fs = require("fs");
const readline = require("readline");

const clear = () => process.stdout.write("\x1Bc");

const ASCII = c => [...c].map(ch =>
    [...Array(8)].map((_, i) => (ch.charCodeAt(0) >> (7 - i)) & 1)
).flat();

const ask = q => new Promise(res => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(q, ans => { rl.close(); res(ans); });
});

async function run(program) {
    let mem = {}, ip = 0, buf = [];
    clear();

    while (ip >= 0 && ip < program.length) {
        let [bit, loc] = program[ip];

        mem[ip] = bit;
        buf.push(bit);

        if (buf.length === 8) {
            process.stdout.write(String.fromCharCode(parseInt(buf.join(""), 2)));
            buf = [];
        }

        if (mem[loc] === bit) {
            const inp = (await ask("")).trim();
            const bits = inp ? ASCII(inp) : Array(8).fill(0);

            mem[ip] = bits[0];
            for (let i = 1; i < bits.length; i++) mem[loc + i - 1] = bits[i];
        }

        ip = loc;
    }
}

async function repl() {
    while (true) {
        clear();
        console.log("BitLoc REPL");
        const file = (await ask("Enter File (or Enter to quit): ")).trim();
        if (!file) return console.log("Exiting REPL.");

        try {
            const program = fs.readFileSync(file, "utf8")
                .trim()
                .split("\n")
                .map(l => l.trim().split(/\s+/).map(Number));

            clear();
            await run(program);
        } catch (e) {
            console.log("Error:", e.message);
        }

        await ask("\nEnter to Continue REPL: ");
    }
}

repl();
