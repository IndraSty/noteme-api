import { app } from "./application/app.js"
import { prismaClient } from "./application/database.js"

async function main() {
    const users = await prismaClient.users.findMany();
    console.log(users);
  }
  
  main()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prismaClient.$disconnect();
    });

app.listen(5000, () => console.log('Server running at http://localhost:5000'));