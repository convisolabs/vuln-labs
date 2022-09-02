#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *password = "senha4321@%$#@";

int main(void)
{
  char buffer[1024];

  fprintf(stdout, "Digite a senha: ");
  fgets(buffer, sizeof(buffer), stdin);
  buffer[strlen(buffer) - 1] = '\0';

  if (strcmp(password, buffer) == 0)
    fprintf(stdout, "Autorizado\n");
  else
    fprintf(stdout, "Não autorizado\n");

  return 0;
}
