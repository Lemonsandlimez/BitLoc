# BL Interpreter

BL (BitLoc) Is a open source OISC **(one instructoin set computer)** programing langauge


## Getting Ready

## Run Program (Node):
```
node BitLoc.js Project.bl
```
(or you can do ``node BitLoc.js`` and enter your file from there)
## Run Program (Python):
```
python BitLoc.js
```
### Programing in BitLoc

BitLoc Progarms are text files (in demostratoins though, its .bl)
the interpreter checks this for every line of code:

Read bit and loc

Write bit to mem[ip]

Add bit to output buffer

If 8 bits collected → print ASCII

If mem[loc] === bit → trigger input

Convert input to ASCII bits

Overwrite memory with those bits

Jump to loc

... And Repeat

## License
This project is released under the MIT License.
BitLoc is intended as a joke language,  use it for fun, **not** production.
