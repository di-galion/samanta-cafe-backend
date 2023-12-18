const {fa, faker} = require("@faker-js/faker")
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient()

const f = async () => {
    for (let i = 0; i < 20; i++) {
        await prisma.user.create({
            data: {
                email: "admin@gmail.ru",
                name: "admin",
                phone: "89148508355",
                isAdmin: true,
                password: '123456q',
                id: 123
            }
        })
        // await prisma.product.create({
        //     data: {
        //         name: faker.commerce.productName(),
        //         slug: faker.commerce.productName(),
        //         category: {
        //             create: {
        //                 name: faker.commerce.department(),
        //                 slug: faker.commerce.department(),
        //             }
        //         },
        //         price: +faker.commerce.price(),
        //         description: faker.commerce.productDescription(),
        //         images: [faker.image.url()],
        //         user: {
        //             connect: {id: 1}
        //         }
        //     }
        // })
        // await prisma.product.create({
        //     data: {
        //         name: faker.commerce.productName(),
        //         slug: faker.commerce.productName(),
        //         category: {
        //             create: {
        //                 name: faker.commerce.department(),
        //                 slug: faker.commerce.department(),
        //             }
        //         },
        //         price: +faker.commerce.price(),
        //         description: faker.commerce.productDescription(),
        //         images: [faker.image.url()],
        //         user: {
        //             connect: {id: 1}
        //         }
        //     }
        // })
    }
}

f()
