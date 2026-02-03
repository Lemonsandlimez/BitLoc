# RPL Interpreter

RPL (Ripple) Is a open source programming language designed to be  minimalistic (6 Commands, if you count [] as one command) but turing complete

---

## Syntax

RPL programs are plain text files ending in `.rpl`.  
Here are all the commands:

| Command | Meaning                                                                 |
|---------|-------------------------------------------------------------------------|
| `R`     | Move pointer **right** (creates new cell if needed).                    |
| `L`     | Move pointer **left** (creates new cell if needed).                     |
| `C`     | Increment current cell value (wraps at 255 → 0).                        |
| `I`     | Input: read one character from stdin into current cell.                 |
| `P`     | Print current cell as ASCII character.                                  |
| `[`     | Loop start: if current cell is zero, skip forward to matching `]`.      |
| `]`     | Loop end: if current cell is nonzero, jump back to matching `[`.        |
| `#`     | Comment: ignores everything until end of line.                          |
| `#!`    | Shebang: optional, skips first line if present (Unix‑style script use). |

---

## Getting Ready

### Windows
1. Install [MinGW](http://mingw.org/) or another GCC toolchain.
2. Compile the interpreter:
```powershell gcc .\RPL.c -o rpl.exe```
3. Run a program:
```rpl .\hello.rpl```
### Linux / MacOS
1. Make sure GCC or Clang is installed.
2. Compile the interpreter:
```gcc RPL.c -o rpl```
3. Run a program:
```./rpl name.rpl```

## System Wide setup
Windows: Add rpl.exe to your PATH and associate .rpl files with it.

Linux/macOS: Move rpl to /usr/local/bin and optionally add a shebang (#!/usr/local/bin/rpl) to .rpl files.

Then you can run .rpl files directly

## License
This project is released under the MIT License (or your choice).
RPL is intended as a joke language — use it for fun, **not** production.
