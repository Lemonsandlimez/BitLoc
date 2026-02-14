import os
def clear():
    os.system('cls' if os.name == 'nt' else 'clear')
def ASCII(c):
    # converter
    val = ord(c)
    return [(val >> i) & 1 for i in range(7, -1, -1)]
def char_to_bits(ch):
    return ASCII(ch)
def run(program):
    memory = {}          # sparse tape
    ip = 0
    buffer = []          # collect 8 bits
    clear()
    prog_len = len(program)
    while 0 <= ip < prog_len:
        bit, loc = program[ip]
        # Write bit and maybe output a byte
        memory[ip] = bit
        buffer.append(str(bit))
        if len(buffer) == 8:
            print(chr(int("".join(buffer), 2)), end="")
            buffer.clear()
        # Conditional jump with input hijack
        if memory.get(loc) == bit:
            user_input = input().strip()
            if user_input:
                bits = [b for ch in user_input for b in char_to_bits(ch)]
            else:
                bits = [0] * 8
            # Overwrite A with first bit
            memory[ip] = bits[0]
            # Store remaining bits starting at loc
            for offset, b in enumerate(bits[1:]):
                memory[loc + offset] = b
        # Jump
        ip = loc
def repl():
    while True:
        clear()
        print("BitLoc REPL")
        file_name = input("Enter File (or press Enter to quit): ").strip()
        if not file_name:
            print("Exiting REPL.")
            break
        try:
            with open(file_name, 'r') as f:
                program = [
                    (int(a), int(b))
                    for line in f
                    for a, b in [line.strip().split()]
                ]
        except Exception as e:
            print(f"Error reading file: {e}")
            input("Press Enter to continue: ")
            continue
        clear()
        try:
            run(program)
        except Exception as e:
            print(f"\nError during execution: {e}")
        input("Enter to Continue REPL: ")
if __name__ == "__main__":
    repl()
