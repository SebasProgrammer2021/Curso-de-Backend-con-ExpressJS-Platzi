const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

async function main() {
  // const demoUsers = [
  //   { name: 'Juan Perez', email: 'juan.perez@example.com' },
  //   { name: 'Maria Lopez', email: 'maria.lopez@example.com' },
  //   { name: 'Carlos Garcia', email: 'carlos.garcia@example.com' }
  // ];

  // for (const user of demoUsers) {
  //   await prisma.user.create({
  //     data: user
  //   });
  // }

  // console.log('Usuarios de demostración creados con éxito');

  await prisma.user.deleteMany();
  console.log('Todos los usuarios han sido eliminados');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });