#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int compare_password(char *str)
{

  if (strcmp("senha4321@%$#@1", str) == 0)
    return 0;

  return -1;
}

int main(int argc, char *argv[])
{

  if (argc != 2)
  {
    fprintf(stderr, "Usage: %s <pass>\n", argv[0]);
    exit(EXIT_FAILURE);
  }

  if (compare_password(argv[1]) == 0)
    fprintf(stdout, "Seja bem vindo ao sistema XYZ\n");
  else
    fprintf(stdout, "Senha errada, sua tentativa foi registrado no sistema\n");
  return 0;
}
