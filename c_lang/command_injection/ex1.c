#include <stdio.h>
#include <stdlib.h>

#define MAX_BUFFER_SIZE 256

int main()
{
  char input[MAX_BUFFER_SIZE - 4], command[MAX_BUFFER_SIZE];
  printf("enter a filename on this path to get the content: \n");
  fgets(input, MAX_BUFFER_SIZE, stdin);
  snprintf(command, MAX_BUFFER_SIZE, "cat %s", input);
  system(command);
  return 0;
}