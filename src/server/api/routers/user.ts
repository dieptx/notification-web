import { type Prisma } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  filterUsers: protectedProcedure
    .input(
      z.object({
        keyword: z.string().optional().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { keyword } = input;

      const whereClause: Prisma.UserWhereInput = keyword
        ? {
            OR: [
              { name: { contains: keyword, mode: "insensitive" } },
              // NOTE: No need currently
              // { email: { contains: keyword, mode: "insensitive" } },
            ],
          }
        : {};

      const users = await ctx.db.user.findMany({
        where: whereClause,
        select: {
          id: true,
          name: true,
        },
      });

      return users;
    }),
});
