#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LEN 60

int concat(char *first_name, char *second_name)
{
  char complete_name[LEN * 2];
  memset(complete_name, '\0', sizeof(complete_name));
  strncat(complete_name, first_name, LEN);
  strncat(complete_name, second_name, LEN);
  fprintf(stdout, "Hello: %s\n", complete_name);

  return 0;
}

int main(int argc, char *argv[])
{
  if (argc != 3)
  {
    fprintf(stderr, "Usage: %s <first_name> <second_name>\n", argv[0]);
    exit(EXIT_FAILURE);
  }

  if (strlen(argv[1]) > LEN || strlen(argv[2]) > LEN)
  {
    fprintf(stderr, "argv[1] or argv[2] too big\n");
    exit(EXIT_FAILURE);
  }

  concat(argv[1], argv[2]);

  return 0;
}
