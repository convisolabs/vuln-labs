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

	Pessoa.name = malloc(MAX);
	Pessoa.surname = malloc(MAX);
	Pessoa.address = malloc(MAX);

	if (!Pessoa.name || !Pessoa.surname || !Pessoa.address)
	{
		fprintf(stderr, "Not enough memory\n");
		exit(EXIT_FAILURE);
	}

	fprintf(stdout, "Digite seu nome: ");
	fgets(Pessoa.name, MAX, stdin);
	fprintf(stdout, "Digite seu sobrenome: ");
	fgets(Pessoa.surname, MAX, stdin);
	fprintf(stdout, "Digite seu endereço: ");
	fgets(Pessoa.address, MAX, stdin);

	printf("Nome: %s\n", Pessoa.name);
	printf("Sobrenome: %s\n", Pessoa.surname);
	printf("Endereço: %s\n", Pessoa.address);

	return 0;
}
