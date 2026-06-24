import prisma from "../../config/db";

export const findUserByEmailOrUsername = (email: string, username: string) => {
    return prisma.user.findFirst({
        where: {OR: [{email}, {username}]}
    });
};

export const findUserByUsername = (username: string) => {
    return prisma.user.findUnique({
        where: {username}
    });
};

export const createUser = (data: {name: string; email: string; username: string; password: string}) => {
    return prisma.user.create({data});
};

export const updateUserOTP = async (id: string, otp: string) => {
  const expiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  return await prisma.user.update({
    where: { id },
    data: {
      otp,
      otpExpiry: expiry
    }
  });
};
