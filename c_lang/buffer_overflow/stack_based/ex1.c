#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 40

struct Pessoa
{
  char name[MAX];
};

int main(void)
{
  struct Pessoa Pessoa;

  fprintf(stdout, "Digite seu nome: ");
  scanf("%s", Pessoa.name);
  printf("%s\n", Pessoa.name);

  return 0;
}
