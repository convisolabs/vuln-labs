#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define MY_TMP_FILE "/home/salix/Projects/c_workshop/file_opening/teste.txt"

int main(int argc, char *argv[])
{
  FILE *tmpFile;
  tmpFile = fopen(MY_TMP_FILE, "r");

  if (tmpFile == NULL)
  {
    printf("Entrou");
    return EXIT_FAILURE;
  }

  char c = fgetc(tmpFile);
  while (c != EOF)
  {
    printf("%c", c);
    c = fgetc(tmpFile);
  }

  fclose(tmpFile);

  return EXIT_SUCCESS;
}