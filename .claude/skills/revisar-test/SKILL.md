---
name: revisar-test
description: Revisa un fichero de test del proyecto buscando problemas concretos
---

Revisa el fichero de test que te indique el usuario. Busca: locators frágiles
(posicionales tipo nth() cuando hay una alternativa por rol o clase), asserts
sin await, timeouts fijos en vez de auto-wait de Playwright, y falta de
independencia entre tests. Señala cada problema con el archivo y la línea
exacta, sin reescribir el código tú mismo salvo que se te pida.
