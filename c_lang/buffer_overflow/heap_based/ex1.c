#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX 10

struct Pessoa
{
	char *name;
	char *surname;
	char *address;
};

int main(void)
{
	struct Pessoa Pessoa;

	Pessoa.address = malloc(MAX);
	Pessoa.name = malloc(MAX);
	Pessoa.surname = malloc(MAX);

	if (!Pessoa.name || !Pessoa.surname || !Pessoa.address)
	{
		fprintf(stderr, "Not enough memory\n");
		exit(EXIT_FAILURE);
	}

	fprintf(stdout, "Digite seu nome: ");
	scanf("%s", Pessoa.name);
	fprintf(stdout, "Digite seu sobrenome: ");
	scanf("%s", Pessoa.surname);
	fprintf(stdout, "Digite seu endereço: ");
	scanf("%s", Pessoa.address);

	printf("Nome: %s\n", Pessoa.name);
	printf("Sobrenome: %s\n", Pessoa.surname);
	printf("Endereço: %s\n", Pessoa.address);

	return 0;
}
