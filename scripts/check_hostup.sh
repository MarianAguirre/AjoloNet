#!/bin/bash

# Verificar si se proporcionó un argumento para la dirección IP
if [ -z "$1" ]; then
   echo "No se proporcionó una dirección IP."
   exit 1
fi

# Realizar el ping a la dirección IP proporcionada
ping -c 4 $1 > /dev/null 2>&1  # Hace ping 4 veces a la dirección IP y redirige la salida a /dev/null

# Verificar el código de salida del comando ping
if [ $? -eq 0 ]; then
    echo "Dispositivo está alcanzable."
    exit 0  # Código de salida 0 indica éxito
else
    echo "Dispositivo no está alcanzable."
    exit 1  # Código de salida 1 indica fallo
fi
