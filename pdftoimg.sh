#!/bin/sh

#Converte PDF escaneado em imagens(uma por pagina)
#Autor: Andre Guerra
#Criado: 24/02/2018
#Atualizado: 24/02/2018



convert -density 300 "$1" -depth 8 -strip -background white -alpha off "$2/X_%02d.jpg"
