#!/bin/bash

# Directorio raíz de los módulos
MODULES_DIR="./src"

# Iterar sobre cada subdirectorio en src/
for dir in "$MODULES_DIR"/*/; do
  # Obtener el nombre del módulo
  module_name=$(basename "$dir")

  # Verificar si existe el archivo module.ts
  if [ -f "$dir${module_name}.module.ts" ]; then
    echo "Generando service y controller para el módulo: $module_name"

    # Generar el service
    nest g service "$module_name"

    # Generar el controller
    nest g controller "$module_name"
  fi
done
