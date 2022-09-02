#include <stdio.h>
#include <string.h>

#define MAX 40

int main(void)
{
  char name[MAX];

  fprintf(stdout, "Name: ");
  fgets(name, sizeof(name), stdin);
  fprintf(stdout, "Hello %s\n", name);

  return 0;
}
