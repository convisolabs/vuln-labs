#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main(void)
{
  // char *password = secure_getenv("password");
  char *password = getenv("password");

  if (!password)
  {
    printf("Var not found.\n");
    exit(EXIT_FAILURE);
  }

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
