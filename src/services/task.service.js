import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient()

export const findAllTask = async () => {
    return await prisma.task.findMany()
}

export const findTaskById = async (id) => {
    return await prisma.task.findUnique({
        where: {
            id: id
        }
    })
}

export const addTask = async ({title, description, userId}) => {
    return await prisma.task.create({
        data: {
            title: title,
            description: description,
            is_completed: false,
            userId: userId
        }
    })
}

export const editTask = async ({ id, userId, title, description, is_completed }) => {
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (is_completed !== undefined) updateData.is_completed = is_completed;

    const task = await prisma.task.findFirst({
        where: {
            id,
            userId
        }
    });

    if (!task) return null;

    return await prisma.task.update({
        where: { id },
        data: updateData
    });
}

export const removeTask = async ({id, userId}) => {
    const task = await prisma.task.findFirst({
        where: {
            id: id,
            userId: userId
        }
    })

    if (!task) return null;

    return await prisma.task.delete({
        where: {
            id: id
        }
    })
}