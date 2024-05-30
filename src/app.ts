const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/*
async function crearEjemplos() {
  try {
    // Crear ejemplos de Estudiante con identificaciones del 6 al 9
    for (let i = 6; i < 10; i++) {
      const identificacion = `ID-${i}`;
      const estudianteExistente = await prisma.estudiante.findUnique({
        where: { identificacion }
      });

      if (!estudianteExistente) {
        await prisma.estudiante.create({
          data: {
            nombre: `Estudiante ${i}`,
            identificacion,
            sucursal: ["CHONE", "MANTA", "PORTO", "CLOSED"][(i - 6) % 4]
          }
        });
      } else {
        console.log(`El estudiante con identificación ${identificacion} ya existe.`);
      }
    }

    // Crear ejemplos de Idioma
    for (let i = 0; i < 5; i++) {
      await prisma.idioma.create({
        data: {
          descripcion: `Idioma ${i + 1}`,
          sucursal: ["CHONE", "MANTA", "PORTO", "CLOSED"][i % 4]
        }
      });
    }

    // Obtener todos los estudiantes
    const estudiantes = await prisma.estudiante.findMany();

    // Obtener todos los idiomas
    const idiomas = await prisma.idioma.findMany();

    // Crear ejemplos de ControlDeIdioma (aquí asumo que habrá 5 estudiantes y 5 idiomas)
    for (let i = 0; i < 5; i++) {
      await prisma.controlDeIdioma.create({
        data: {
          estudianteId: estudiantes[i].id,
          idiomaId: idiomas[i].id,
          porcentajeLectura: Math.floor(Math.random() * 101),
          porcentajeEscritura: Math.floor(Math.random() * 101),
          porcentajeEscuchar_hablar: Math.floor(Math.random() * 101),
          sucursal: ["CHONE", "MANTA", "PORTO", "CLOSED"][i % 4]
        }
      });
    }

    console.log("Ejemplos creados exitosamente.");
  } catch (error) {
    console.error("Error al crear ejemplos:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar la función para crear los ejemplos
crearEjemplos();
*/

///////////////////////////////////////////////////////////////////////////////////////////
/*
async function cerrarSucursal(idSucursal: string) {
  try {
    // Mover elementos de ControlDeIdioma asociados a la sucursal
    const controlDeIdiomasMovidos = await prisma.controlDeIdioma.updateMany({
      where: { sucursal: idSucursal },
      data: { sucursal: "CLOSED" },
    });

    console.log(`Número de ControlDeIdiomas movidos desde ${idSucursal} a CLOSED: ${controlDeIdiomasMovidos.count}`);

    // Mover elementos de Estudiante asociados a la sucursal
    const estudiantesMovidos = await prisma.estudiante.updateMany({
      where: { sucursal: idSucursal },
      data: { sucursal: "CLOSED" },
    });

    console.log(`Número de Estudiantes movidos desde ${idSucursal} a CLOSED: ${estudiantesMovidos.count}`);

    // Mover elementos de Idioma asociados a la sucursal
    const idiomasMovidos = await prisma.idioma.updateMany({
      where: { sucursal: idSucursal },
      data: { sucursal: "CLOSED" },
    });

    console.log(`Número de Idiomas movidos desde ${idSucursal} a CLOSED: ${idiomasMovidos.count}`);

    // Imprimir elementos de la sucursal original
    console.log(`Elementos de la sucursal ${idSucursal}:`);
    const elementosOrigen = await prisma.controlDeIdioma.findMany({
      where: { sucursal: idSucursal },
    });
    console.table(elementosOrigen);

    // Imprimir elementos de la sucursal CLOSED
    console.log("Elementos de la sucursal CLOSED:");
    const elementosClosed = await prisma.controlDeIdioma.findMany({
      where: { sucursal: "CLOSED" },
    });
    console.table(elementosClosed);

  } catch (error) {
    console.error("Error al cerrar la sucursal:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejemplo de uso: cerrar la sucursal "CHONE"
cerrarSucursal("MANTA");
*/



////////////////////////////////////////////////////







async function cerrarSucursal(idSucursal: string, callback: (bajas: { controlDeIdiomas: number, estudiantes: number, idiomas: number }) => void) {
  try {
    // Mover elementos de ControlDeIdioma asociados a la sucursal
    const controlDeIdiomasMovidos = await prisma.controlDeIdioma.updateMany({
      where: { sucursal: idSucursal },
      data: { sucursal: "CLOSED" },
    });

    // Mover elementos de Estudiante asociados a la sucursal
    const estudiantesMovidos = await prisma.estudiante.updateMany({
      where: { sucursal: idSucursal },
      data: { sucursal: "CLOSED" },
    });

    // Mover elementos de Idioma asociados a la sucursal
    const idiomasMovidos = await prisma.idioma.updateMany({
      where: { sucursal: idSucursal },
      data: { sucursal: "CLOSED" },
    });

    // Ejecutar el callback con el número de elementos dados de baja en cada entidad
    callback({
      controlDeIdiomas: controlDeIdiomasMovidos.count,
      estudiantes: estudiantesMovidos.count,
      idiomas: idiomasMovidos.count
    });

    // Imprimir elementos de la sucursal original
    console.log(`Elementos de la sucursal ${idSucursal}:`);
    const elementosOrigen = await prisma.controlDeIdioma.findMany({
      where: { sucursal: idSucursal },
    });
    console.table(elementosOrigen);

    // Imprimir elementos de la sucursal CLOSED
    console.log("Elementos de la sucursal CLOSED:");
    const elementosClosed = await prisma.controlDeIdioma.findMany({
      where: { sucursal: "CLOSED" },
    });
    console.table(elementosClosed);

  } catch (error) {
    console.error("Error al cerrar la sucursal:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejemplo de uso: cerrar la sucursal "CHONE" y mostrar elementos dados de baja
cerrarSucursal("CHONE", ({ controlDeIdiomas, estudiantes, idiomas }) => {
  console.log(`Número de ControlDeIdiomas dados de baja: ${controlDeIdiomas}`);
  console.log(`Número de Estudiantes dados de baja: ${estudiantes}`);
  console.log(`Número de Idiomas dados de baja: ${idiomas}`);
});
