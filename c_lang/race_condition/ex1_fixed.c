#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <semaphore.h>

sem_t semaphore;

void *fun1();
void *fun2();
int shared = 1;

int main()
{
  pthread_t thread1, thread2;
  if (sem_init(&semaphore, 0, 1) != 0)
  {
    perror("Erro inicializando semaforo");
    exit(EXIT_FAILURE);
  }
  pthread_create(&thread1, NULL, fun1, NULL);
  sleep(1);
  pthread_create(&thread2, NULL, fun2, NULL);
  pthread_join(thread1, NULL);
  pthread_join(thread2, NULL);
  printf("Valor final de shared: %d\n", shared);
  sem_destroy(&semaphore);
  return 0;
}

void *fun1()
{
  int x = shared;
  printf("[Thread 1] Incrementando valor de shared: %d\n", x);
  sem_wait(&semaphore);
  x++;
  sem_post(&semaphore);
  printf("[Thread 1] Valor local de shared: %d\n", x);
  sleep(1); // Preeemptando thread 1 para rodar a thread 2
  shared = x;
  printf("[Thread 1] Valor de shared incrementado: %d\n", shared);
}

void *fun2()
{
  int x = shared;
  printf("[Thread 2] Decrementando valor de shared: %d\n", x);
  sem_wait(&semaphore);
  x--;
  sem_post(&semaphore);
  printf("[Thread 2] Valor local de shared: %d\n", x);
  sleep(1); // Preeemptando thread 2 para rodar a thread 1
  shared = x;
  printf("[Thread 2] Valor de shared decrementado: %d\n", x);
}