#include <stdio.h>
#include <string.h>

#define MAX 40

int main(void)
{
  char name[MAX];
  fprintf(stdout, "Name: ");
  gets(name);
  fprintf(stdout, "Hello %s\n", name);
  return 0;
}
