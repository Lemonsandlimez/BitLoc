#include <stdio.h>
#include <stdlib.h>
typedef struct Cell {
    unsigned char v;
    struct Cell *l, *r;
} Cell;
Cell *cell(Cell *l) {
    Cell *c = calloc(1, sizeof *c);
    c->l = l;
    if (l) l->r = c;
    return c;
}
void skip(FILE *f) {
    for (int d = 1, c; d && (c = fgetc(f)) != EOF;)
        d += (c == '[') - (c == ']');
}
void back(FILE *f) {
    for (int d = 1, c; d;) {
        long pos = ftell(f) - 2;
        if (pos < 0) break;
        fseek(f, pos, SEEK_SET);
        c = fgetc(f);
        d += (c == ']') - (c == '[');
    }
}
void shebang(FILE *f) {
    long pos = ftell(f);
    if (fgetc(f) == '#' && fgetc(f) == '!')
        while (fgetc(f) != '\n' && !feof(f));
    else
        fseek(f, pos, SEEK_SET);
}
int next(FILE *f) {
    int c = fgetc(f);
    if (c == '#')
        while (c != '\n' && c != EOF) c = fgetc(f);
    return c;
}
int main(int argc, char **argv) {
    if (argc < 2) {
        fprintf(stderr, "Usage: %s file.rpl\n", argv[0]);
        return 1;
    }
    FILE *f = fopen(argv[1], "r");
    if (!f) return perror("fopen"), 1;
    shebang(f);
    Cell *h = cell(NULL), *p = h;
    int c;
    while ((c = next(f)) != EOF) {
        switch (c) {
            case 'R': p = p->r ? p->r : cell(p); break;
            case 'L': p = p->l ? p->l : cell(NULL); break;
            case 'C': p->v++; break;
            case 'I': p->v = getchar(); break;
            case 'P': putchar(p->v); break;
            case '[': if (!p->v) skip(f); break;
            case ']': if (p->v) back(f); break;
        }
    }
    fclose(f);
    return 0;
}